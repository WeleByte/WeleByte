package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findById(Long id);
}
