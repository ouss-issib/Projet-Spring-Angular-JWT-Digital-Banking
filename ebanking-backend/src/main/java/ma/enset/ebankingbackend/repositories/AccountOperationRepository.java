package ma.enset.ebankingbackend.repositories;

import ma.enset.ebankingbackend.dtos.AccountOperationDTO;
import ma.enset.ebankingbackend.entities.AccountOperation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccountOperationRepository extends JpaRepository<AccountOperation, Long> {
    List<AccountOperation> findByBankAccountId(String bankAccount_id);
    Page<AccountOperation> findByBankAccountId(String bankAccount_id, Pageable pageable);
}
