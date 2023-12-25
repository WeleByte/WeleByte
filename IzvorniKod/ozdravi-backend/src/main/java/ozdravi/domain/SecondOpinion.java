package ozdravi.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;


@Entity
@Table(name = "second_opinions")
@Data
@EqualsAndHashCode
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SecondOpinion {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "requester_id", nullable = false)
    private User requester;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @Column(nullable = false)
    private String description;

    @Column
    private String content;

    public void copyDifferentAttributes(SecondOpinion newData) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(newData, this, ignoreProperties);
    }
}
