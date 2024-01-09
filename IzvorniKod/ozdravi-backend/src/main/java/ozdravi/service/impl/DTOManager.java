package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ozdravi.domain.*;
import ozdravi.rest.dto.*;
import ozdravi.service.AddressService;
import ozdravi.service.ExaminationService;
import ozdravi.service.RoleService;
import ozdravi.service.UserService;

import java.time.LocalDateTime;
import java.time.format.DateTimeParseException;
import java.util.ArrayList;
import java.util.List;
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

    @Autowired
    private RoleService roleService;

    public Examination examRequestToExamination(ExaminationRequest examinationRequest) throws IllegalArgumentException, DateTimeParseException {
        Optional<User> patient = userService.findById(examinationRequest.getPatient_id());
        Optional<User> doctor = userService.findById(examinationRequest.getDoctor_id());
        Optional<User> scheduler = userService.findById(examinationRequest.getScheduler_id());

        Address address = null;

        if(examinationRequest.getAddress() != null){
            address = addressDTOToAddress(examinationRequest.getAddress());
        }

        if (patient.isEmpty() || doctor.isEmpty() || scheduler.isEmpty())
            throw new IllegalArgumentException("Patient, doctor or scheduler ID not found");

        LocalDateTime parsedDate = LocalDateTime.parse(examinationRequest.getDate());

        return Examination.builder()
                .patient(patient.get()).doctor(doctor.get())
                .scheduler(scheduler.get())
                .address(address)
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
        Address address = null;

        if(userDTO.getAddress() != null){
            address = addressDTOToAddress(userDTO.getAddress());
        }

        Optional<User> parent = parent_id == null ? Optional.empty() : userService.findById(userDTO.getParent_id());
        Optional<User> doctor = doctor_id == null ? Optional.empty() : userService.findById(userDTO.getDoctor_id());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty() && !userDTO.getPassword().startsWith("{bcrypt}")) {
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
                .address(address)
                .institution_email(userDTO.getInstitution_email()).build();
    }

    public UserDTO userToUserDTO(User user) {
        return new UserDTO(user);
    }

    public SLR slrdtoToSLR(SLRDTO slrDTO) throws IllegalArgumentException {
        Optional<User> patient = userService.findById(slrDTO.getParent_id());
        Optional<User> creator = userService.findById(slrDTO.getCreator_id());
        Optional<User> approver = userService.findById(slrDTO.getApprover_id());
        Optional<Examination> examination = examinationService.findById(slrDTO.getExamination_id());

        if (!slrDTO.getStatus()) slrDTO.setStatus(false);

        if (patient.isEmpty() || creator.isEmpty() || approver.isEmpty() || examination.isEmpty())
            throw new IllegalArgumentException("Patient, creator, approver or examination ID doesn't exist in the database");

        return SLR.builder().parent(patient.get()).creator(creator.get()).approver(approver.get()).examination(examination.get()).status(slrDTO.getStatus()).build();
    }

    public SLRDTO slrToSLRDTO(SLR slr) {
        return new SLRDTO(slr);
    }


    public Instruction InstructionDTOtoInstruction(InstructionDTO instructionDTO) {
        Optional<User> doctor = userService.findById(instructionDTO.getDoctor_id());
        Optional<User> patient = userService.findById(instructionDTO.getPatient_id());

        if (patient.isEmpty() || doctor.isEmpty()) {
            throw new IllegalArgumentException("Doctor or patient ID not found");
        }

        return Instruction.builder().doctor(doctor.get()).patient(patient.get()).date(instructionDTO.getDate()).content(instructionDTO.getContent()).build();
    }


    public SecondOpinion secondOpinionDTOToSecondOpinion(SecondOpinionDTO secondOpinionDTO) throws IllegalArgumentException {
        Optional<User> requester = userService.findById(secondOpinionDTO.getRequester_id());
        Optional<User> doctor = userService.findById(secondOpinionDTO.getDoctor_id());
        String content = secondOpinionDTO.getContent();

        if (requester.isEmpty() || doctor.isEmpty())
            throw new IllegalArgumentException("Requester or doctor ID doesn't exist in the database");

        if (content.isBlank()) throw new IllegalArgumentException("Content cannot be blank");


        return SecondOpinion.builder().requester(requester.get()).doctor(doctor.get()).opinion(secondOpinionDTO.getOpinion()).content(content).build();
    }

    public SecondOpinionDTO secondOpinionToSecondOpinionDTO(SecondOpinion secondOpinion) {
        return new SecondOpinionDTO(secondOpinion);
    }

    public Address addressDTOToAddress(AddressDTO addressDTO) throws IllegalArgumentException{
        if(addressDTO.getCity().isBlank()) throw new IllegalArgumentException("Address: City cannot be blank");
        if(addressDTO.getCountry().isBlank()) throw new IllegalArgumentException("Address: Country cannot be blank");
        if(addressDTO.getNumber().isBlank()) throw new IllegalArgumentException("Address: Number cannot be blank");
        if(addressDTO.getStreet().isBlank()) throw new IllegalArgumentException("Address: Street cannot be blank");

        Address address =  Address.builder()
                .id(addressDTO.getId())
                .city(addressDTO.getCity())
                .country(addressDTO.getCountry())
                .street(addressDTO.getStreet())
                .number(addressDTO.getNumber())
                .latitude(addressDTO.getLatitude())
                .longitude(addressDTO.getLongitude())
                .build();

        Optional<Address> optionalAddress = addressService.getSavedInstance(address);
        if(optionalAddress.isEmpty()){
            return addressService.createAddress(address);
        } else {
            return optionalAddress.get();
        }
    }

    public AddressDTO addressToAddressDTO(Address address){
        return new AddressDTO(address);
    }

    public List<Role> roleStringListToRoleList(List<String> roleStringList){
        List<Role> roleRoles = new ArrayList<>();
        for(String roleString : roleStringList){
            Optional<Role> roleOptional = roleService.findByName(roleString);
            if(roleOptional.isEmpty())
                throw new IllegalArgumentException("Role '" + roleString + "' does not exist");
            roleRoles.add(roleOptional.get());
        }
        return roleRoles;
    }
}
