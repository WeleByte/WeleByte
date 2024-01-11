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

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        Long id = user.get().getId();

        if (securityContextService.isUserInRole("ADMIN")) {
            return ResponseEntity.ok(userService.listAll());
        } else if (securityContextService.isUserInRole("PARENT")) {
            return ResponseEntity.ok(userService.listChildren(id));
        } else if (securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")) {
            return ResponseEntity.ok(userService.listPatients(id));
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @Autowired
    private RoleService roleService;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest createUserRequest) {
        UserDTO userDTO = createUserRequest.getUserDTO();
        List<String> roles = createUserRequest.getRoles();

        ResponseEntity<String> controlRes = ValidityUtil.checkUserDTOForLoops(userDTO);
        if(controlRes.getStatusCode()!= HttpStatus.OK)
            return ResponseEntity.badRequest().body("User can't be own parent or doctor");

        User user;
        try {
            user = dtoManager.userDTOToUser(userDTO);

            controlRes = ValidityUtil.checkUserValidity(user);
            if(controlRes.getStatusCode()!= HttpStatus.OK)
                return controlRes;

            if(userService.findByEmail(user.getEmail()).isPresent())
                return ResponseEntity.badRequest().body("Email already in use");

        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        try {
            List<Role> roleList = dtoManager.roleStringListToRoleList(roles);
            user.setRoles(roleList);
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        User saved = userService.createUser(user);
        return ResponseEntity.created(URI.create("/users/" + saved.getId())).body(saved);
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
        Optional<User> workingUser = securityContextService.getLoggedInUser();
        if(workingUser.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        if(!workingUser.get().getId().equals(id) && !securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this info");

        Optional<User> user = userService.findById(id);

        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> modifyUser(@PathVariable("id") Long id, @RequestBody UserDTO userModifiedDTO){
        Optional<User> workingUser = securityContextService.getLoggedInUser();
        if(workingUser.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        if(!workingUser.get().getId().equals(id) && !securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to modify this user");

        userModifiedDTO.setId(id);

        Optional<User> optionalUser = userService.findById(id);
        if(optionalUser.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User doesn't exist");

        ResponseEntity<String> controlRes = ValidityUtil.checkUserDTOForLoops(userModifiedDTO);
        if(controlRes.getStatusCode()!= HttpStatus.OK)
            return controlRes;

        User userModified;
        try{
            userModified = dtoManager.userDTOToUser(userModifiedDTO);
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        controlRes = ValidityUtil.checkUserValidity(userModified);
        if(controlRes.getStatusCode()!= HttpStatus.OK)
            return controlRes;

        try {
            userService.modifyUser(userModified, id);
        } catch (DateTimeParseException e){
            throw e;
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }

        return ResponseEntity.ok().body(optionalUser.get());
    }

}
