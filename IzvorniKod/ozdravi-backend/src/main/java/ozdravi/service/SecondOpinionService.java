package ozdravi.service;

import ozdravi.domain.SecondOpinion;

import java.util.List;
import java.util.Optional;

public interface SecondOpinionService {
    SecondOpinion createSecondOpinion(SecondOpinion secondOpinion);

    List<SecondOpinion> listAll();

    List<SecondOpinion> listByRequester(Long id);

    List<SecondOpinion> listByDoctor(Long id);

    Optional<SecondOpinion> findById(Long id);

    void modifySecondOpinion(SecondOpinion newData, Long id);

    SecondOpinion save(SecondOpinion secondOpinion);
}
