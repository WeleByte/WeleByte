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
        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

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
        Optional<User> optionalDoctor = securityContextService.getLoggedInUser();
        if(optionalDoctor.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(securityContextService.isUserInRole("ADMIN")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot assign patients to self");
        } else if(securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")){
            Optional<User> optionalPatient = userService.findById(id);
            if(optionalPatient.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient with given id does not exist");
            optionalPatient.get().setDoctor(optionalDoctor.get());
            userService.save(optionalPatient.get());
            return ResponseEntity.ok("Patient successfully assigned to you");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to assign patients");
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @DeleteMapping("/patients/{id}")
    public ResponseEntity<?> removePatient(@PathVariable("id") Long id){
        Optional<User> optionalDoctor = securityContextService.getLoggedInUser();
        if(optionalDoctor.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(securityContextService.isUserInRole("ADMIN")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot unassign patients from self");
        } else if(securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")){
            Optional<User> optionalPatient = userService.findById(id);
            if(optionalPatient.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient with given id does not exist");
            optionalPatient.get().setDoctor(null);
            userService.save(optionalPatient.get());
            return ResponseEntity.ok("Patient successfully unassigned to you");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to unassign patients");
    }

}
