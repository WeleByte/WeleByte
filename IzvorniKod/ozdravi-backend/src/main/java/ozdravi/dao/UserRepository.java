package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ozdravi.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    @Query("SELECT user FROM User user WHERE user.parent.id = :parentId")
    List<User> listChildren(@Param("parentId") Long parentId);

    @Query("SELECT user FROM User user WHERE user.doctor.id = :doctorId")
    List<User> listPatients(@Param("doctorId") Long doctorId);

    //TODO popraviti queryje (tko zna) tako da se temelji na ROLEovima, a ne na rudimentarnoj logici "nema roditelja, dakle roditelj" i suprotno
    @Query("SELECT user FROM User user WHERE user.doctor IS NULL AND user.parent IS NULL")
    List<User> listAvailablePatientsDoctor();

    //TODO
    @Query("SELECT user FROM User user WHERE user.doctor IS NULL AND user.parent IS NOT NULL")
    List<User> listAvailablePatientsPediatrician();
}
