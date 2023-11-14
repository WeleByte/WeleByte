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
    public ResponseEntity<Boolean> register(@RequestBody User user) {

        if(userService.findByUsername(user.getUsername()).isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body(false);

        userService.createUser(user);

        return ResponseEntity.ok(true);
    }
}
