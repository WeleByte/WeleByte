package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.InstructionRepository;
import ozdravi.domain.Instruction;
import ozdravi.domain.User;
import ozdravi.exceptions.LoggedUserException;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.exceptions.RequestDeniedException;
import ozdravi.rest.dto.InstructionDTO;
import ozdravi.service.InstructionService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class InstructionServiceJpa implements InstructionService {
    @Autowired
    InstructionRepository instructionRepository;

    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    DTOManager dtoManager;

    @Override
    public List<Instruction> listForParent(Long id) {
        return instructionRepository.listForParent(id);
    }

    @Override
    public List<Instruction> list() {
        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            throw new LoggedUserException("get logged in user exception");

        Long id = user.get().getId();
        if(securityContextService.isUserInRole("PARENT")) {
            return listForParent(id);
        } else if(securityContextService.isUserInRole("PEDIATRICIAN") || securityContextService.isUserInRole("DOCTOR")) {
            return listForDoctor(id);
        } else { //ADMIN
            return listAll();
        }
    }

    @Override
    public List<Instruction> listForDoctor(Long id) {
        return instructionRepository.listForDoctor(id);
    }

    @Override
    public List<Instruction> listAll() {
        return instructionRepository.findAll();
    }

    @Override
    public Instruction createInstruction(InstructionDTO instructionDTO) {
        Optional<User> doctor = securityContextService.getLoggedInUser();
        if (doctor.isEmpty()){
            throw new LoggedUserException("logged in user exception");
        }

        Instruction instruction = dtoManager.InstructionDTOtoInstruction(instructionDTO);

        //PROVJERE
        //admin uvijek smije
        //TODO mozda bi se svejedno trebala stavti provjera da treba dobro bit naveden doktor i pacijent
        if (securityContextService.isUserInRole("ADMIN"))
            return instructionRepository.save(instruction);

        //predani doctor_id treba biti isti kao id osobe trenutno ulogirane
        if (!Objects.equals(instruction.getDoctor().getId(), doctor.get().getId())) {
            throw new RequestDeniedException("Doctors can't give instructions on behalf of other doctors");
        }

        //doktror mora biti bas odgovoran za tog pacijenta
        if(instruction.getPatient().getDoctor() == null ||
                !Objects.equals(instruction.getPatient().getDoctor().getId(), instruction.getDoctor().getId())) {
            throw new RequestDeniedException("Doctor can give instructions only for his patients");
        }
        return instructionRepository.save(instruction);
    }

    @Override
    public Instruction findById(Long id) {
        Optional<Instruction> instruction = instructionRepository.findById(id);
        if(instruction.isEmpty()) {
            throw new EntityMissingException("No instructions with such id");
        }

        //admin smije sve vidjeti
        if(securityContextService.isUserInRole("ADMIN"))
            return instruction.get();

        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty()) {
            throw new LoggedUserException("get logged in user exception");
        }
        Long user_id = user.get().getId();
        //smije vidjeti ako je njegov id naveden kao patient, doktor ILI
        // ako navedeni id ima parent_id == user_id
        if(Objects.equals(user_id, instruction.get().getPatient().getId()) ||
                Objects.equals(user_id, instruction.get().getDoctor().getId()) ||
                (instruction.get().getPatient().getParent() != null && Objects.equals(instruction.get().getPatient().getParent().getId(), user_id)))
            return instruction.get();
        else
            throw new RequestDeniedException("You are not authorized to view this info");
    }

    @Override
    public void modifyInstruction(InstructionDTO instructionDTO, Long id) {
        Instruction instruction = dtoManager.InstructionDTOtoInstruction(instructionDTO);

        //PROVJERE
        Instruction prevInstruction = findById(id);

        //admin smije sve promjenitit pa se ove sve provjere ne odnose na njega
        if(!securityContextService.isUserInRole("ADMIN")) {
            //doktor smije modifyjati samo svoje instructione
            //provjerava se jel pathVariable id postoji u listi instructiona za tog doktora
            Optional<User> user = securityContextService.getLoggedInUser();
            if(user.isEmpty())
                throw new LoggedUserException("logged in user exception");
            if(!listForDoctor(user.get().getId()).contains(prevInstruction)) {
                throw new RequestDeniedException("doctor can modify only his instructions");
            }

            //ne smiju se mijenjati doctor_id i patient_id
            if (!Objects.equals(instruction.getDoctor().getId(), prevInstruction.getDoctor().getId()) ||
                    !Objects.equals(instruction.getPatient().getId(), prevInstruction.getPatient().getId())) {
                throw new IllegalArgumentException("doctor_id and patient_id can't be modified");
            }
        }

        prevInstruction.copyDifferentAttributes(instruction);
        instructionRepository.save(prevInstruction);
    }

    @Override
    public void deleteInstruction(Long id) {
        instructionRepository.deleteById(id);
    }
}
