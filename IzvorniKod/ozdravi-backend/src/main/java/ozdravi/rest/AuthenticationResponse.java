package ozdravi.rest;

import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;

@Getter
public class AuthenticationResponse {
    private final String accessToken;
    private final String username;

    public AuthenticationResponse(UserDetails user, String accessToken) {
        this.username = user.getUsername();
        this.accessToken = accessToken;
    }
}
