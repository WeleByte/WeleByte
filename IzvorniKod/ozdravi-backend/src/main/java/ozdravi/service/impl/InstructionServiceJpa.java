package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.InstructionRepository;
import ozdravi.domain.Instruction;
import ozdravi.service.InstructionService;

import java.util.List;
import java.util.Optional;

@Service
public class InstructionServiceJpa implements InstructionService {
    @Autowired
    InstructionRepository instructionRepository;

    @Override
    public List<Instruction> listForParent(Long id) {
        return instructionRepository.listForParent(id);
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
    public Instruction createInstruction(Instruction instruction) {
        return instructionRepository.save(instruction);
    }

    @Override
    public Optional<Instruction> findById(Long id) {
        return instructionRepository.findById(id);
    }

    @Override
    public void modifyInstruction(Instruction instruction, Long id) {
        Optional<Instruction> inst = instructionRepository.findById(id);
        if (inst.isPresent()) {
            inst.get().copyDifferentAttributes(instruction);
            instructionRepository.save(inst.get());
        }
    }

    @Override
    public void deleteInstruction(Long id) {
        instructionRepository.deleteById(id);
    }
}
