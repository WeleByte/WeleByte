package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.ExaminationRepository;
import ozdravi.domain.Examination;
import ozdravi.rest.dto.ExaminationRequest;
import ozdravi.service.ExaminationService;
import java.util.List;
import java.util.Optional;

@Service
public class ExaminationServiceJpa implements ExaminationService {
    @Autowired
    private ExaminationRepository examinationRepository;

    @Override
    public Optional<Examination> findById(Long id) {
        return examinationRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        examinationRepository.deleteById(id);
    }

    @Override
    public Examination createExamination(Examination examination) {
        return examinationRepository.save(examination);
    }

    @Override
    public void modifyExamination(Examination newData, Long id) {
        Optional<Examination> optionalExamination = examinationRepository.findById(id);

        if(optionalExamination.isPresent()){
            optionalExamination.get().copyDifferentAttributes(newData);
            examinationRepository.save(optionalExamination.get());
        }
    }

    @Override
    public List<Examination> listAll() {
        return examinationRepository.findAll();
    }

    @Override
    public List<ExaminationRequest> listAllRequests() {
        return listAll().stream().map((examination -> new ExaminationRequest(examination))).toList();
    }
}
