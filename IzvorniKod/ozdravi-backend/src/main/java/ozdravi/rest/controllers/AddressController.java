package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Address;
import ozdravi.domain.Instruction;
import ozdravi.domain.User;
import ozdravi.rest.dto.AddressDTO;
import ozdravi.service.AddressService;

import java.util.List;
import java.util.Optional;

@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    //list all addresses
    @GetMapping("/addresses")
    public ResponseEntity<List<Address>> listAllAddresses() {
        return new ResponseEntity<>(addressService.listAll(), HttpStatus.OK);
    }

    //create an address
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping("/addresses")
    public ResponseEntity<Address> createAddress(AddressDTO addressDTO){
        return new ResponseEntity<>(addressService.createAddress(addressDTO), HttpStatus.CREATED);
    }

    //return address with given id
    @GetMapping("/address/{id}")
    public ResponseEntity<Address> listUserAddresses(@PathVariable("id") Long id) {
        return new ResponseEntity<>(addressService.findById(id), HttpStatus.OK);
    }

}
