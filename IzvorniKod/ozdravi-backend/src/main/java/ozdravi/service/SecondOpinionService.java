package ozdravi.service;

import ozdravi.domain.SecondOpinion;
import ozdravi.rest.dto.SecondOpinionDTO;

import java.util.List;
import java.util.Optional;

public interface SecondOpinionService {
    SecondOpinion createSecondOpinion(SecondOpinionDTO secondOpinion);

    /**
     *
     * @return lists second opinions based on role
     */
    List<SecondOpinion> list();

    List<SecondOpinion> listAll();

    List<SecondOpinion> listByRequester(Long id);

    List<SecondOpinion> listByRequesterOrRequesterParent(Long id);

    List<SecondOpinion> listByDoctor(Long id);

    SecondOpinion findById(Long id);

    void modifySecondOpinion(SecondOpinionDTO newData, Long id);

    SecondOpinion save(SecondOpinion secondOpinion);
}
