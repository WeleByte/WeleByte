package ozdravi.rest.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import ozdravi.domain.Address;
import ozdravi.domain.SecondOpinion;

@Data
@NoArgsConstructor
public class AddressDTO {
    private Long id;
    private String street;
    private String number;
    private String country;
    private Float latitude;
    private Float longitude;

    public AddressDTO(Address address) {
        setId(address.getId());
        setStreet(address.getStreet());
        setNumber(address.getNumber());
        setCountry(address.getCountry());
        setLatitude(address.getLatitude());
        setLongitude(address.getLongitude());
    }
}
