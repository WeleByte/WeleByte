package ozdravi.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ozdravi.dao.AddressRepository;
import ozdravi.domain.Address;
import ozdravi.service.AddressService;

import java.util.List;
import java.util.Optional;

@Service
public class AddressServiceJpa implements AddressService {

    @Autowired
    private AddressRepository addressRepository;

    @Override
    public Address createAddress(Address address) {
        return addressRepository.save(address);
    }

    @Override
    public List<Address> listAll() {
        return addressRepository.findAll();
    }

    @Override
    public Optional<Address> findById(Long id) {
        return addressRepository.findById(id);
    }

    @Override
    public void deleteById(Long id) {
        addressRepository.deleteById(id);
    }

    @Override
    public void modifyAddress(Address newAddress, Long id) {
        Optional<Address> address = addressRepository.findById(id);

        if(address.isPresent()) {
            address.get().copyDifferentAttributes(newAddress);
            addressRepository.save(address.get());
        }
    }
}
