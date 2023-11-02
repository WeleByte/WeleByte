package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.User;

public interface UserRepository extends JpaRepository<User, Long> {
}
