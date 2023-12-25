package ozdravi.rest.dto;

import lombok.Data;
import ozdravi.domain.SecondOpinion;

@Data
public class SecondOpinionDTO {
    private Long id;
    private Long requester_id;
    private Long doctor_id;
    private String description;
    private String content;

    public SecondOpinionDTO() {
    }

    public SecondOpinionDTO(SecondOpinion secondOpinion) {
        setId(secondOpinion.getId());
        setRequester_id(secondOpinion.getRequester().getId());
        setDoctor_id(secondOpinion.getDoctor().getId());
        setDescription(secondOpinion.getDescription());
        setContent(secondOpinion.getContent());
    }
}
