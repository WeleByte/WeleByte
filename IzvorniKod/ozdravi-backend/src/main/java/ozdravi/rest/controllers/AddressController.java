package ozdravi.rest.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ozdravi.domain.Address;
import ozdravi.service.AddressService;

import java.util.List;
import java.util.Optional;

@RestController
public class AddressController {
    @Autowired
    private AddressService addressService;

    //list all addresses
    @GetMapping("/addresses")
    public List<Address> listAllAddresses() {
        return addressService.listAll();
    }

    //create an address
    //@PostMapping("/addresses")


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
