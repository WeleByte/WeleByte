package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.SLR;

import java.util.List;

public interface SLRRepository extends JpaRepository<SLR, Long> {
    List<SLR> findAllByApproverId(Long approver_id);

    List<SLR> findAllByCreatorId(Long creator_id);

    List<SLR> findAllByParentId(Long parent_id);
}
