package ozdravi.rest;

import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
public class AuthenticationResponse {
    private final String accessToken;
    private final String email;

    public AuthenticationResponse(UserDetails user, String accessToken) {
        this.email = user.getUsername();
        this.accessToken = accessToken;
    }
}
