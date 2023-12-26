package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.SecondOpinionRepository;
import ozdravi.domain.SecondOpinion;
import ozdravi.service.SecondOpinionService;

import java.util.List;
import java.util.Optional;

@Service
public class SecondOpinionServiceJpa implements SecondOpinionService {
    @Autowired
    private SecondOpinionRepository secondOpinionRepository;

    @Override
    public SecondOpinion createSecondOpinion(SecondOpinion secondOpinion) {
        return secondOpinionRepository.save(secondOpinion);
    }

    @Override
    public List<SecondOpinion> listAll() {
        return secondOpinionRepository.findAll();
    }

    @Override
    public List<SecondOpinion> listByRequester(Long id) {
        return secondOpinionRepository.findAllByRequesterId(id);
    }

    @Override
    public List<SecondOpinion> listByDoctor(Long id) {
        return secondOpinionRepository.findAllByDoctorId(id);
    }

    @Override
    public Optional<SecondOpinion> findById(Long id) {
        return secondOpinionRepository.findById(id);
    }

    @Override
    public void modifySecondOpinion(SecondOpinion newData, Long id) {
        Optional<SecondOpinion> optionalSecondOpinion = secondOpinionRepository.findById(id);

        if(optionalSecondOpinion.isPresent()){
            SecondOpinion existingSecondOpinion = optionalSecondOpinion.get();
            existingSecondOpinion.copyDifferentAttributes(newData);
            secondOpinionRepository.save(existingSecondOpinion);
        }
    }

    @Override
    public SecondOpinion save(SecondOpinion secondOpinion) {
        return secondOpinionRepository.save(secondOpinion);
    }
}
