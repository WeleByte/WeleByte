package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.SecondOpinion;

import java.util.List;

public interface SecondOpinionRepository extends JpaRepository<SecondOpinion, Long> {
    List<SecondOpinion> findAllByRequesterId(Long requester_id);

    List<SecondOpinion> findAllByDoctorId(Long doctor_id);

//    for parents: lists their and their children's SO-s
    List<SecondOpinion> findAllByRequesterIdOrRequesterParentId(Long requester_id, Long requester_parent_id);
}
