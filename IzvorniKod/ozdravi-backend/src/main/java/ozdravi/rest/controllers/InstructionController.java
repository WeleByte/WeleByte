package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Instruction;
import ozdravi.domain.User;
import ozdravi.rest.dto.InstructionDTO;
import ozdravi.service.InstructionService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
public class InstructionController {
    @Autowired
    private InstructionService instructionService;

    /*
        returns all instructions user can access
     */
    @GetMapping("/instructions")
    public ResponseEntity<List<Instruction>> getAllInstructions() {
        return new ResponseEntity<List<Instruction>>(instructionService.list(), HttpStatus.OK);
    }

    /*
        creates new instruction
            only doctors and pediatricians can create new instructions (and admin)
     */
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    @PostMapping("/instructions")
    public ResponseEntity<Instruction> createInstruction(@RequestBody InstructionDTO instructionDTO) {
        return new ResponseEntity<>(instructionService.createInstruction(instructionDTO), HttpStatus.CREATED);
    }

    /*
        find instruction by id
     */
    @GetMapping("/instruction/{id}")
    public ResponseEntity<Instruction> getInstruction(@PathVariable("id") Long id) {
        return new ResponseEntity<>(instructionService.findById(id), HttpStatus.OK);
    }

    /*
        modify instruction with given id
     */
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    @PutMapping("/instruction/{id}")
    public ResponseEntity<String> modifyIstruction(@PathVariable("id") Long id, @RequestBody InstructionDTO instructionDTO) {
        instructionService.modifyInstruction(instructionDTO, id);
        return new ResponseEntity<>("Instruction successfully modified", HttpStatus.OK);
    }

    /*
        delete instruction with given id
     */
//    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
//    @DeleteMapping("/instruction/{id}")
//    public ResponseEntity<?> deleteInstruction(@PathVariable("id") Long id) {
//        try{
//            Optional<Instruction> instruction = instructionService.findById(id);
//            if(instruction.isEmpty()) {
//                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Instruction doesn't exist");
//            }
//            //todo dodati provjeru da samo oni koji vide taj instruction ga mogu obrisati (ako budemo radili s delete)
//            instructionService.deleteInstruction(id);
//            return ResponseEntity.ok().body("Instruction successfully deleted");
//        } catch(IllegalArgumentException e) {
//            return ResponseEntity.badRequest().body(e.getMessage());
//        }
//    }
}