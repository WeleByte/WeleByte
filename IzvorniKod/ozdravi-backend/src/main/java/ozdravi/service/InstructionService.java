package ozdravi.service;

import ozdravi.domain.Instruction;

import java.util.List;
import java.util.Optional;

public interface InstructionService {
    /*
        returns instructions for parents and their children
     */
    public List<Instruction> listForParent(Long id);

    /*
        returns instrucions for doctors/pediatricians
     */
    public List<Instruction> listForDoctor(Long id);

    public List<Instruction> listAll();

    Instruction createInstruction(Instruction instruction);

    Optional<Instruction> findById(Long id);

    void modifyInstruction(Instruction instruction, Long id);

    void deleteInstruction(Long id);
}
