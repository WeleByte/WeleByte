package ozdravi.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;


/**
 * klasa User predstavlja usera u aplikaciji
 * on ima svoj id, username i password
 */
@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Digits(integer = 11, fraction = 0)
    @Column(nullable = false)
//    TODO naknadno promijeniti u unique ako krenemo u tom smjeru
    private Long oib;

    @Column(nullable = false)
    private String first_name;

    @Column(nullable = false)
    private String last_name;

    @Column
    private Long parent_id;

    @Column
    private Long doctor_id;

    @Column
    private Long address_id;

    @Column
    private String institution_email;

    public void copyDifferentAttributes(User other){
        if(this.getUsername()==null || !other.getUsername().equals(this.getUsername()))
            this.setUsername(other.getUsername());

        if(this.getPassword()==null || !other.getPassword().equals(this.getPassword()))
            this.setPassword(other.getPassword());

        if(this.getOib()==null || !other.getOib().equals(this.getOib()))
            this.setOib(other.getOib());

        if(this.getFirst_name()==null || !other.getFirst_name().equals(this.getFirst_name()))
            this.setFirst_name(other.getFirst_name());

        if(this.getLast_name()==null || !other.getLast_name().equals(this.getLast_name()))
            this.setLast_name(other.getLast_name());

        if(this.getParent_id()==null || !other.getParent_id().equals(this.getParent_id()))
            this.setParent_id(other.getParent_id());

        if(this.getDoctor_id()==null || !other.getDoctor_id().equals(this.getDoctor_id()))
            this.setDoctor_id(other.getDoctor_id());

        if(this.getAddress_id()==null || !other.getAddress_id().equals(this.getAddress_id()))
            this.setAddress_id(other.getAddress_id());

        if(this.getInstitution_email()==null || !other.getInstitution_email().equals(this.getInstitution_email()))
            this.setInstitution_email(other.getInstitution_email());
    }

    public User() {
    }
}
