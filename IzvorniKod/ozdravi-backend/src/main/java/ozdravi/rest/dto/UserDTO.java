package ozdravi.rest.dto;

import lombok.Builder;
import lombok.Data;
import ozdravi.domain.User;

@Data
public class UserDTO {
    private Long id;
    private String email;
    private String password;
    private String oib;
    private String first_name;
    private String last_name;
    private Long parent_id;
    private Long doctor_id;
    private Long address_id;
    private String institution_email;

    public UserDTO() {
    }

    public UserDTO(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.oib = user.getOib();
        this.first_name = user.getFirst_name();
        this.last_name = user.getLast_name();
        this.parent_id = user.getParent() == null ? null : user.getParent().getId();
        this.doctor_id = user.getDoctor() == null ? null : user.getDoctor().getId();
//        this.address_id = user.getAddress().getId();
        this.institution_email = user.getInstitution_email();
    }
}
