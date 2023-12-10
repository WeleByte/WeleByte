package ozdravi.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ozdravi.domain.User;
import ozdravi.service.UserService;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Override
    public UserDetails loadUserByUsername(final String username) {
        final User user = userService.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException("User " + username + " not found"));

//        final List<SimpleGrantedAuthority> roles = Collections.singletonList(new SimpleGrantedAuthority("ADMIN"));
        return new JwtUserDetails(user.getId(), username, user.getPassword(), authorities(username));
    }

    /**
     * returns authorities (roles) for given user, with a prefix ROLE_
     * @param username username of a user
     * @return list of authorities
     */
    private List<GrantedAuthority> authorities(String username) {
        Optional<User> user = userService.findByUsername(username);
        String roles = user.get().getRoles().stream()
                .map(r -> "ROLE_" + r.getName().toUpperCase())
                .collect(Collectors.joining(", "));
        return commaSeparatedStringToAuthorityList(roles);
    }
}
