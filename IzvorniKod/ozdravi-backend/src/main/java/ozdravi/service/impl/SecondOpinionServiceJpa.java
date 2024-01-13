package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ozdravi.dao.SecondOpinionRepository;
import ozdravi.domain.SecondOpinion;
import ozdravi.domain.User;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.exceptions.RequestDeniedException;
import ozdravi.rest.dto.SecondOpinionDTO;
import ozdravi.service.SecondOpinionService;

import java.util.List;
import java.util.Optional;

@Service
public class SecondOpinionServiceJpa implements SecondOpinionService {
    @Autowired
    private SecondOpinionRepository secondOpinionRepository;

    @Autowired
    private SecurityContextService securityContextService;

    @Autowired
    private DTOManager dtoManager;

    @Override
    public SecondOpinion createSecondOpinion(SecondOpinionDTO secondOpinionDTO) {
        User user = securityContextService.getLoggedInUser();
        secondOpinionDTO.setRequester_id(user.getId());

        SecondOpinion secondOpinion = dtoManager.secondOpinionDTOToSecondOpinion(secondOpinionDTO);
        return secondOpinionRepository.save(secondOpinion);
    }

    @Override
    public List<SecondOpinion> list() {
        User user = securityContextService.getLoggedInUser();
        if(securityContextService.isUserInRole("PARENT"))
            return listByRequester(user.getId());

        if(securityContextService.isUserInRole("DOCTOR")
                || securityContextService.isUserInRole("PEDIATRICIAN"))
            return listByDoctor(user.getId());
        //else admin
        return listAll();
    }

    @Override
    public List<SecondOpinion> listAll() {
        return secondOpinionRepository.findAll();
    }

    @Override
    public List<SecondOpinion> listByRequester(Long id) {
        return secondOpinionRepository.findAllByRequesterId(id);
    }

    @Override
    public List<SecondOpinion> listByDoctor(Long id) {
        return secondOpinionRepository.findAllByDoctorId(id);
    }

    @Override
    public SecondOpinion findById(Long id) {
        User user = securityContextService.getLoggedInUser();
        Optional<SecondOpinion> secondOpinion = secondOpinionRepository.findById(id);
        if(secondOpinion.isEmpty())
            throw new EntityMissingException("Second opinion with id " + id.toString() + " not found");

        if(secondOpinion.get().getDoctor().getId().equals(user.getId())
                || secondOpinion.get().getRequester().getId().equals(user.getId())
                || securityContextService.isUserInRole("ADMIN"))
            return secondOpinion.get();

        throw new RequestDeniedException("You are not authorized to view this second opinion");
    }

    @Override
    public void modifySecondOpinion(SecondOpinionDTO secondOpinionDTO, Long id) {
        User user = securityContextService.getLoggedInUser();
        SecondOpinion secondOpinion = findById(id);

        if(!secondOpinion.getRequester().getId().equals(user.getId())
                && !securityContextService.isUserInRole("ADMIN"))
            throw new RequestDeniedException("You are not authorized to update this second opinion");

        secondOpinion.copyDifferentAttributes(dtoManager.secondOpinionDTOToSecondOpinion(secondOpinionDTO));
        secondOpinionRepository.save(secondOpinion);
    }

    @Override
    public SecondOpinion save(SecondOpinion secondOpinion) {
        return secondOpinionRepository.save(secondOpinion);
    }
}
