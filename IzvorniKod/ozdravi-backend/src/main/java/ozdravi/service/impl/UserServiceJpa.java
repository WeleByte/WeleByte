package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ozdravi.dao.RoleRepository;
import ozdravi.dao.UserRepository;
import ozdravi.domain.Role;
import ozdravi.domain.User;
import ozdravi.service.UserService;

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
    public User save(User user){
        return userRepository.save(user);
    }

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void modifyUser(User newData, Long id){
        Optional<User> optionalUser = userRepository.findById(id);

        if(optionalUser.isPresent()){
            User existingUser = optionalUser.get();
            existingUser.copyDifferentAttributes(newData);
            userRepository.save(existingUser);
        }
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
