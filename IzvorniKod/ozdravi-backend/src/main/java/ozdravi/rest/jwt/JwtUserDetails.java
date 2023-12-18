package ozdravi.rest.jwt;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class JwtUserDetails extends User {
    public final Long id;

    public JwtUserDetails(final Long id, final String email, final String hash,
                          final Collection<? extends GrantedAuthority> authorities) {
        super(email, hash, authorities);
        this.id = id;
    }
}
