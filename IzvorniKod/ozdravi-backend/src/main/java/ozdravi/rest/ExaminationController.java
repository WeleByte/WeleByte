package ozdravi.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping("/examinations")
    public ResponseEntity<Examination> createExamination(Examination examination) {
        Examination saved = examinationService.createExamination(examination);
        return ResponseEntity.ok().body(saved);
    }

    @PutMapping("/examination/{id}")
    public ResponseEntity<String> modifyExamination(Long id, Examination examinationModified){
        Optional<Examination> optionalExamination = examinationService.findById(id);
        if(optionalExamination.isEmpty())
            return ResponseEntity.notFound().build();

//        TODO check validity?
        examinationService.modifyExamination(examinationModified, id);

        return ResponseEntity.ok().body("Examination successfully modified");
    }
}
