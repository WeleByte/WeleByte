package ozdravi.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import ozdravi.domain.Address;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
