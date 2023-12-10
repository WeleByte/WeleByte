package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.Examination;

public interface ExaminationRepository extends JpaRepository<Examination, Long>{

}
