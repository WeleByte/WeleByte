package ozdravi.rest.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ozdravi.domain.Examination;
import ozdravi.domain.User;
import ozdravi.service.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Optional;

@Component
@Data
@NoArgsConstructor
public class ExaminationRequest {
    Long patient_id;
    Long doctor_id;
    Long scheduler_id;
    AddressDTO address;
    String report;
    String date;

    public ExaminationRequest(Examination examination) {
        this.patient_id = examination.getPatient().getId();
        this.doctor_id = examination.getDoctor().getId();
        this.scheduler_id = examination.getScheduler().getId();
        this.address = new AddressDTO(examination.getAddress());
        this.report = examination.getReport();
        this.date = examination.getDate().toString();
    }
}
