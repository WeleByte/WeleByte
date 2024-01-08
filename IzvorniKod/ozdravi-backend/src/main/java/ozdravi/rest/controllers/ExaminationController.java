package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Examination;
import ozdravi.rest.dto.ExaminationDTO;
import ozdravi.service.ExaminationService;
import java.util.List;

@RestController
public class ExaminationController {
    @Autowired
    private ExaminationService examinationService;

    @GetMapping("/examinations")
    public ResponseEntity<List<Examination>> getAllExaminations() {
        return new ResponseEntity<>(examinationService.list(), HttpStatus.OK);
    }

    @GetMapping("/examination/{id}")
    public ResponseEntity<?> getExamination(@PathVariable("id") Long id) {
        return new ResponseEntity<>(examinationService.findById(id), HttpStatus.OK);
    }

    //        primjer datuma za POST
//        "date":"2023-12-06T20:18:37.3933286"
    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    // samo doktori i pedijatri mogu stvarati examinatione
    @PostMapping("/examinations")
    public ResponseEntity<?> createExamination(@RequestBody ExaminationDTO examinationDTO) {
        return new ResponseEntity<>(examinationService.createExamination(examinationDTO), HttpStatus.CREATED);
    }

    @PreAuthorize("hasAnyRole('PEDIATRICIAN', 'DOCTOR', 'ADMIN')")
    // samo doktori i pedijatri smiju mjenjati examinatione
    @PutMapping("/examination/{id}")
    public ResponseEntity<?> modifyExamination(@PathVariable("id") Long id, @RequestBody ExaminationDTO examinationDTO){
        examinationService.modifyExamination(examinationDTO, id);
        return new ResponseEntity<>("Examination successfully modified", HttpStatus.OK);
    }
}