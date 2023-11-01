package ozdravi.service;

import ozdravi.domain.User;

import java.util.List;

public interface UserService {
    User createUser(User user);

    List<User> listAll();
}
