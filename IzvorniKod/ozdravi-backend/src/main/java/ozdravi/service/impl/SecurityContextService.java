package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ozdravi.domain.User;
import ozdravi.service.UserService;

import java.util.Optional;

@Service
public class SecurityContextService {
    @Autowired
    UserService userService;

    public Optional<User> getLoggedInUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.findByEmail(userDetails.getUsername());
    }

    public boolean isUserInRole(String role) {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_" + role.toUpperCase()));
    }
}
