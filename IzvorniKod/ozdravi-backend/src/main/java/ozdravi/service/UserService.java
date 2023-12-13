package ozdravi.service;

import ozdravi.domain.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    /**
     * sprema korisnika u bazu
     * @param user korisnik koji se sprema
     * @return vraca spremljenog korisnika
     */
    User createUser(User user);

    /**
     * ispisuje sve korisnike u bazi
     * @return lista korisnika
     */
    List<User> listAll();

    /**
     * nalazi korisnika po njegovom identifikatoru ako postoji u bazi
     * @param id identifikator korisnika
     * @return korisnik
     */
    Optional<User> findById(Long id);

    /**
     * nalazi korisnika po njegovom korisnickom imenu ako postoji
     * @param email korisnicko ime korisnika
     * @return korisnik
     */
    Optional<User> findByEmail(String email);

    void deleteById(Long id);

    void modifyUser(User newData, Long id);

    List<User> listChildren(Long parentId);

    List<User> listPatients(Long doctorId);

    List<User> listAvailablePatientsDoctor();

    List<User> listAvailablePatientsPediatrician();
}
