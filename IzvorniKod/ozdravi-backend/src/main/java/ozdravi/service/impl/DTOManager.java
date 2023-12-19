package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ozdravi.domain.Address;
import ozdravi.domain.Examination;
import ozdravi.domain.User;
import ozdravi.rest.dto.ExaminationRequest;
import ozdravi.rest.dto.UserDTO;
import ozdravi.service.AddressService;
import ozdravi.service.ExaminationService;
import ozdravi.service.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.Objects;
import java.util.Optional;

//klasa zaduzena za prebacivanje DTO tipova podataka u domenske tipove podataka i obrnuto
@Service
public class DTOManager {

    @Autowired
    private UserService userService;

    @Autowired
    private ExaminationService examinationService;

    @Autowired
    private AddressService addressService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Examination examRequestToExamination(ExaminationRequest examinationRequest) throws IllegalArgumentException, DateTimeParseException {
        Optional<User> patient = userService.findById(examinationRequest.getPatient_id());
        Optional<User> doctor = userService.findById(examinationRequest.getDoctor_id());
        Optional<User> scheduler = userService.findById(examinationRequest.getScheduler_id());

        Long address_id = examinationRequest.getAddress_id();
        Optional<Address> address = address_id==null ? Optional.empty() : addressService.findById(examinationRequest.getAddress_id());

        if(patient.isEmpty() || doctor.isEmpty() || scheduler.isEmpty())
            throw new IllegalArgumentException("Patient, doctor or scheduler ID not found");

        LocalDateTime parsedDate = LocalDateTime.parse(examinationRequest.getDate());

        return Examination.builder()
                .patient(patient.get())
                .doctor(doctor.get())
                .scheduler(scheduler.get())
                .address(address.orElse(null))
                .report(examinationRequest.getReport())
                .date(parsedDate)
                .build();
    }

    public ExaminationRequest examinationToExamRequest(Examination examination) {
        return new ExaminationRequest(examination);
    }

    public User userDTOToUser(UserDTO userDTO) throws IllegalArgumentException {
        Long parent_id = userDTO.getParent_id();
        Long doctor_id = userDTO.getDoctor_id();
        Long address_id = userDTO.getAddress_id();

        Optional<User> parent = parent_id==null ? Optional.empty() : userService.findById(userDTO.getParent_id());
        Optional<User> doctor = doctor_id==null ? Optional.empty() : userService.findById(userDTO.getDoctor_id());
        Optional<Address> address = address_id==null ? Optional.empty() : addressService.findById(userDTO.getAddress_id());

        if(!userDTO.getPassword().startsWith("{bcrypt}")) {
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        return User.builder()
                .email(userDTO.getEmail())
                .first_name(userDTO.getFirst_name())
                .last_name(userDTO.getLast_name())
                .oib(userDTO.getOib())
                .password(userDTO.getPassword())
                .parent(parent.orElse(null))
                .doctor(doctor.orElse(null))
                .address(address.orElse(null))
                .institution_email(userDTO.getInstitution_email())
                .build();
    }

    public UserDTO userToUserDTO(User user) {
        return new UserDTO(user);
    }
}
