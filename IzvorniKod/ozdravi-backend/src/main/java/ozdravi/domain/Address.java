package ozdravi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "address")
@Data
public class Address {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @Column(nullable = false)
    private String street;

    @Column(nullable = false)
    private String number;

    @Column(nullable = false)
    private String city;

    @Column(nullable = false)
    private String country;

    @Column
    private Float latitude;

    @Column
    private Float longitude;

    public void copyDifferentAttributes(Address other) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(other, this, ignoreProperties);
    }

}
