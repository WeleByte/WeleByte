package ozdravi.rest;

import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;
import ozdravi.domain.User;

@Getter
public class AuthenticationResponse {
    private final String accessToken;
    private final User user;

    public AuthenticationResponse(User user, String accessToken) {
        this.accessToken = accessToken;
        this.user = user;
    }
}
