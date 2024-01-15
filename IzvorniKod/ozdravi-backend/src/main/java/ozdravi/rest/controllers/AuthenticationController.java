package ozdravi.rest.controllers;


import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.rest.dto.AuthenticationRequest;
import ozdravi.rest.dto.AuthenticationResponse;
import ozdravi.rest.ValidityUtil;
import ozdravi.rest.dto.ChangeRoleRequest;
import ozdravi.rest.dto.UserDTO;
import ozdravi.rest.jwt.JwtTokenUtil;
import ozdravi.rest.jwt.JwtUserDetailsService;
import ozdravi.service.RoleService;
import ozdravi.service.UserService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class AuthenticationController {
    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private JwtUserDetailsService jwtUserDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    private SecurityContextService securityContextService;

    @Autowired
    private ObjectMapper objectMapper;

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody @Valid final AuthenticationRequest authenticationRequest) {
        Optional<User> user = userService.findByEmail(authenticationRequest.getEmail());

        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not registered");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getEmail(), authenticationRequest.getPassword()));
        } catch (final BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user or password");
        }

        Long role = user.get().getRoles().get(0).getId();
        return ResponseEntity.ok(new AuthenticationResponse(
                user.get(), tokenUtil.generateToken(authenticationRequest.getEmail(), role),
                user.get().getRoles().get(0).getName()));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        UserDTO userDTO = dtoManager.userToUserDTO(user);
        userService.createUser(userDTO, List.of("parent"));


//        if(userService.findByEmail(user.getEmail()).isPresent())
//            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
//
//        ValidityUtil.checkUserValidity(user);
//
//        Role role = roleService.findByName("parent");
//        user.setRoles(List.of(role));
//
//        User registeredUser = userService.createUser(user);
//
        return new ResponseEntity<>("Successfully registered", HttpStatus.CREATED);
    }

    @PostMapping("/change_role")
    public ResponseEntity<?> change_role(@RequestBody final ChangeRoleRequest changeRoleRequest) {
        User user = securityContextService.getLoggedInUser();
        Role role = roleService.findById(changeRoleRequest.getRoleId());

        List<Role> userRoles = user.getRoles();
        if(userRoles.contains(role)) {
            return ResponseEntity.ok(new AuthenticationResponse(
                    user, tokenUtil.generateToken(user.getEmail(), changeRoleRequest.getRoleId()),
                    role.getName()));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

//    TODO prilagoditi na novu organizaciju nakon PR-a
    @GetMapping("/role")
    public ResponseEntity<?> getRole(){
        return ResponseEntity.ok(securityContextService.getCurrentRole());
    }
}
