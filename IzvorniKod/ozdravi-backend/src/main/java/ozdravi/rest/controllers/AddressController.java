package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Address;
import ozdravi.domain.User;
import ozdravi.rest.dto.AddressDTO;
import ozdravi.service.AddressService;
import ozdravi.service.impl.DTOManager;
import ozdravi.service.impl.SecurityContextService;

import java.util.List;
import java.util.Optional;

@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    @Autowired
    private DTOManager dtoManager;

    @Autowired
    SecurityContextService securityContextService;

    //list all addresses
    @GetMapping("/addresses")
    public List<Address> listAllAddresses() {
        return addressService.listAll();
    }

    //create an address
    @PostMapping("/addresses")
    public ResponseEntity<?> createAddress(AddressDTO addressDTO){
        Optional<User> optUser = securityContextService.getLoggedInUser();
        if(optUser.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();

        try{
            Address address = dtoManager.addressDTOToAddress(addressDTO);
            return ResponseEntity.ok(addressService.createAddress(address));
        } catch (IllegalArgumentException e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    //return address with given id
    @GetMapping("/address/{id}")
    public ResponseEntity<?> listUserAddresses(@PathVariable("id") Long id) {
        Optional<Address> address = addressService.findById(id);
        if (address.isPresent())
            return ResponseEntity.ok(address);
        //inace
        return ResponseEntity.notFound().build();
    }

}
