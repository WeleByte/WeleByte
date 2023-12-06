package ozdravi.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Examination;
import ozdravi.service.ExaminationService;
import java.util.List;
import java.util.Optional;

@RestController
public class ExaminationController {
    @Autowired
    private ExaminationService examinationService;

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
    public ResponseEntity<Examination> createExamination(@RequestBody Examination examination) {

//        TODO zamijeniti try/catch s provjerom valjanosti zahtjeva
        try{
            Examination saved = examinationService.createExamination(examination);
            return ResponseEntity.ok().body(saved);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(examination);
        }
    }

    @PutMapping("/examination/{id}")
    public ResponseEntity<String> modifyExamination(Long id, @RequestBody Examination examinationModified){
        Optional<Examination> optionalExamination = examinationService.findById(id);
        if(optionalExamination.isEmpty())
            return ResponseEntity.notFound().build();

//        TODO zamijeniti try/catch s provjerom valjanosti zahtjeva
        try {
            examinationService.modifyExamination(examinationModified, id);
            return ResponseEntity.ok().body("Examination successfully modified");
        } catch (Exception e){
            return ResponseEntity.badRequest().build();
        }

    }
}
