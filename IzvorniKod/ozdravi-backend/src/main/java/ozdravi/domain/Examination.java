package ozdravi.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Data;
import lombok.Setter;

import java.time.LocalDateTime;


@Entity
@Table(name = "examinations")
@Data
public class Examination {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long patient_id;

    @Column(nullable = false)
    private Long doctor_id;

    @Column(nullable = false)
    private Long scheduler_id;

    @Column
    private Long address_id;

    @Column
    private String report;

    @Column
    private LocalDateTime date;
}
