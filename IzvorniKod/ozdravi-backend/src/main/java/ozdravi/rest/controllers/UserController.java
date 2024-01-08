package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.rest.ValidityUtil;
import ozdravi.rest.dto.CreateUserRequest;
import ozdravi.rest.dto.UserDTO;
import ozdravi.service.RoleService;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;
import java.net.URI;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    SecurityContextService securityContextService;

    @Autowired
    private RoleService roleService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.list(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest createUserRequest) {
        User user = userService.createUser(createUserRequest);
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

//    GET mapping for doctors or pediatricians
    @GetMapping("/users/{role}s")
    public ResponseEntity<?> getDoctors(@PathVariable("role") String role){
        Optional<User> workingUserOptional = securityContextService.getLoggedInUser();
        if(workingUserOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(securityContextService.isUserInRole("USER")) return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You don't have the permissions to do this");

        if(!role.equals("doctor") && !role.equals("pediatrician")) return ResponseEntity.badRequest().body("Only doctors or pediatricians can be fetched");

        if(securityContextService.isUserInRole("ADMIN")
            || securityContextService.isUserInRole("DOCTOR")
            || securityContextService.isUserInRole("PEDIATRICIAN")){
            try{
                if(role.equals("doctor")) return ResponseEntity.ok(userService.listAllDoctors());
                return ResponseEntity.ok(userService.listAllPediatricians());
            }catch (Exception e){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
            }
        }

//        (ne bi trebalo doci do tu pa je zato server error)
        return ResponseEntity.internalServerError().build();
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.findById(id), HttpStatus.OK);
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> modifyUser(@PathVariable("id") Long id, @RequestBody UserDTO userModifiedDTO){
        userService.modifyUser(userModifiedDTO, id);
        return new ResponseEntity<>("User successfully modified", HttpStatus.OK);
    }
}



