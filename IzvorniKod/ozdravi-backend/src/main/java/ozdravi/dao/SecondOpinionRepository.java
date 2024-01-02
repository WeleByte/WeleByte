package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.SecondOpinion;

import java.util.List;

public interface SecondOpinionRepository extends JpaRepository<SecondOpinion, Long> {
    List<SecondOpinion> findAllByRequesterId(Long approver_id);

    List<SecondOpinion> findAllByDoctorId(Long creator_id);
}
