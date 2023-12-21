package ozdravi.service;

import ozdravi.domain.SLR;

import java.util.List;
import java.util.Optional;

public interface SLRService {

    SLR createSLR(SLR slr);

    List<SLR> listAll();

    Optional<SLR> findById(Long id);

    List<SLR> listByParent(Long id);

    List<SLR> listByCreator(Long id);

    List<SLR> listByApprover(Long id);

    void modifySLR(SLR newData, Long id);

    SLR save(SLR slr);
}
