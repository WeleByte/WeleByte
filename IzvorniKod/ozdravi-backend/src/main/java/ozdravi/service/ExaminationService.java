package ozdravi.service;

import ozdravi.domain.Examination;
import ozdravi.rest.dto.ExaminationDTO;

import java.util.List;

public interface ExaminationService {
    Examination findById(Long id);

    /*
    samo za kontroler, ima dodatne provjere
     */
    Examination fetch(Long id);

    void deleteById(Long id);

    Examination createExamination(ExaminationDTO examinationDTO);

    void modifyExamination(ExaminationDTO newData, Long id);

    List<Examination> listAll();

    List<Examination> list();

    /*
        vraca listu Examinationa za roditelja s danim id-em i za njegovu djecu
     */
    List<Examination> listParentExaminations(Long id);

    /*
        vraca listu Examinationa za doktora/pedijatra s danim id-em
     */
    List<Examination> listDoctorExaminations(Long id);

    List<ExaminationDTO> listAllRequests();
}
