package ozdravi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.BeanUtils;


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

    @Length(min = 11, max = 11)
    @Column(nullable = false)
//    TODO naknadno promijeniti u unique ako krenemo u tom smjeru
    private String oib;

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

    public void copyDifferentAttributes(User other) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(other, this, ignoreProperties);
    }

    public User() {
    }
}
