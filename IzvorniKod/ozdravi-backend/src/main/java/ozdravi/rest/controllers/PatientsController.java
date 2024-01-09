package ozdravi.rest.controllers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.User;
import ozdravi.service.UserService;
import ozdravi.service.impl.SecurityContextService;
import java.util.Optional;

@RestController
public class PatientsController {
    @Autowired
    private UserService userService;

    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    private ObjectMapper objectMapper;

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @GetMapping("/patients/available")
    public ResponseEntity<?> getAllAvailablePatients() throws JsonProcessingException {
        System.out.println(
                objectMapper.writeValueAsString(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));

        return new ResponseEntity<>(userService.listAvailablePatients(), HttpStatus.OK);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @PutMapping("/patients/{id}")
    public ResponseEntity<?> addPatient(@PathVariable("id") Long id) {
        userService.assignPatient(id);
        return ResponseEntity.ok("Patient successfully assigned to you");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<?> removePatient(@PathVariable("id") Long id){
        userService.removePatient(id);
        return ResponseEntity.ok("Patient successfully unassigned to you");
    }

}
