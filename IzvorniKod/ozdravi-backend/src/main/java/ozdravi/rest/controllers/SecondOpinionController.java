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
    private SecondOpinionService secondOpinionService;

    @GetMapping("/second_opinions")
    public ResponseEntity<?> listSecondOpinions(){
        return ResponseEntity.ok().body(secondOpinionService.list());
    }

    @PreAuthorize("hasAnyRole('PARENT', 'ADMIN')")
    @PostMapping("/second_opinions")
    public ResponseEntity<?> createSecondOpinion(@RequestBody SecondOpinionDTO secondOpinionDTO){
        return new ResponseEntity<>(secondOpinionService.createSecondOpinion(secondOpinionDTO), HttpStatus.CREATED);
    }

    @GetMapping("/second_opinion/{id}")
    public ResponseEntity<?> getSecondOpinion(@PathVariable("id") Long id){
        return new ResponseEntity<>(secondOpinionService.findById(id), HttpStatus.OK);
    }

    @PutMapping("/second_opinion/{id}")
    public ResponseEntity<?> updateSecondOpinion(@PathVariable("id") Long id, @RequestBody SecondOpinionDTO secondOpinionDTO){
        secondOpinionService.modifySecondOpinion(secondOpinionDTO, id);
        return new ResponseEntity<>("Second opinion successfully modified", HttpStatus.OK);
    }
}
