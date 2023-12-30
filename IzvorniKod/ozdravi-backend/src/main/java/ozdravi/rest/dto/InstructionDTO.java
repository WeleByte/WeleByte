package ozdravi.rest.dto;

import lombok.Data;
import ozdravi.domain.Instruction;

import java.time.LocalDateTime;

@Data
public class InstructionDTO {
    Long id;
    Long doctor_id;
    Long patient_id;
    LocalDateTime date;
    String content;

    public InstructionDTO() {

    }

    public InstructionDTO(Instruction instruction) {
        this.id = instruction.getId();
        this.doctor_id = instruction.getDoctor().getId();
        this.patient_id = instruction.getPatient().getId();
        this.date = instruction.getDate();
        this.content = instruction.getContent();
    }
}
