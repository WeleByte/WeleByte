package ozdravi.service;

import ozdravi.domain.Role;

import java.util.Optional;

public interface RoleService {
    Role findByName(String name);

    Role findById(Long id);
}
