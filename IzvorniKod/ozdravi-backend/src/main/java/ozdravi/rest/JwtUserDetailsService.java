package ozdravi.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ozdravi.dao.UserRepository;
import ozdravi.domain.User;

import java.util.Collections;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    UserRepository userRepository;

    public static final String USER = "USER";
    public static final String ROLE_USER = "ROLE_" + USER;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        final User user = userRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User " + username + " not found"));

        final List<SimpleGrantedAuthority> roles = Collections.singletonList(new SimpleGrantedAuthority("ADMIN"));
        return new JwtUserDetails(user.getId(), username, user.getPassword(), roles);
    }

}
