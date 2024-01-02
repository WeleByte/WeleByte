package ozdravi.rest.dto;

import lombok.Getter;
import org.springframework.security.core.userdetails.UserDetails;
import ozdravi.domain.User;

@Getter
public class AuthenticationResponse {
    private final String accessToken;
    private final String currentRole;
    private final User user;

    public AuthenticationResponse(User user, String accessToken, String currentRole) {
        this.accessToken = accessToken;
        this.user = user;
        this.currentRole = currentRole;
    }
}
