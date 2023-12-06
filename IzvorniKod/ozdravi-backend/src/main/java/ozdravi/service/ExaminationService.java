package ozdravi.service;

import ozdravi.domain.Examination;

import java.util.List;
import java.util.Optional;

public interface ExaminationService {
    Optional<Examination> findById(Long id);

    void deleteById(Long id);

    Examination createExamination(Examination examination);

    void modifyExamination(Examination newData, Long id);

    List<Examination> listAll();
}
