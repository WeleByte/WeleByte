package ozdravi.service;

import ozdravi.domain.Role;

import java.util.Optional;

public interface RoleService {

    Optional<Role> findByName(String name);
}
