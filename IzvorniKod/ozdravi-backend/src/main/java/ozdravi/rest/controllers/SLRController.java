package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.SLR;
import ozdravi.domain.User;
import ozdravi.rest.dto.SLRDTO;
import ozdravi.service.SLRService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.Optional;

@RestController
public class SLRController {
    @Autowired
    private DTOManager dtoManager;

    @Autowired
    private SLRService slrService;

    @Autowired
    private SecurityContextService securityContextService;

    @PreAuthorize("hasAnyRole('ADMIN', 'PEDIATRICIAN')")
    @PostMapping("/sick_leave_recommendations")
    public ResponseEntity<?> createSLR(@RequestBody SLRDTO slrDTO) {
        if(securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Admin can't create SLR");

        Optional<User> currentUser = securityContextService.getLoggedInUser();
        if(currentUser.isEmpty()) return ResponseEntity.internalServerError().build();

        slrDTO.setCreator_id(currentUser.get().getId());

        try{
            SLR slr = dtoManager.slrdtoToSLR(slrDTO);
            return ResponseEntity.ok().body(slrService.createSLR(slr));
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/sick_leave_recommendations")
    public ResponseEntity<?> listSLRs() {
        if(securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.OK).body(slrService.listAll());

        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        if(securityContextService.isUserInRole("PARENT"))
            return ResponseEntity.ok().body(slrService.listByParent(user.get().getId()));

        if(securityContextService.isUserInRole("PEDIATRICIAN"))
            return ResponseEntity.ok().body(slrService.listByCreator(user.get().getId()));

        if(securityContextService.isUserInRole("DOCTOR"))
            return ResponseEntity.ok().body(slrService.listByApprover(user.get().getId()));

        return ResponseEntity.ok().body(slrService.listAll());
    }

    @GetMapping("/sick_leave_recommendation/{id}")
    public ResponseEntity<?> getSLR(@PathVariable("id") Long id) {
        Optional<SLR> slrOptional = slrService.findById(id);
        if(slrOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sick leave recommendation with id: " + id.toString() + " not found");

        if(securityContextService.isUserInRole("ADMIN"))
            return ResponseEntity.status(HttpStatus.OK).body(slrOptional.get());

        Optional<User> user = securityContextService.getLoggedInUser();
        if(user.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        SLR slr = slrOptional.get();

        if(!slr.getParent().getId().equals(user.get().getId())
                && !slr.getCreator().getId().equals(user.get().getId())
                && !slr.getApprover().getId().equals(user.get().getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to view this info");
        }

        SLRDTO slrDTO = dtoManager.slrToSLRDTO(slr);

        return ResponseEntity.ok(slrDTO);
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'PEDIATRICIAN')")
    @PostMapping("/sick_leave_recommendations/{id}")
    public ResponseEntity<?> updateSLR(@PathVariable("id") Long id, @RequestBody SLRDTO slrDTO) {

        Optional<SLR> slrOptional = slrService.findById(id);
        if(slrOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sick leave recommendation with id: " + id.toString() + " not found");

        SLR slr = slrOptional.get();
        slrDTO.setId(id);

        try{
            SLR slrModified = dtoManager.slrdtoToSLR(slrDTO);
            slrService.modifySLR(slrModified, id);
            return ResponseEntity.ok().body("Sick leave recommendation with id: " + id.toString() + " successfully updated");
        } catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PreAuthorize("hasAnyRole('ADMIN', 'DOCTOR')")
    @PatchMapping("/sick_leave_recommendations/{id}")
    public ResponseEntity<?> approveSLR(@PathVariable("id") Long id, Boolean approved) {

        Optional<SLR> slrOptional = slrService.findById(id);
        if(slrOptional.isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Sick leave recommendation with id: " + id.toString() + " not found");

        SLR slr = slrOptional.get();

        Optional<User> currentUserOptional = securityContextService.getLoggedInUser();
        if(currentUserOptional.isEmpty()) return ResponseEntity.internalServerError().build();

        if(securityContextService.isUserInRole("DOCTOR") && slr.getApprover().getId().equals(currentUserOptional.get().getId()))
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to approve or reject this SLR");

        slr.setStatus(approved);

        String approvalString = approved ? "approved" : "rejected";

        slrService.save(slr);
        return ResponseEntity.ok().body("Sick leave recommendation with id: " + id.toString() + " successfully " + approvalString);
    }
}
