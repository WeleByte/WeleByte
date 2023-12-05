package ozdravi.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Getter;
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

    public User() {
    }
}
