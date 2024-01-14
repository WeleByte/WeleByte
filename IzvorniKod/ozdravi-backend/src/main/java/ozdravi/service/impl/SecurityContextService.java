package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.service.RoleService;
import ozdravi.exceptions.LoggedUserException;
import ozdravi.service.UserService;

import java.util.Optional;

@Service
public class SecurityContextService {
    @Autowired
    UserService userService;

    @Autowired
    RoleService roleService;

    public User getLoggedInUser() {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Optional<User> user =  userService.findByEmail(userDetails.getUsername());
        if (user.isEmpty()) throw new LoggedUserException("get logged in user exception, in find by email");
        return user.get();
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
