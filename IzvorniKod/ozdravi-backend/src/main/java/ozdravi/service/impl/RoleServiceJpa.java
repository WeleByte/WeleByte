package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.RoleRepository;
import ozdravi.domain.Role;
import ozdravi.service.RoleService;

import java.util.Optional;

@Service
public class RoleServiceJpa implements RoleService {
    @Autowired
    private RoleRepository roleRepo;

    @Override
    public Optional<Role> findByName(String name) {
        return roleRepo.findByName(name);
    }
}
