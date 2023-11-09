package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import ozdravi.dao.UserRepository;
import ozdravi.domain.User;
import ozdravi.service.UserService;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceJpa implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Optional<User> findByEmail(String email) {
        Assert.notNull(email, "email can't be null");
        if(!"admin".equals(email)) Assert.isTrue(email.matches("^(.+)@(.+)$"), "not an email (regex not matching)");
        return userRepository.findByEmail(email);
    }

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public List<User> listAll() {
        return userRepository.findAll();
    }
}
