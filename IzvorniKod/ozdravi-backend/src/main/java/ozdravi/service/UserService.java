package ozdravi.service;

import ozdravi.domain.User;
import ozdravi.rest.dto.CreateUserRequest;
import ozdravi.rest.dto.UserDTO;

import java.util.List;
import java.util.Optional;

public interface UserService {
    //User createUser(User user);

    User createUser(UserDTO user, List<String> roles);

    /**
     *
     * @return lists patients based on role
     */
    List<User> listAvailablePatients();

    void assignPatient(Long id);

    void removePatient(Long id);

    /**
     * ispisuje sve korisnike u bazi
     * @return lista korisnika
     */
    List<User> listAll();

    User save(User user);

    /**
     * lists Users depending on currently logged user role
     * @return list of users
     */
    List<User> list();

    /**
     * lists all doctors or all pediatricians (depending on role)
     * @return list
     */
    List<User> listDoctors(String role);

    /**
     * nalazi korisnika po njegovom identifikatoru ako postoji u bazi
     * @throws ozdravi.exceptions.EntityMissingException
     * @param id identifikator korisnika
     * @return korisnik
     */
    User findById(Long id);

    /**
     * samo za fetchanje iz controllera
     * @param id
     * @return
     */
    User fetch(Long id);

    /**
     * nalazi korisnika po njegovom korisnickom imenu ako postoji
     * @param email korisnicko ime korisnika
     * @return korisnik
     */
    Optional<User> findByEmail(String email);

    void deleteById(Long id);

    void modifyUser(UserDTO newData, Long id);

    /**
     *
     * @param parentId
     * @return list of parents children
     */
    List<User> listChildren(Long parentId);

    /**
     *
     * @param doctorId
     * @return list of doctors patients
     */
    List<User> listPatients(Long doctorId);

    /**
     *
     * @return list of patients with no doctor
     */
    List<User> listAvailablePatientsDoctor();

    /**
     *
     * @return list of children with no pediatrician
     */
    List<User> listAvailablePatientsPediatrician();


    /**
     *
     * @return list of all doctors in db
     */
    List<User> listAllDoctors();

    /**
     *
     * @return list of all pediatricians in db
     */
    List<User> listAllPediatricians();
}
