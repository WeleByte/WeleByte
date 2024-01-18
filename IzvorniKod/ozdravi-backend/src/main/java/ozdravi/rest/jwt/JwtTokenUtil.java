package ozdravi.rest.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import ozdravi.service.UserService;

import java.time.Duration;
import java.time.Instant;

@Service
public class JwtTokenUtil {
    private static final Duration JWT_TOKEN_VALIDITY = Duration.ofMinutes(120);

    private final Algorithm hmac512;
    private final JWTVerifier verifier;

    @Autowired
    UserService userService;

    public JwtTokenUtil(@Value("${jwt.secret}") final String secret) {
        this.hmac512 = Algorithm.HMAC512(secret);
        this.verifier = JWT.require(this.hmac512).build();
    }

    public String generateToken(String email, Long roleId) {
        final Instant now = Instant.now();
        return JWT.create()
                .withSubject(email)
                .withIssuer("app")
                .withIssuedAt(now)
                .withExpiresAt(now.plusMillis(JWT_TOKEN_VALIDITY.toMillis()))
                .withClaim("role_id", roleId)
                .sign(this.hmac512);
    }

    public DecodedJWT validateToken(final String token) {
        try {
            return verifier.verify(token);
        } catch (final JWTVerificationException verificationEx) {
            return null;
        }
    }
}