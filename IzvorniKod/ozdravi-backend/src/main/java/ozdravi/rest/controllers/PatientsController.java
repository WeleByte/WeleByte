package ozdravi.rest.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.User;
import ozdravi.rest.jwt.JwtTokenUtil;
import ozdravi.service.UserService;

import java.util.Optional;

@RestController
public class PatientsController {
    @Autowired
    private UserService userService;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @GetMapping("/patients/available")
    public ResponseEntity<?> getAllAvailablePatients(HttpServletRequest request) {
        Optional<User> user = jwtTokenUtil.getUserFromRequest(request);
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(request.isUserInRole("ADMIN")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot have available patients");
        } else if(request.isUserInRole("DOCTOR")){
            return ResponseEntity.ok(userService.listAvailablePatientsDoctor());
        } else if(request.isUserInRole("PEDIATRICIAN")){
            return ResponseEntity.ok(userService.listAvailablePatientsPediatrician());
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this info");
    }

    @PutMapping("/patients/{id}")
    public ResponseEntity<?> addPatient(HttpServletRequest request, @PathVariable("id") Long id) {
        Optional<User> optionalDoctor = jwtTokenUtil.getUserFromRequest(request);
        if(optionalDoctor.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(request.isUserInRole("ADMIN")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot assign patients to self");
        } else if(request.isUserInRole("DOCTOR") || request.isUserInRole("PEDIATRICIAN")){
            Optional<User> optionalPatient = userService.findById(id);
            if(optionalPatient.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient with given id does not exist");
            optionalPatient.get().setDoctor(optionalDoctor.get());
            return ResponseEntity.ok("Patient successfully assigned to you");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to assign patients");
    }

    @DeleteMapping("/patients/{id}")
    public ResponseEntity<?> removePatient(HttpServletRequest request, @PathVariable("id") Long id){
        Optional<User> optionalDoctor = jwtTokenUtil.getUserFromRequest(request);
        if(optionalDoctor.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(request.isUserInRole("ADMIN")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot unassign patients from self");
        } else if(request.isUserInRole("DOCTOR") || request.isUserInRole("PEDIATRICIAN")){
            Optional<User> optionalPatient = userService.findById(id);
            if(optionalPatient.isEmpty())
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Patient with given id does not exist");
            optionalPatient.get().setDoctor(null);
            return ResponseEntity.ok("Patient successfully unassigned to you");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to unassign patients");
    }

}
