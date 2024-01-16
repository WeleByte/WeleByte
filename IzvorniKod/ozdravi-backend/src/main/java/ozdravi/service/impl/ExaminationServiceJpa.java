package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ozdravi.dao.ExaminationRepository;
import ozdravi.domain.Examination;
import ozdravi.domain.User;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.exceptions.LoggedUserException;
import ozdravi.exceptions.RequestDeniedException;
import ozdravi.rest.dto.ExaminationDTO;
import ozdravi.service.ExaminationService;
import ozdravi.service.UserService;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class ExaminationServiceJpa implements ExaminationService {
    @Autowired
    private ExaminationRepository examinationRepository;

    @Autowired
    private SecurityContextService securityContextService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    private UserService userService;

    @Override
    public Examination findById(Long id) {
        Optional<Examination> examination = examinationRepository.findById(id);
        if(examination.isEmpty())
            throw new EntityMissingException("Examination with id " + id.toString() + " not found");

        return examination.get();
    }

    @Override
    public Examination fetch(Long id) {
        Examination examination = findById(id);
        User user = securityContextService.getLoggedInUser();
        Long user_id = user.getId();

        boolean parentCond = securityContextService.isUserInRole("PARENT") && listParentExaminations(user_id).contains(examination);
        boolean adminCond = securityContextService.isUserInRole("ADMIN");
        boolean doctPedCond = (securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN"))
                && listDoctorExaminations(user_id).contains(examination);

        if(parentCond || adminCond || doctPedCond) return examination;

        //inace
        throw new RequestDeniedException("You are not authorized to view this examination");
    }

    @Override
    public void deleteById(Long id) {
        examinationRepository.deleteById(id);
    }

    @Override
    public Examination createExamination(ExaminationDTO examinationDTO) {
        User user = securityContextService.getLoggedInUser();
        Examination examination = dtoManager.examDTOToExamination(examinationDTO);
        User scheduler;

        //onaj koji je sad ulogiran mora biti naveden kao scheduler ILI ako se radi o adminu, on mora navesti schedulera koji
        // mora moc biti scheduler
        if (securityContextService.isUserInRole("ADMIN")) {
            scheduler = userService.findById(examination.getScheduler().getId());
            //if (scheduler.isEmpty()) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            if (scheduler.getRoles().stream().noneMatch(role -> Objects.equals(role.getName(), "doctor") || Objects.equals(role.getName(), "pediatrician"))) {
                throw new IllegalArgumentException("No doctor with such ID.");
            }
        } else { //trenutni mora biti scheduler
            if (!Objects.equals(examination.getScheduler().getId(), user.getId())) {
                throw new RequestDeniedException("Doctors can't schedule examinations on behalf of other doctors");
            }
            scheduler = user;
        }

        //provjere da su svi id-evi odgovarajuci (ne moze se za id doktroa stavit id roditelja npr)
        User patient = userService.findById(examination.getPatient().getId());
        User doctor = userService.findById(examination.getDoctor().getId());

        if (patient.getRoles().stream().noneMatch(role -> Objects.equals(role.getName(), "parent") || Objects.equals(role.getName(), "child"))) {
            throw new IllegalArgumentException("No patient with such ID.");
        }
        if (doctor.getRoles().stream().noneMatch(role -> Objects.equals(role.getName(), "doctor") || Objects.equals(role.getName(), "pediatrician"))) {
            throw new IllegalArgumentException("No doctor with such ID.");
        }


        //provjera da onaj koji zakazuje pregled (scheduler) mora biti doktor zaduzen za tog pacijenta
        User requiredDoctor = patient.getDoctor();
        if (requiredDoctor == null || !Objects.equals(requiredDoctor.getId(), scheduler.getId())) {
            throw new RequestDeniedException("Doctor can schedule examinations only for his patients");
        }

        return examinationRepository.save(examination);
    }

    @Override
    public void modifyExamination(ExaminationDTO examinationDTO, Long id) {
        Examination examination = dtoManager.examDTOToExamination(examinationDTO);

        Optional<Examination> prevExamination = examinationRepository.findById(id);
        if(prevExamination.isEmpty())
            throw new EntityMissingException("Examination doesn't exist");

        //admin smije sve mjenjati
        if(!securityContextService.isUserInRole("ADMIN")) {
            User user = securityContextService.getLoggedInUser();
            // doktor mora moci vidjeti pregled ciji je id naveden u pathu
            if (!listDoctorExaminations(user.getId()).contains(prevExamination.get())) {
                throw new RequestDeniedException("Doctor can modify only his examinations.");
            }

            //doctor_id, patient_id, scheduler_id, address_id se ne smiju moci mjenjati
            if (!Objects.equals(prevExamination.get().getDoctor().getId(), examination.getDoctor().getId()) ||
                    !Objects.equals(prevExamination.get().getPatient().getId(), examination.getPatient().getId()) ||
                    !Objects.equals(prevExamination.get().getScheduler().getId(), examination.getScheduler().getId()))
//                    (prevExamination.get().getAddress() != null && examination.getAddress() != null && !Objects.equals(prevExamination.get().getAddress().getId(), examination.getAddress().getId()))) {
                throw new IllegalArgumentException("doctor_id, patient_id, scheduler_id can't be modified.");

        }
        prevExamination.get().copyDifferentAttributes(examination);
        examinationRepository.save(prevExamination.get());
    }

    @Override
    public List<Examination> listAll() {
        return examinationRepository.findAll();
    }

    @Override
    public List<Examination> list() {
        User user = securityContextService.getLoggedInUser();
        Long id = user.getId();

        if(securityContextService.isUserInRole("PARENT")){
            return listParentExaminations(id);
        } else if(securityContextService.isUserInRole("DOCTOR") || securityContextService.isUserInRole("PEDIATRICIAN")){
            return listDoctorExaminations(id);
        } else //admin
            return listAll();
    }

    @Override
    public List<Examination> listParentExaminations(Long id) {
        return examinationRepository.listParentExamination(id);
    }

    @Override
    public List<Examination> listDoctorExaminations(Long id) {
        return examinationRepository.listDoctorExamination(id);
    }

    @Override
    public List<ExaminationDTO> listAllRequests() {
        return listAll().stream().map((ExaminationDTO::new)).toList();
    }

}
