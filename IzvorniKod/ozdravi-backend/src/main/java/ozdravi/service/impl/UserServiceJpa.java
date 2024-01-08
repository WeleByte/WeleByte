package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ozdravi.dao.RoleRepository;
import ozdravi.dao.UserRepository;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.exceptions.LoggedUserException;
import ozdravi.exceptions.RequestDeniedException;
import ozdravi.exceptions.UserDoesNotExistException;
import ozdravi.rest.ValidityUtil;
import ozdravi.rest.dto.CreateUserRequest;
import ozdravi.rest.dto.UserDTO;
import ozdravi.service.UserService;

import java.net.URI;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

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
    public User createUser(User user) {
        if(!user.getPassword().startsWith("{bcrypt}"))
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public User createUser(CreateUserRequest createUserRequest) {
        UserDTO userDTO = createUserRequest.getUserDTO();
        List<String> roles = createUserRequest.getRoles();

        ValidityUtil.checkUserDTOForLoops(userDTO);

        User user = dtoManager.userDTOToUser(userDTO);

        ValidityUtil.checkUserValidity(user);

        if(findByEmail(user.getEmail()).isPresent())
            throw new IllegalArgumentException("Email already in use");

        List<Role> roleList = dtoManager.roleStringListToRoleList(roles);
        user.setRoles(roleList);

        return userRepository.save(user);
    }

    @Override
    public User save(User user){
        return userRepository.save(user);
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
    public List<User> listDoctors() {
        //todo finish
        return null;
    }

    @Override
    public User findById(Long id) {
        User workingUser = securityContextService.getLoggedInUser();
        if (!workingUser.getId().equals(id) && !securityContextService.isUserInRole("ADMIN"))
            throw new RequestDeniedException("You are not authorized to view this info");

        Optional<User> user = userRepository.findById(id);

        if (user.isEmpty())
            throw new UserDoesNotExistException("No user with such id");

        return user.get();
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void modifyUser(UserDTO userDTO, Long id){
        User workingUser = securityContextService.getLoggedInUser();
        if(!workingUser.getId().equals(id) && !securityContextService.isUserInRole("ADMIN"))
            throw new RequestDeniedException("You are not authorized to modify this user");

        userDTO.setId(id);

        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()) throw new UserDoesNotExistException("User doesn't exist");

        ValidityUtil.checkUserDTOForLoops(userDTO);

        User user = dtoManager.userDTOToUser(userDTO);

        ValidityUtil.checkUserValidity(user);

        optionalUser.get().copyDifferentAttributes(user);
        userRepository.save(optionalUser.get());
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
    public List<User> listAllDoctors() throws Exception{
        Optional<Role> doctorRole = roleRepository.findByName("doctor");
        if(doctorRole.isEmpty()) throw new Exception("UserService listAllDoctors method error!");
        return userRepository.findUsersByRolesContains(doctorRole.get());
    }

    @Override
    public List<User> listAllPediatricians() throws Exception{
        Optional<Role> pediatricianRole = roleRepository.findByName("pediatrician");
        if(pediatricianRole.isEmpty()) throw new Exception("UserService listAllPediatricians method error!");
        return userRepository.findUsersByRolesContains(pediatricianRole.get());
    }
}
