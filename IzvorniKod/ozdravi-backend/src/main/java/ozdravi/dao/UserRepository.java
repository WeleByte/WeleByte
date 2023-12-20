package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ozdravi.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    List<User> findUsersByParent_Id(Long parent_id);

    List<User> findUsersByDoctor_Id(Long doctor_id);

    @Query("select user from User user join user.roles role where user.doctor is null and role.name = 'parent'")
    List<User> listAvailablePatientsDoctor();

    @Query("SELECT user FROM User user join user.roles role WHERE user.doctor IS NULL AND role.name = 'child'")
    List<User> listAvailablePatientsPediatrician();
}
