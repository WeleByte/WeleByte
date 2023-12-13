package ozdravi.service.impl;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
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
        String token = jwtTokenUtil.extractToken(request);
        String email = jwtTokenUtil.validateTokenAndGetEmail(token);
        Optional<User> user = userService.findByEmail(email);
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(request.isUserInRole("ADMIN")){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin cannot have available patients");
        } else if(request.isUserInRole("DOCTOR")){
            return ResponseEntity.ok(userService.listAvailablePatientsDoctor());
        } else if(request.isUserInRole("PEDIATRICIAN")){
            return ResponseEntity.ok(userService.listAvailablePatientsPediatrician());
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this page");
    }

}
