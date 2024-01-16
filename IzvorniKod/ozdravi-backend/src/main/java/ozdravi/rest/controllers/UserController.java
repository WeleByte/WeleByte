package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.exceptions.RequestDeniedException;
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
    SecurityContextService securityContextService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        return new ResponseEntity<>(userService.list(), HttpStatus.OK);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest createUserRequest) {
        UserDTO userDTO = createUserRequest.getUserDTO();
        List<String> roles = createUserRequest.getRoles();
        User user = userService.createUser(userDTO, roles);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
        //return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

//    GET mapping for doctors or pediatricians
//    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR', 'PEDIATRICIAN')")
    @GetMapping("/users/{role}s")
    public ResponseEntity<?> getDoctors(@PathVariable("role") String role){
        if(!role.equals("doctor") && !role.equals("pediatrician"))
            return ResponseEntity.badRequest().body("Only doctors or pediatricians can be fetched");

        return new ResponseEntity<>(userService.listDoctors(role), HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") Long id) {
        return new ResponseEntity<>(userService.fetch(id), HttpStatus.OK);
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> modifyUser(@PathVariable("id") Long id, @RequestBody UserDTO userModifiedDTO){
        userService.modifyUser(userModifiedDTO, id);
        return new ResponseEntity<>("User successfully modified", HttpStatus.OK);
    }
}



