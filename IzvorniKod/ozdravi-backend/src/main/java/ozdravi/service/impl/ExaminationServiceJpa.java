package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import ozdravi.dao.ExaminationRepository;
import ozdravi.domain.Examination;
import ozdravi.service.ExaminationService;

import java.util.Optional;

public class ExaminationServiceJpa implements ExaminationService {
//    @SuppressWarnings("SpringJavaAutowiringInspection")
    @Autowired
    private ExaminationRepository examinationRepository;

    @Override
    public Optional<Examination> findById(Long id) {
        return examinationRepository.findById(id);
    }
}
