package ozdravi.service;

import ozdravi.domain.Examination;

import java.util.Optional;

public interface ExaminationService {
    Optional<Examination> findById(Long id);
}
