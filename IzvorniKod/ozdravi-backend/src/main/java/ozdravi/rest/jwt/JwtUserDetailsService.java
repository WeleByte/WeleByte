package ozdravi.rest.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.service.RoleService;
import ozdravi.service.UserService;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;

    @Override
    public UserDetails loadUserByUsername(final String email) {
        final User user = userService.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User " + email + " not found"));


        return new JwtUserDetails(user.getId(), email, user.getPassword(),
                new SimpleGrantedAuthority("ROLE_" + user.getRoles().get(0).getName().toUpperCase()));
    }

    public UserDetails loadUserByUsername(String email, Long roleId) {
        final User user = userService.findByEmail(email).orElseThrow(
                () -> new UsernameNotFoundException("User " + email + " not found"));

        final Role role = roleService.findById(roleId).orElseThrow(
                () -> new UsernameNotFoundException("Role " + roleId + " not found"));

        return new JwtUserDetails(user.getId(), user.getEmail(), user.getPassword(),
                new SimpleGrantedAuthority("ROLE_" + role.getName().toUpperCase()));
    }
}
