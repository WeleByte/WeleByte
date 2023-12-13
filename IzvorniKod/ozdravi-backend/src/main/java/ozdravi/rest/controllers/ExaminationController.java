package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Examination;
import ozdravi.domain.User;
import ozdravi.rest.dto.ExaminationRequest;
import ozdravi.service.ExaminationService;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@RestController
public class ExaminationController {
    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private DTOManager dtoManager;

    @GetMapping("/examinations")
    public List<Examination> getAllExaminations() {
        return examinationService.listAll();
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
    @PostMapping("/examinations")
    public ResponseEntity<?> createExamination(@RequestBody ExaminationRequest examinationRequest) {

        try{
            Examination examination = dtoManager.examRequestToExamination(examinationRequest);
            return ResponseEntity.ok().body(examinationService.createExamination(examination));
        }catch (IllegalArgumentException e){
//            ne hvatamo DateTimeParseException; s tim se bavi CustomExceptionHandler
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/examination/{id}")
    public ResponseEntity<String> modifyExamination(@PathVariable("id") Long id, @RequestBody ExaminationRequest examinationRequest){
        Optional<Examination> optionalExamination = examinationService.findById(id);

        if(optionalExamination.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Examination doesn't exist");

        try{
            Examination examination = dtoManager.examRequestToExamination(examinationRequest);
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
