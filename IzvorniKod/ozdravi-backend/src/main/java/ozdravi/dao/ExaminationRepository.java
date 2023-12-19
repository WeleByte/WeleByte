package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ozdravi.domain.Examination;

import java.util.List;

public interface ExaminationRepository extends JpaRepository<Examination, Long>{

    /*
    vraca preglede za roditelja i njegovu djecu
     */
    @Query("select examination from Examination examination join examination.patient user" +
            " where (examination.patient.id = :parentId or user.parent.id = :parentId)")
    List<Examination> listParentExamination(@Param("parentId") Long parentId);

    @Query("select examination from Examination examination where " +
            "(examination.doctor.id = :doctorId or examination.scheduler.id = :doctorId)")
    List<Examination> listDoctorExamination(@Param("doctorId") Long doctorId);
}
