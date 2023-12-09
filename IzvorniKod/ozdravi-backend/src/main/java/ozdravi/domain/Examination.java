package ozdravi.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;
import java.time.LocalDateTime;

@Entity
@Table(name = "examinations")
@Data
@AllArgsConstructor
@Builder
public class Examination {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToOne
    @JoinColumn(name = "scheduler_id", nullable = false)
    private User scheduler;

    @Column
    private Long address_id;

    @Column
    private String report;

    @Column
    private LocalDateTime date;

    public void copyDifferentAttributes(Examination newData) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(newData, this, ignoreProperties);
    }

    public Examination() {
    }
}
