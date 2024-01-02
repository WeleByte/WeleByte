package ozdravi.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.beans.BeanUtils;

import java.time.LocalDateTime;


@Entity
@Table(name = "instructions")
@Data
@Builder
@AllArgsConstructor
@EqualsAndHashCode
public class Instruction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "doctor_id", nullable = false)
    private User doctor;

    @ManyToOne
    @JoinColumn(name = "patient_id", nullable = false)
    private User patient;

    @Column(nullable = false)
    private LocalDateTime date;

    @Column(nullable = false)
    private String content;

    public Instruction() {
    }

    public void copyDifferentAttributes(Instruction newData) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(newData, this, ignoreProperties);
    }
}
