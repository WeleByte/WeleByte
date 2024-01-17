package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ozdravi.dao.UserRepository;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.exceptions.RequestDeniedException;
import ozdravi.exceptions.UserDoesNotExistException;
import ozdravi.rest.ValidityUtil;
import ozdravi.rest.dto.UserDTO;
import ozdravi.service.RoleService;
import ozdravi.service.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleService roleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private SecurityContextService securityContextService;

    @Autowired
    private DTOManager dtoManager;

    @Override
    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    public User createUser(UserDTO userDTO, List<String> roles) {
        ValidityUtil.checkUserDTOForLoops(userDTO);
        User user = dtoManager.userDTOToUser(userDTO);
        ValidityUtil.checkUserValidity(user);

        if (findByEmail(user.getEmail()).isPresent())
            throw new IllegalArgumentException("Email already in use");

        List<Role> roleList = dtoManager.roleStringListToRoleList(roles);
        user.setRoles(roleList);

        if (!user.getPassword().startsWith("{bcrypt}"))
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public List<User> listAvailablePatients() {
        User user = securityContextService.getLoggedInUser();

        if (securityContextService.isUserInRole("ADMIN")) {
            //todo mozda staviti da admin moze vidjeti sve roditelje i djecu koja nemaju doktora
            throw new RequestDeniedException("Admin cannot have available patients");
        } else if (securityContextService.isUserInRole("DOCTOR")) {
            return listAvailablePatientsDoctor();
        } else if (securityContextService.isUserInRole("PEDIATRICIAN")) {
            return listAvailablePatientsPediatrician();
        }

        throw new RequestDeniedException("You are not authorized to view this info");
    }

    @Override
    public void assignPatient(Long id) {
        User optionalDoctor = securityContextService.getLoggedInUser();

        if (securityContextService.isUserInRole("ADMIN")) {
            //todo ne znam kolko ovo ima smisla isto, mozda bolje samo maknuti admina s te rute u potpunosti
            throw new RequestDeniedException("Admin cannot assign patients to self");
        }
        User optionalPatient = findById(id);
        optionalPatient.setDoctor(optionalDoctor);
        save(optionalPatient);
    }

    @Override
    public void removePatient(Long id) {
        User optionalDoctor = securityContextService.getLoggedInUser();

        if (securityContextService.isUserInRole("ADMIN")) {
            throw new RequestDeniedException("Admin cannot unassign patients from self");
        }
        User optionalPatient = findById(id);
        optionalPatient.setDoctor(null);
        save(optionalPatient);
    }

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }

    @Override
    public List<User> list() {
        User user = securityContextService.getLoggedInUser();

        Long id = user.getId();

        if (securityContextService.isUserInRole("PARENT")) {
            return listChildren(id);
        } else if (securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")) {
            return listPatients(id);
        } else //admin
            return listAll();
    }

    @Override
    public List<User> listDoctors(String role) {
        User workingUserOptional = securityContextService.getLoggedInUser();
        if (role.equals("doctor")) return listAllDoctors();
        else return listAllPediatricians();
    }

    @Override
    public User findById(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty())
            throw new UserDoesNotExistException("User with id " + id.toString() + " not found");

        return user.get();
    }

    @Override
    public User fetch(Long id) {
        User user = findById(id);
        User workingUser = securityContextService.getLoggedInUser();
        if (!workingUser.getId().equals(id) && !securityContextService.isUserInRole("ADMIN"))
            throw new RequestDeniedException("You are not authorized to view this user");

        return user;
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User modifyUser(UserDTO userDTO, Long id) {
        return modifyUser(userDTO, new ArrayList<>(), id);
    }

    public User modifyUser(UserDTO userDTO, List<String> roles, Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isEmpty()) throw new UserDoesNotExistException("User doesn't exist");
        User modifiedUser = optionalUser.get();
        User workingUser = securityContextService.getLoggedInUser();

        if (securityContextService.isUserInRole("ADMIN")) {
            if (roles.isEmpty()) {
                throw new RuntimeException("User must have at least one role.");
            }

            List<Role> roleList = dtoManager.roleStringListToRoleList(roles);
            User user = dtoManager.userDTOToUser(userDTO);

            userDTO.setId(id);
            ValidityUtil.checkUserDTOForLoops(userDTO);

            modifiedUser.copyDifferentAttributes(user);
            modifiedUser.setRoles(roleList);
            ValidityUtil.checkUserValidity(modifiedUser);
            userRepository.save(modifiedUser);
        } else if (workingUser.getId().equals(id) || Objects.equals(modifiedUser.getParent().getId(), workingUser.getId())) {
            modifiedUser.setInstitution_email(userDTO.getInstitution_email());

            userRepository.save(modifiedUser);
        } else {
            throw new RequestDeniedException("You are not authorized to modify this user");
        }

        return modifiedUser;
    }

    @Override
    public List<User> listChildren(Long parentId) {
        return userRepository.findUsersByParent_Id(parentId);
    }

    @Override
    public List<User> listPatients(Long doctorId) {
        return userRepository.findUsersByDoctor_Id(doctorId);
    }

    @Override
    public List<User> listAvailablePatientsDoctor() {
        return userRepository.listAvailablePatientsDoctor();
    }

    @Override
    public List<User> listAvailablePatientsPediatrician() {
        return userRepository.listAvailablePatientsPediatrician();
    }

    @Override
    public List<User> listAllDoctors() {
        Role doctorRole = roleService.findByName("doctor");
        return userRepository.findUsersByRolesContains(doctorRole);
    }

    @Override
    public List<User> listAllPediatricians() {
        Role pediatricianRole = roleService.findByName("pediatrician");
        return userRepository.findUsersByRolesContains(pediatricianRole);
    }
}
