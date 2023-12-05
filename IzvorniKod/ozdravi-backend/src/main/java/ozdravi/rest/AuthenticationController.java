package ozdravi.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import ozdravi.domain.User;
import ozdravi.service.UserService;

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

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody @Valid final AuthenticationRequest authenticationRequest) {
        if(userService.findByUsername(authenticationRequest.getUsername()).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not registered");

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (final BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid user or password");
        }

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(
                userDetails, tokenUtil.generateToken(userDetails)));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        if(userService.findByUsername(user.getUsername()).isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");

        if(!ValidityUtil.isValidEmail(user.getUsername()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email is not valid");

        if(!ValidityUtil.isValidOib(user.getOib()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("OIB is not valid");

        if(!ValidityUtil.isValidName(user.getFirst_name()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("First name is not valid");

        if(!ValidityUtil.isValidName(user.getLast_name()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Last name is not valid");

        userService.createUser(user);

        return ResponseEntity.ok("Successfully registrated");
    }
}
