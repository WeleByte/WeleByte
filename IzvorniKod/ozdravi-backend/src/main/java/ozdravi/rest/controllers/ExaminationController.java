package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Examination;
import ozdravi.domain.User;
import ozdravi.rest.dto.ExaminationRequest;
import ozdravi.service.ExaminationService;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@RestController
public class ExaminationController {
    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private UserService userService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    SecurityContextService securityContextService;

    @GetMapping("/examinations")
    public ResponseEntity<?> getAllExaminations() {
        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        Long id = user.get().getId();

        if(securityContextService.isUserInRole("PARENT")){
            return ResponseEntity.ok(examinationService.listParentExaminations(id));
        } else if(securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")){
            return ResponseEntity.ok(examinationService.listDoctorExaminations(id));
        } else if(securityContextService.isUserInRole("ADMIN")) {
            return ResponseEntity.ok(examinationService.listAll());
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @GetMapping("/examination/{id}")
    public ResponseEntity<?> getExamination(Long id) {
        Optional<Examination> examination = examinationService.findById(id);
        if(examination.isPresent())
            return ResponseEntity.ok().body(examination.get());
        else
            return ResponseEntity.notFound().build();
    }

    //        primjer datuma za POST
//        "date":"2023-12-06T20:18:37.3933286"
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR')")
    // samo doktori i pedijatri mogu stvarati examinatione
    @PostMapping("/examinations")
    public ResponseEntity<?> createExamination(@RequestBody ExaminationRequest examinationRequest) {
        Optional<User> scheduler = securityContextService.getLoggedInUser();
        if(scheduler.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        // TODO scheduler_id je id onoga tko je poslao zahtjev? jel to na frontendu?
        // ovdje se pretpostavlja da je, onda automatski scheduler ne moze biti nitko tko niej pediatrician ili doctor
        try{
            Examination examination = dtoManager.examRequestToExamination(examinationRequest);

            //provjere da su svi id-evi odgovarajuci (ne moze se za id doktroa stavit id roditelja npr)
            Optional<User> patient = userService.findById(examination.getPatient().getId());
            Optional<User> doctor = userService.findById(examination.getDoctor().getId());
            if(patient.isPresent() && doctor.isPresent()) {
                if (patient.get().getRoles().stream().noneMatch(role -> Objects.equals(role.getName(), "parent") || Objects.equals(role.getName(), "child"))) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No patient with such ID.");
                }
                if (doctor.get().getRoles().stream().noneMatch(role -> Objects.equals(role.getName(), "doctor") || Objects.equals(role.getName(), "pediatrician"))) {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("No doctor with such ID.");
                }
            }

            //provjera da onaj koji zakazuje pregled (scheduler) mora biti doktor zaduzen za tog pacijenta
            User requiredDoctor = patient.get().getDoctor();
            if (requiredDoctor == null || !Objects.equals(requiredDoctor.getId(), scheduler.get().getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Doctor can schedule examinations only for his patients");
            }

            return ResponseEntity.ok().body(examinationService.createExamination(examination));
        }catch (IllegalArgumentException e){
//            ne hvatamo DateTimeParseException; s tim se bavi CustomExceptionHandler
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR')")
    // samo doktori i pedijatri smiju mjenjati examinatione
    @PutMapping("/examination/{id}")
    public ResponseEntity<String> modifyExamination(@PathVariable("id") Long id, @RequestBody ExaminationRequest examinationRequest){
        Optional<Examination> optionalExamination = examinationService.findById(id);

        if(optionalExamination.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Examination doesn't exist");

        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        // provjera da id doktora koji pokusava urediti examination odgovara id-u doktora navedenog na examinationu (u sustavu!!)
        if(!Objects.equals(optionalExamination.get().getDoctor().getId(), user.get().getId())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Doctor can modify only his examinations.");
        }

        try{
            Examination examination = dtoManager.examRequestToExamination(examinationRequest);

            //doctor_id, patient_id, scheduler_id, address_id se ne smiju moci mjenjati
            Examination prevExamination = optionalExamination.get();
            if(!Objects.equals(prevExamination.getDoctor().getId(), examination.getDoctor().getId()) ||
                    !Objects.equals(prevExamination.getPatient().getId(), examination.getPatient().getId()) ||
                    !Objects.equals(prevExamination.getScheduler().getId(), examination.getScheduler().getId()) ||
                    !Objects.equals(prevExamination.getAddress().getId(), examination.getAddress().getId())) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("doctor_id, patient_id, scheduler_id and address_id can't be modified.");
            }

            examinationService.modifyExamination(examination, id);
            return ResponseEntity.ok().body("Examination successfully modified");
        } catch(IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (DateTimeParseException e){
            throw e;
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}