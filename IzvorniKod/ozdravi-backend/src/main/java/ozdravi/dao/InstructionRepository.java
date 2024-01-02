package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ozdravi.domain.Instruction;

import java.util.List;

public interface InstructionRepository extends JpaRepository<Instruction, Long> {
    /*
    list instructions for parent with given id and their children
     */
    @Query("select instruction from Instruction instruction join instruction.patient child where instruction.patient.id = :parentId or child.parent.id = :parentId")
    List<Instruction> listForParent(@Param("parentId") Long parentId);

    /*
    list instructions for doctor/pediatrician
     */
    @Query("select instruction from Instruction instruction where instruction.doctor.id = :doctorId")
    List<Instruction> listForDoctor(@Param("doctorId") Long doctorId);
}
