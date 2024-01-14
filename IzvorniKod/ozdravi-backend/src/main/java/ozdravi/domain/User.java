package ozdravi.domain;

import jakarta.persistence.*;
import lombok.*;
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
@Builder
@AllArgsConstructor
@EqualsAndHashCode
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

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

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private User parent;

    @ManyToOne
    @JoinColumn(name = "doctor_id")
    private User doctor;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "address_id")
    private Address address;

    @Column
    private String institution_email;

    public void copyDifferentAttributes(User other) {
        String[] ignoreProperties = {"id", "password"};
        BeanUtils.copyProperties(other, this, ignoreProperties);
    }

    public User() {
    }
}
