package ozdravi.service;

import org.aspectj.apache.bcel.generic.InstructionTargeter;
import ozdravi.domain.Instruction;
import ozdravi.rest.dto.InstructionDTO;

import java.util.List;
import java.util.Optional;

public interface InstructionService {
    /*
        returns instructions for parents and their children
     */
    public List<Instruction> listForParent(Long id);

    public List<Instruction> list();

    /*
        returns instrucions for doctors/pediatricians
     */
    public List<Instruction> listForDoctor(Long id);

    public List<Instruction> listAll();

    Instruction createInstruction(InstructionDTO instruction);

    Instruction findById(Long id);

    void modifyInstruction(InstructionDTO instruction, Long id);

    void deleteInstruction(Long id);
}
