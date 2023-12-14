package ozdravi.rest.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.JWTVerifier;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ozdravi.domain.User;
import ozdravi.service.UserService;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Service
public class JwtTokenUtil {
    private static final Duration JWT_TOKEN_VALIDITY = Duration.ofMinutes(20);

    private final Algorithm hmac512;
    private final JWTVerifier verifier;

    @Autowired
    UserService userService;

    public JwtTokenUtil(@Value("${jwt.secret}") final String secret) {
        this.hmac512 = Algorithm.HMAC512(secret);
        this.verifier = JWT.require(this.hmac512).build();
    }

    public String generateToken(final UserDetails userDetails) {
        final Instant now = Instant.now();
        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withIssuer("app")
                .withIssuedAt(now)
                .withExpiresAt(now.plusMillis(JWT_TOKEN_VALIDITY.toMillis()))
                .sign(this.hmac512);
    }

    public String validateTokenAndGetEmail(final String token) {
        try {
            return verifier.verify(token).getSubject();
        } catch (final JWTVerificationException verificationEx) {
            return null;
        }
    }

    public String extractToken(HttpServletRequest request) {
        final String header = request.getHeader("Authorization");
        if (header == null || !header.startsWith("Bearer ")) {
            return null;
        }
        return header.substring(7);
    }

    //
    public Optional<User> getUserFromRequest(HttpServletRequest request){
        String token = extractToken(request);
        String email = validateTokenAndGetEmail(token);
        return userService.findByEmail(email);
    }
}