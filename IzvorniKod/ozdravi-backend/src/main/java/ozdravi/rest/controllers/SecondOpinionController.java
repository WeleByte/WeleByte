package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.SecondOpinion;
import ozdravi.domain.User;
import ozdravi.rest.dto.SecondOpinionDTO;
import ozdravi.service.SecondOpinionService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.Optional;

@RestController
public class SecondOpinionController {
    @Autowired
    private DTOManager dtoManager;

    @Autowired
    private SecondOpinionService secondOpinionService;

    @Autowired
    private SecurityContextService securityContextService;

    @GetMapping("/second_opinions")
    public ResponseEntity<?> listSecondOpinions(){
        User user = securityContextService.getLoggedInUser();
        if(securityContextService.isUserInRole("PARENT"))
            return ResponseEntity.ok().body(secondOpinionService.listByRequester(user.getId()));

        if(securityContextService.isUserInRole("DOCTOR")
            || securityContextService.isUserInRole("PEDIATRICIAN"))
            return ResponseEntity.ok().body(secondOpinionService.listByDoctor(user.getId()));

        if(!securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authorization error, please login again");

        return ResponseEntity.ok().body(secondOpinionService.listAll());
    }

    @PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
    @PostMapping("/second_opinions")
    public ResponseEntity<?> createSecondOpinion(@RequestBody SecondOpinionDTO secondOpinionDTO){
        User user = securityContextService.getLoggedInUser();
        secondOpinionDTO.setRequester_id(user.getId());

        try{
            SecondOpinion secondOpinion = dtoManager.secondOpinionDTOToSecondOpinion(secondOpinionDTO);
            secondOpinion = secondOpinionService.save(secondOpinion);
            return ResponseEntity.ok().body(secondOpinion);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/second_opinion/{id}")
    public ResponseEntity<?> getSecondOpinion(@PathVariable("id") Long id){
        User user = securityContextService.getLoggedInUser();
        Optional<SecondOpinion> secondOpinion = secondOpinionService.findById(id);
        if(secondOpinion.isEmpty())
            return ResponseEntity.notFound().build();

        if(secondOpinion.get().getDoctor().getId().equals(user.getId())
            || secondOpinion.get().getRequester().getId().equals(user.getId())
            || securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.ok().body(secondOpinion.get());

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this second opinion");
    }

    @PutMapping("/second_opinion/{id}")
    public ResponseEntity<?> updateSecondOpinion(@PathVariable("id") Long id, @RequestBody SecondOpinionDTO secondOpinionDTO){
        User user = securityContextService.getLoggedInUser();
        Optional<SecondOpinion> secondOpinionOptional = secondOpinionService.findById(id);
        if(secondOpinionOptional.isEmpty())
            return ResponseEntity.notFound().build();

        SecondOpinion secondOpinion = secondOpinionOptional.get();
        if(!secondOpinion.getRequester().getId().equals(user.getId())
            && !securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to update this second opinion");

        try{
            secondOpinion.copyDifferentAttributes(dtoManager.secondOpinionDTOToSecondOpinion(secondOpinionDTO));
            secondOpinion = secondOpinionService.save(secondOpinion);
            return ResponseEntity.ok().body(dtoManager.secondOpinionToSecondOpinionDTO(secondOpinion));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
