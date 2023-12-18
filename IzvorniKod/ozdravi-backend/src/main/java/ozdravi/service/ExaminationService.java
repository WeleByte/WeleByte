package ozdravi.service;

import ozdravi.domain.Examination;
import ozdravi.rest.dto.ExaminationRequest;

import java.util.List;
import java.util.Optional;

public interface ExaminationService {
    Optional<Examination> findById(Long id);

    void deleteById(Long id);

    Examination createExamination(Examination examination);

    void modifyExamination(Examination newData, Long id);

    List<Examination> listAll();

    /*
        vraca listu Examinationa za roditelja s danim id-em i za njegovu djecu
     */
    List<Examination> listParentExaminations(Long id);

    /*
        vraca listu Examinationa za doktora/pedijatra s danim id-em
     */
    List<Examination> listDoctorExaminations(Long id);

    List<ExaminationRequest> listAllRequests();
}
