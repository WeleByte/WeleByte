package ozdravi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;
import org.springframework.beans.BeanUtils;

import java.util.ArrayList;
import java.util.List;


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
  
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "role_id", referencedColumnName = "id"))
    private List<Role> roles = new ArrayList<>();

    @Column(nullable = false)
    private String first_name;

    @Column(nullable = false)
    private String last_name;

    @Column
    private Long parent_id;

    @Column
    private Long doctor_id;

    @ManyToOne
    @JoinColumn(name = "address_id")
    private Address address;

    @Column
    private String institution_email;

    public void copyDifferentAttributes(User other) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(other, this, ignoreProperties);
    }

    public User() {
    }
}
