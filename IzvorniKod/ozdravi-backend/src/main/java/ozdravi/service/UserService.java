package ozdravi.service;

import ozdravi.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    User createUser(User user);

    List<User> listAll();

    Optional<User> findById(Long id);
}
