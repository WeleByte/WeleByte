package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.RoleRepository;
import ozdravi.domain.Role;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.service.RoleService;

import java.util.Optional;

@Service
public class RoleServiceJpa implements RoleService {
    @Autowired
    private RoleRepository roleRepo;

    @Override
    public Role findByName(String name) {
        Optional<Role> role = roleRepo.findByName(name);
        if (role.isEmpty()) throw new EntityMissingException("No role with such name");
        return role.get();
    }

    @Override
    public Role findById(Long id) {
        Optional<Role> role = roleRepo.findById(id);
        if (role.isEmpty()) throw new EntityMissingException("No role with such id");
        return role.get();
    }
}
