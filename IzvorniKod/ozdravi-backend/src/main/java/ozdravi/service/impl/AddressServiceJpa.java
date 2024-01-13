package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ozdravi.dao.AddressRepository;
import ozdravi.domain.Address;
import ozdravi.domain.User;
import ozdravi.exceptions.EntityMissingException;
import ozdravi.exceptions.LoggedUserException;
import ozdravi.rest.dto.AddressDTO;
import ozdravi.service.AddressService;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceJpa implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private SecurityContextService securityContextService;

    @Autowired
    private DTOManager dtoManager;

    @Override
    public Address createAddress(AddressDTO addressDTO) {
        User optUser = securityContextService.getLoggedInUser();
        Address address = dtoManager.addressDTOToAddress(addressDTO);
        return addressRepository.save(address);
    }

    @Override
    public List<Address> listAll() {
        return addressRepository.findAll();
    }

    @Override
    public Address findById(Long id) {
        Optional<Address> address = addressRepository.findById(id);
        if (address.isEmpty()) throw new EntityMissingException("No address with such id");
        return address.get();
    }

    @Override
    public void deleteById(Long id) {
        //todo provjera da postoji
        addressRepository.deleteById(id);
    }

    @Override
    public void modifyAddress(Address newAddress, Long id) {
        Address address = findById(id);
        address.copyDifferentAttributes(newAddress);
        addressRepository.save(address);
    }

    @Override
    public Optional<Address> getSavedInstance(Address address){
        return addressRepository.findByStreetAndNumberAndCityAndCountry(
                address.getStreet(),
                address.getNumber(),
                address.getCity(),
                address.getCountry()
        );
    }
}
