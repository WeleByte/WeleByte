package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Instruction;
import ozdravi.domain.User;
import ozdravi.rest.dto.InstructionDTO;
import ozdravi.service.InstructionService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.Objects;
import java.util.Optional;

@RestController
public class InstructionController {
    @Autowired
    private InstructionService instructionService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    SecurityContextService securityContextService;

    /*
        returns all instructions user can access
     */
    @GetMapping("/instructions")
    public ResponseEntity<?> getAllInstructions() {
        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        Long id = user.get().getId();

        if(securityContextService.isUserInRole("ADMIN")) {
            return ResponseEntity.ok(instructionService.listAll());
        } else if(securityContextService.isUserInRole("PARENT")) {
            return ResponseEntity.ok(instructionService.listForParent(id));
        } else if(securityContextService.isUserInRole("PEDIATRICIAN") || securityContextService.isUserInRole("DOCTOR")) {
            return ResponseEntity.ok(instructionService.listForDoctor(id));
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    /*
        creates new instruction
            only doctors and pediatricians can create new instructions (and admin)
     */
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    @PostMapping("/instructions")
    public ResponseEntity<?> createInstruction(@RequestBody InstructionDTO instructionDTO) {
        Optional<User> doctor = securityContextService.getLoggedInUser();
        if (doctor.isEmpty()){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        try{
            Instruction instruction = dtoManager.InstructionDTOtoInstruction(instructionDTO);

            //PROVJERE
            //admin uvijek smije
            if (securityContextService.isUserInRole("ADMIN"))
                return ResponseEntity.ok().body(instructionService.createInstruction(instruction));

            //predani doctor_id treba biti isti kao id osobe trenutno ulogirane
            if (!Objects.equals(instruction.getDoctor().getId(), doctor.get().getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Doctors can't give instructions on behalf of other doctors");
            }

            //doktror mora biti bas odgovoran za tog pacijenta
            if(instruction.getPatient().getDoctor() == null ||
                    !Objects.equals(instruction.getPatient().getDoctor().getId(), instruction.getDoctor().getId())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Doctor can give instructions only for his patients");
            }

            return ResponseEntity.ok().body(instructionService.createInstruction(instruction));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /*
        find instruction by id
     */
    @GetMapping("/instruction/{id}")
    public ResponseEntity<?> getInstruction(@PathVariable("id") Long id) {
        Optional<Instruction> instruction = instructionService.findById(id);
        if(instruction.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        //admin smije sve vidjeti
        if(securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.ok().body(instruction.get());

        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
        Long user_id = user.get().getId();
        //smije vidjeti ako je njegov id naveden kao patient, doktor ILI
        // ako navedeni id ima parent_id == user_id
        if(Objects.equals(user_id, instruction.get().getPatient().getId()) ||
                Objects.equals(user_id, instruction.get().getDoctor().getId()) ||
                (instruction.get().getPatient().getParent() != null && Objects.equals(instruction.get().getPatient().getParent().getId(), user_id)))
            return ResponseEntity.ok().body(instruction.get());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this info");
    }

    /*
        modify instruction with given id
     */
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    @PutMapping("/instruction/{id}")
    public ResponseEntity<?> modifyIstruction(@PathVariable("id") Long id, @RequestBody InstructionDTO instructionDTO) {
        try{
            Instruction instruction = dtoManager.InstructionDTOtoInstruction(instructionDTO);

            //PROVJERE
            //admin smije sve promjenitit pa se ove sve provjere ne odnose na njega
            if(!securityContextService.isUserInRole("ADMIN")) {
                Optional<Instruction> prevInstruction = instructionService.findById(id);
                if (prevInstruction.isEmpty()) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("instruction doesn't exist.");
                }

                //doktor smije modifyjati samo svoje instructione
                //provjerava se jel pathVariable id postoji u listi instructiona za tog doktora
                Optional<User> user = securityContextService.getLoggedInUser();
                if(user.isEmpty())
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                if(!instructionService.listForDoctor(user.get().getId()).contains(prevInstruction.get())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("doctor can modify only his instructions");
                }

                //ne smiju se mijenjati doctor_id i patient_id
                if (!Objects.equals(instruction.getDoctor().getId(), prevInstruction.get().getDoctor().getId()) ||
                        !Objects.equals(instruction.getPatient().getId(), prevInstruction.get().getPatient().getId())) {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("doctor_id and patient_id can't be modified");
                }
            }

            instructionService.modifyInstruction(instruction, id);
            return ResponseEntity.ok().body("Instruction successfully modified");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /*
        delete instruction with given id
     */
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    @DeleteMapping("/instruction/{id}")
    public ResponseEntity<?> deleteInstruction(@PathVariable("id") Long id) {
        try{
            Optional<Instruction> instruction = instructionService.findById(id);
            if(instruction.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Instruction doesn't exist");
            }
            //todo dodati provjeru da samo oni koji vide taj instruction ga mogu obrisati (ako budemo radili s delete)
            instructionService.deleteInstruction(id);
            return ResponseEntity.ok().body("Instruction successfully deleted");
        } catch(IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}