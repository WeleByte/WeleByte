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

    public Examination examDTOToExamination(ExaminationDTO examinationDTO) throws IllegalArgumentException, DateTimeParseException {
        User patient = userService.findById(examinationDTO.getPatient_id());
        User doctor = userService.findById(examinationDTO.getDoctor_id());
        User scheduler = userService.findById(examinationDTO.getScheduler_id());

        Address address = null;

        if(examinationDTO.getAddress() != null){
            address = addressDTOToAddress(examinationDTO.getAddress());
        }

        LocalDateTime parsedDate = LocalDateTime.parse(examinationDTO.getDate());

        return Examination.builder()
                .patient(patient).doctor(doctor)
                .scheduler(scheduler)
                .address(address)
                .report(examinationDTO.getReport())
                .date(parsedDate)
                .build();
    }

    public ExaminationDTO examinationToExamDTO(Examination examination) {
        return new ExaminationDTO(examination);
    }

    public User userDTOToUser(UserDTO userDTO) throws IllegalArgumentException {
        Long parent_id = userDTO.getParent_id();
        Long doctor_id = userDTO.getDoctor_id();
        Address address = null;

        if(userDTO.getAddress() != null){
            address = addressDTOToAddress(userDTO.getAddress());
        }

        User parent = parent_id == null ? null : userService.findById(userDTO.getParent_id());
        User doctor = doctor_id == null ? null : userService.findById(userDTO.getDoctor_id());

        if (userDTO.getPassword() != null && !userDTO.getPassword().isEmpty() && !userDTO.getPassword().startsWith("{bcrypt}")) {
            userDTO.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        }

        return User.builder()
                .email(userDTO.getEmail())
                .first_name(userDTO.getFirst_name())
                .last_name(userDTO.getLast_name())
                .oib(userDTO.getOib())
                .password(userDTO.getPassword())
                .parent(parent) //orElse(null), ali ako se sad radi o null parnet ce automatski biti null
                .doctor(doctor)
                .address(address)
                .institution_email(userDTO.getInstitution_email()).build();
    }

    public UserDTO userToUserDTO(User user) {
        return new UserDTO(user);
    }

    public SLR slrdtoToSLR(SLRDTO slrDTO) throws IllegalArgumentException {
        User patient = userService.findById(slrDTO.getParent_id());
        User creator = userService.findById(slrDTO.getCreator_id());
        User approver = userService.findById(slrDTO.getApprover_id());
        Examination examination = examinationService.findById(slrDTO.getExamination_id());

        if (!slrDTO.getStatus()) slrDTO.setStatus(false);

        return SLR.builder().parent(patient).creator(creator).approver(approver).examination(examination).status(slrDTO.getStatus()).build();
    }

    public SLRDTO slrToSLRDTO(SLR slr) {
        return new SLRDTO(slr);
    }


    public Instruction InstructionDTOtoInstruction(InstructionDTO instructionDTO) {
        User doctor = userService.findById(instructionDTO.getDoctor_id());
        User patient = userService.findById(instructionDTO.getPatient_id());

        return Instruction.builder().doctor(doctor).patient(patient).date(instructionDTO.getDate()).content(instructionDTO.getContent()).build();
    }


    public SecondOpinion secondOpinionDTOToSecondOpinion(SecondOpinionDTO secondOpinionDTO) throws IllegalArgumentException {
        User requester = userService.findById(secondOpinionDTO.getRequester_id());
        User doctor = userService.findById(secondOpinionDTO.getDoctor_id());
        String content = secondOpinionDTO.getContent();

//        if (content.isBlank()) throw new IllegalArgumentException("Content cannot be blank");

        return SecondOpinion.builder().requester(requester).doctor(doctor).opinion(secondOpinionDTO.getOpinion()).content(content).build();
    }

    public SecondOpinionDTO secondOpinionToSecondOpinionDTO(SecondOpinion secondOpinion) {
        return new SecondOpinionDTO(secondOpinion);
    }

    public Address addressDTOToAddress(AddressDTO addressDTO) throws IllegalArgumentException{
        if(addressDTO.getCity().isBlank()) throw new IllegalArgumentException("Address: City cannot be blank");
        if(addressDTO.getCountry().isBlank()) throw new IllegalArgumentException("Address: Country cannot be blank");
        if(addressDTO.getNumber().isBlank()) throw new IllegalArgumentException("Address: Number cannot be blank");
        if(addressDTO.getStreet().isBlank()) throw new IllegalArgumentException("Address: Street cannot be blank");

        return Address.builder()
                .id(addressDTO.getId())
                .city(addressDTO.getCity())
                .country(addressDTO.getCountry())
                .street(addressDTO.getStreet())
                .number(addressDTO.getNumber())
                .latitude(addressDTO.getLatitude())
                .longitude(addressDTO.getLongitude())
                .build();
    }

    public AddressDTO addressToAddressDTO(Address address){
        return new AddressDTO(address);
    }

    public List<Role> roleStringListToRoleList(List<String> roleStringList){
        List<Role> roleRoles = new ArrayList<>();
        for(String roleString : roleStringList){
            Role role = roleService.findByName(roleString);
            roleRoles.add(role);
        }
        return roleRoles;
    }
}
