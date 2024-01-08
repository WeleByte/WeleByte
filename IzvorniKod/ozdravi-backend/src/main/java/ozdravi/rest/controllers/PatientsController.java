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
        User user = securityContextService.getLoggedInUser();

        if(securityContextService.isUserInRole("ADMIN")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot have available patients");
        } else if(securityContextService.isUserInRole("DOCTOR")){
            return ResponseEntity.ok(userService.listAvailablePatientsDoctor());
        } else if(securityContextService.isUserInRole("PEDIATRICIAN")){
            return ResponseEntity.ok(userService.listAvailablePatientsPediatrician());
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this info");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @PutMapping("/patients/{id}")
    public ResponseEntity<?> addPatient(@PathVariable("id") Long id) {
        User optionalDoctor = securityContextService.getLoggedInUser();

        if(securityContextService.isUserInRole("ADMIN")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot assign patients to self");
        } else if(securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")){
            User optionalPatient = userService.findById(id);
            optionalPatient.setDoctor(optionalDoctor);
            userService.save(optionalPatient);
            return ResponseEntity.ok("Patient successfully assigned to you");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to assign patients");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<?> removePatient(@PathVariable("id") Long id){
        User optionalDoctor = securityContextService.getLoggedInUser();

        if(securityContextService.isUserInRole("ADMIN")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot unassign patients from self");
        } else if(securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")){
            User optionalPatient = userService.findById(id);
            optionalPatient.setDoctor(null);
            userService.save(optionalPatient);
            return ResponseEntity.ok("Patient successfully unassigned to you");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to unassign patients");
    }

}
