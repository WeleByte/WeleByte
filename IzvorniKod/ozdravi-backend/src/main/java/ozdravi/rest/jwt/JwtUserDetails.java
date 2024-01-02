package ozdravi.rest.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;

public class JwtUserDetails extends User {
    public final Long id;

    public JwtUserDetails(final Long id, final String email, final String hash,
                          GrantedAuthority authority) {
        super(email, hash, Collections.singletonList(authority));
        this.id = id;
    }
}
