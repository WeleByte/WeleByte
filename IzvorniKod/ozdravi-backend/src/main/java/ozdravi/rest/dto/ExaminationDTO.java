package ozdravi.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;
import ozdravi.domain.Examination;

@Component
@Data
@NoArgsConstructor
public class ExaminationDTO {
    Long patient_id;
    Long doctor_id;
    Long scheduler_id;
    AddressDTO address;
    String report;
    String date;

    public ExaminationDTO(Examination examination) {
        this.patient_id = examination.getPatient().getId();
        this.doctor_id = examination.getDoctor().getId();
        this.scheduler_id = examination.getScheduler().getId();
        this.address = new AddressDTO(examination.getAddress());
        this.report = examination.getReport();
        this.date = examination.getDate().toString();
    }
}
