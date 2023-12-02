package ozdravi.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;


/**
 * klasa User predstavlja usera u aplikaciji
 * on ima svoj id, username i password
 */
@Entity
@Table(name = "users")
public class User {
    @Id
    @Getter @Setter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Getter @Setter
    @Column(nullable = false, unique = true)
    private String username;

    @Getter @Setter
    @Column(nullable = false)
    private String password;

    @Getter @Setter
    private Long parent_id;

    @Getter @Setter
    private Long doctor_id;

    @Getter @Setter
    private Long address_id;

    @Getter @Setter
    @Column(nullable = false, unique = true)
    private Long oib;

    @Getter @Setter
    @Column(nullable = false, unique = true)
    private Long first_name;

    @Getter @Setter
    @Column(nullable = false, unique = true)
    private Long last_name;

    @Getter @Setter
    private String institution_email;

    public User() {
    }
}
