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
    Long address_id;
    String report;
    String date;

    public ExaminationDTO(Examination examination) {
        this.patient_id = examination.getPatient().getId();
        this.doctor_id = examination.getDoctor().getId();
        this.scheduler_id = examination.getScheduler().getId();
        this.address_id = examination.getAddress().getId();
        this.report = examination.getReport();
        this.date = examination.getDate().toString();
    }

//    zakomentirani kôd dolje je prvotna ideja, ali iz nekog razloga se userService ne autowirea dobro i bude null
//    zamijenjeno s istovjetnom funkcijom u ExaminationControlleru koja prima ExaminationRequest kao argument
//    bilo bi idealno naci rjesenje za autowireanje userServicea u ovoj klasi
//    NAPOMENA: nije nuzno up-to-date s ostatkom koda jer ne radi s implementacijom Address klase

//    @Autowired
//    private UserService userService;
//
//    Examination toExamination() throws IllegalArgumentException, DateTimeParseException {
//        Optional<User> patient = userService.findById(patient_id);
//        Optional<User> doctor = userService.findById(doctor_id);
//        Optional<User> scheduler = userService.findById(scheduler_id);
//
//        if(patient.isEmpty() || doctor.isEmpty() || scheduler.isEmpty())
//            throw new IllegalArgumentException("Patient, doctor or scheduler ID not found");
//
//        LocalDateTime parsedDate = LocalDateTime.parse(date);
//
//        return Examination.builder()
//                .patient(patient.get())
//                .doctor(doctor.get())
//                .scheduler(scheduler.get())
//                .address_id(address_id)
//                .report(report)
//                .date(parsedDate)
//                .build();
//    }
}
