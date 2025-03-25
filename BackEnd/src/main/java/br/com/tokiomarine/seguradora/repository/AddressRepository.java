package br.com.tokiomarine.seguradora.repository;

import br.com.tokiomarine.seguradora.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AddressRepository extends JpaRepository<Address, Long> {
}
