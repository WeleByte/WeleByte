package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.SLRRepository;
import ozdravi.domain.SLR;
import ozdravi.service.SLRService;

import java.util.List;
import java.util.Optional;

@Service
public class SLRServiceJpa implements SLRService {
    @Autowired
    private SLRRepository slrRepository;

    @Override
    public SLR createSLR(SLR slr) {
        return slrRepository.save(slr);
    }

    @Override
    public List<SLR> listAll() {
        return slrRepository.findAll();
    }

    @Override
    public Optional<SLR> findById(Long id) {
        return slrRepository.findById(id);
    }

    @Override
    public List<SLR> listByParent(Long id) {
        return slrRepository.findAll().stream().filter(slr -> slr.getParent().getId().equals(id)).toList();
    }

    @Override
    public List<SLR> listByCreator(Long id) {
        return slrRepository.findAll().stream().filter(slr -> slr.getCreator().getId().equals(id)).toList();
    }

    @Override
    public List<SLR> listByApprover(Long id) {
        return slrRepository.findAll().stream().filter(slr -> slr.getApprover().getId().equals(id)).toList();
    }

    @Override
    public void modifyUser(SLR newData, Long id) {
        Optional<SLR> optionalSLR = slrRepository.findById(id);

        if(optionalSLR.isPresent()){
            SLR existingSLR = optionalSLR.get();
            existingSLR.copyDifferentAttributes(newData);
            slrRepository.save(existingSLR);
        }
    }
}
