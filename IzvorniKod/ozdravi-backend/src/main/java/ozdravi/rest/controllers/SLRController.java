package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Examination;
import ozdravi.domain.SLR;
import ozdravi.domain.User;
import ozdravi.rest.dto.SLRDTO;
import ozdravi.service.ExaminationService;
import ozdravi.service.SLRService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.Optional;

@RestController
public class SLRController {
    @Autowired
    private SLRService slrService;

    @Autowired
    private ExaminationService examinationService;

    @PreAuthorize("hasAnyRole('ADMIN', 'PEDIATRICIAN')")
    @PostMapping("/sick_leave_recommendations")
    public ResponseEntity<?> createSLR(@RequestBody SLRDTO slrDTO) {
        Examination examination = examinationService.findById(slrDTO.getExamination_id());

        return new ResponseEntity<>(slrService.createSLR(examination), HttpStatus.CREATED);
    }

    @GetMapping("/sick_leave_recommendations")
    public ResponseEntity<?> listSLRs() {
        return ResponseEntity.ok().body(slrService.list());
    }

    @GetMapping("/sick_leave_recommendation/{id}")
    public ResponseEntity<?> getSLR(@PathVariable("id") Long id) {
        return new ResponseEntity<>(slrService.fetch(id), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'PEDIATRICIAN')")
    @PutMapping("/sick_leave_recommendations/{id}")
    public ResponseEntity<?> updateSLR(@PathVariable("id") Long id, @RequestBody SLRDTO slrDTO) {
        slrService.modifySLR(slrDTO, id);
        return ResponseEntity.ok().body("Sick leave recommendation successfully updated");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    @PatchMapping("/sick_leave_recommendations/{id}")
    public ResponseEntity<?> approveSLR(@PathVariable("id") Long id, @RequestBody SLRDTO slrDTO) {
        slrService.approveSLR(id, slrDTO.getStatus());

        String approvalString = slrDTO.getStatus() ? "approved" : "rejected";
        return ResponseEntity.ok().body("Sick leave recommendation with id: " + id.toString() + " successfully " + approvalString);
    }
}
