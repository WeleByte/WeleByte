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

        final UserDetails userDetails = jwtUserDetailsService.loadUserByUsername(authenticationRequest.getEmail());

        return ResponseEntity.ok(new AuthenticationResponse(
                user.get(), tokenUtil.generateToken(userDetails)));
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {

        if(userService.findByEmail(user.getEmail()).isPresent())
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");

        ResponseEntity<String> res = ValidityUtil.checkUserValidity(user);
        if(res.getStatusCode()!= HttpStatus.OK)
            return res;

        userService.createUser(user);

        return ResponseEntity.ok("Successfully registered");
    }
}
