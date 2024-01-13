package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ozdravi.dao.SLRRepository;
import ozdravi.domain.Examination;
import ozdravi.domain.SLR;
import ozdravi.domain.User;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.exceptions.RequestDeniedException;
import ozdravi.rest.dto.SLRDTO;
import ozdravi.service.SLRService;

import java.util.List;
import java.util.Optional;

@Service
public class SLRServiceJpa implements SLRService {
    @Autowired
    private SLRRepository slrRepository;

    @Autowired
    private SecurityContextService securityContextService;

    @Autowired
    private DTOManager dtoManager;

    @Override
    public SLR createSLR(Examination examination) {
        if(securityContextService.isUserInRole("ADMIN"))
            throw new RequestDeniedException("Admin can't create SLR");

        User currentUser = securityContextService.getLoggedInUser();
        SLR sick_leave_recommendation = new SLR();

        sick_leave_recommendation.setCreator(currentUser);
        sick_leave_recommendation.setParent(examination.getPatient().getParent());
        sick_leave_recommendation.setApprover(examination.getPatient().getParent().getDoctor());
        sick_leave_recommendation.setExamination(examination);

        return slrRepository.save(sick_leave_recommendation);
    }

    @Override
    public List<SLR> listAll() {
        return slrRepository.findAll();
    }

    @Override
    public List<SLR> list() {
        User user = securityContextService.getLoggedInUser();
        if(securityContextService.isUserInRole("PARENT"))
            return listByParent(user.getId());

        if(securityContextService.isUserInRole("PEDIATRICIAN"))
            return listByCreator(user.getId());

        if(securityContextService.isUserInRole("DOCTOR"))
            return listByApprover(user.getId());
        //else admin
        return listAll();
    }

    @Override
    public SLR findById(Long id) {
        Optional<SLR> slrOptional = slrRepository.findById(id);
        if(slrOptional.isEmpty())
            throw new EntityMissingException("Sick leave recommendation with id: " + id.toString() + " not found");

        if(securityContextService.isUserInRole("ADMIN"))
            return slrOptional.get();

        User user = securityContextService.getLoggedInUser();
        SLR slr = slrOptional.get();

        if(!slr.getParent().getId().equals(user.getId())
                && !slr.getCreator().getId().equals(user.getId())
                && !slr.getApprover().getId().equals(user.getId())) {
            throw new RequestDeniedException("You are not authorized to view this info");
        }

        SLRDTO slrDTO = dtoManager.slrToSLRDTO(slr);

//        return ResponseEntity.ok(slrDTO);

        return slrOptional.get();
    }

    @Override
    public List<SLR> listByParent(Long id) {
        return slrRepository.findAllByParentId(id);
    }

    @Override
    public List<SLR> listByCreator(Long id) {
        return slrRepository.findAllByCreatorId(id);
    }

    @Override
    public List<SLR> listByApprover(Long id) {
        return slrRepository.findAllByApproverId(id);
    }

    @Override
    public SLR save(SLR slr) {
        return slrRepository.save(slr);
    }

    @Override
    public void approveSLR(Long id, boolean approved) {
        SLR slr = findById(id);

        User currentUserOptional = securityContextService.getLoggedInUser();
        if(!slr.getApprover().getId().equals(currentUserOptional.getId()))
            throw new RequestDeniedException("You are not authorized to approve or reject this SLR");

        slr.setStatus(approved);

        save(slr);
    }

    @Override
    public void modifySLR(SLRDTO slrDTO, Long id) {
        SLR prevSlr = findById(id);
        slrDTO.setId(id);
        SLR slrModified = dtoManager.slrdtoToSLR(slrDTO);
        prevSlr.copyDifferentAttributes(slrModified);
        slrRepository.save(prevSlr);
    }
//    TODO popraviti metodu
//    prebacivanje slrDTO u slr koristi metodu trazenja examinationa,
//    zbog koje se raspada tko sto smije
//    najjednostavniji fix je napraviti alwaysLegal tip metode koja nece bacati gresku za autorizaciju
//    ILI jednostavno dozvoliti svim doktorima/pedijatrima da vide sve preglede
}
