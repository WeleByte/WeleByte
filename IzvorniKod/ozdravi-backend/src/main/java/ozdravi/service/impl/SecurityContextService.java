package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.service.RoleService;
import ozdravi.service.UserService;

import java.util.Optional;

@Service
public class SecurityContextService {
    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    public Optional<User> getLoggedInUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userService.findByEmail(userDetails.getUsername());
    }

    public boolean isUserInRole(String role) {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_" + role.toUpperCase()));
    }

    public Role getCurrentRole(){
        String roleName = SecurityContextHolder.getContext().getAuthentication()
                .getAuthorities()
                .stream().findFirst().get().toString().toLowerCase()
                .replace("role_", "");

        return roleService.findByName(roleName).get();
    }
}
