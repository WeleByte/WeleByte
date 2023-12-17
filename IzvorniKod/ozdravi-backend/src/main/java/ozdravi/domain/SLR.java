package ozdravi.domain;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;

@Entity
@Table(name = "sick_leave_recommendations")
@Data
@Builder
@AllArgsConstructor
@EqualsAndHashCode
public class SLR {
    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "parent_id", nullable = false)
    private User parent;

    @ManyToOne
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;

    @ManyToOne
    @JoinColumn(name = "approver_id", nullable = false)
    private User approver;

    @ManyToOne
    @JoinColumn(name = "examination_id", nullable = false)
    private Examination examination;

    private Boolean status;

    public SLR() {
    }

    public void copyDifferentAttributes(SLR other) {
        String[] ignoreProperties = {"id"};
        BeanUtils.copyProperties(other, this, ignoreProperties);
    }
}
