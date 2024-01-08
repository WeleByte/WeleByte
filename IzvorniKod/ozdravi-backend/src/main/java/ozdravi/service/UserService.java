package ozdravi.service;

import ozdravi.domain.User;
import ozdravi.rest.dto.CreateUserRequest;
import ozdravi.rest.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    /**
     * sprema korisnika u bazu
     * @param user korisnik koji se sprema
     * @return vraca spremljenog korisnika
     */
    User createUser(User user);

    User createUser(CreateUserRequest createUserRequest);

    /**
     * ispisuje sve korisnike u bazi
     * @return lista korisnika
     */
    List<User> listAll();

    /**
     * lists Users depending on role
     * @return list of users
     */
    List<User> list();

    /**
     * lists all doctors or all pediatricians (depending on role)
     * @return
     */
    List<User> listDoctors();

    /**
     * nalazi korisnika po njegovom identifikatoru ako postoji u bazi
     * @param id identifikator korisnika
     * @return korisnik
     */
    User findById(Long id);

    /**
     * nalazi korisnika po njegovom korisnickom imenu ako postoji
     * @param email korisnicko ime korisnika
     * @return korisnik
     */
    Optional<User> findByEmail(String email);

    User save(User user);

    void deleteById(Long id);

    void modifyUser(UserDTO newData, Long id);

    List<User> listChildren(Long parentId);

    List<User> listPatients(Long doctorId);

    List<User> listAvailablePatientsDoctor();

    List<User> listAvailablePatientsPediatrician();


    /**
     * lists all doctors
     * @return
     * @throws Exception
     */
    List<User> listAllDoctors() throws Exception;

    /**
     * lists all pediatricians
     * @return
     * @throws Exception
     */
    List<User> listAllPediatricians() throws Exception;
}
