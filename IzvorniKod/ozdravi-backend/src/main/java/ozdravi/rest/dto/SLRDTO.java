package ozdravi.rest.dto;

import lombok.Data;
import ozdravi.domain.SLR;

// DTO for SLR
@Data
public class SLRDTO {
    Long id;
    Long parent_id;
    Long creator_id;
    Long approver_id;
    Long examination_id;
    Boolean status;

    public SLRDTO() {
    }

    public SLRDTO(SLR slr) {
        this.id = slr.getId();
        this.parent_id = slr.getParent().getId();
        this.creator_id = slr.getCreator().getId();
        this.approver_id = slr.getApprover().getId();
        this.examination_id = slr.getExamination().getId();
        this.status = slr.getStatus();
    }
}
