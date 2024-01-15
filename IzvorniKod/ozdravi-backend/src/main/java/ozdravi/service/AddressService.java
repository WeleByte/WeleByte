package ozdravi.service;

import ozdravi.domain.Address;
import ozdravi.rest.dto.AddressDTO;

import java.util.List;
import java.util.Optional;

public interface AddressService {

    /**
     * adds given address to db
     * @param address new address
     * @return successfully saved address
     */
    Address createAddress(AddressDTO address);

    Address createAddressPure(Address address);

    /**
     * lists all addresses present in db
     * @return list of addresses
     */
    List<Address> listAll();

    /**
     * finds address by its id
     * @param id address_id
     * @return address if exists
     */
    Address findById(Long id);

    /**
     * deletes address from the db
     * @param id address_id
     */
    void deleteById(Long id);

    /**
     * modifies address
     * @param newData new address
     * @param id address_id
     */
    void modifyAddress(Address newData, Long id);

    Optional<Address> getSavedInstance(Address address);
}
