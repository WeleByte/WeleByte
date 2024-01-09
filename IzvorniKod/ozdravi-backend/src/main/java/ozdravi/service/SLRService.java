package ozdravi.service;

import ozdravi.domain.SLR;
import ozdravi.rest.dto.SLRDTO;

import java.util.List;
import java.util.Optional;

public interface SLRService {

    SLR createSLR(SLRDTO slr);

    List<SLR> listAll();

    /**
     *
     * @return list depending on role
     */
    List<SLR> list();

    SLR findById(Long id);

    List<SLR> listByParent(Long id);

    List<SLR> listByCreator(Long id);

    List<SLR> listByApprover(Long id);

    void modifySLR(SLRDTO newData, Long id);

    SLR save(SLR slr);

    void approveSLR(Long id, boolean approved);
}
