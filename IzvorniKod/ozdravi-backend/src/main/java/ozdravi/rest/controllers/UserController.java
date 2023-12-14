package ozdravi.rest.controllers;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.User;
import ozdravi.rest.ValidityUtil;
import ozdravi.rest.dto.UserDTO;
import ozdravi.rest.jwt.JwtTokenUtil;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;

import java.net.URI;
import java.time.format.DateTimeParseException;
import java.util.Optional;

@RestController
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    JwtTokenUtil jwtTokenUtil;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers(HttpServletRequest request) {
        Optional<User> user = jwtTokenUtil.getUserFromRequest(request);
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        Long id = user.get().getId();

        if (request.isUserInRole("ADMIN")) {
            return ResponseEntity.ok(userService.listAll());
        } else if (request.isUserInRole("PARENT")) {
            return ResponseEntity.ok(userService.listChildren(id));
        } else if (request.isUserInRole("DOCTOR") || request.isUserInRole("PEDIATRICIAN")) {
            return ResponseEntity.ok(userService.listPatients(id));
        }

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/users")
    public ResponseEntity<?> createUser(@RequestBody UserDTO userDTO) {
        ResponseEntity<String> controlRes = ValidityUtil.checkUserDTOForLoops(userDTO);
        if(controlRes.getStatusCode()!= HttpStatus.OK)
            return ResponseEntity.badRequest().body("User can't be own parent or doctor");

        User user;
        try {
            user = dtoManager.userDTOToUser(userDTO);
            controlRes = ValidityUtil.checkUserValidity(user);
            if(controlRes.getStatusCode()!= HttpStatus.OK)
                return controlRes;
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        User saved = userService.createUser(user);
        return ResponseEntity.created(URI.create("/users/" + saved.getId())).body(saved);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") Long id, HttpServletRequest request) {
        Optional<User> workingUser = jwtTokenUtil.getUserFromRequest(request);
        if(workingUser.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        if(!workingUser.get().getId().equals(id) && !request.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this info");

        Optional<User> user = userService.findById(id);

        if(user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("user/{id}")
    public ResponseEntity<?> modifyUser(@PathVariable("id") Long id, @RequestBody UserDTO userModifiedDTO,
                                        HttpServletRequest request){
        Optional<User> workingUser = jwtTokenUtil.getUserFromRequest(request);
        if(workingUser.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        if(!workingUser.get().getId().equals(id) && !request.isUserInRole("ADMIN"))
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
