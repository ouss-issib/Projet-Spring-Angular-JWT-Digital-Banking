package ma.enset.ebankingbackend.repositories;

import ma.enset.ebankingbackend.entities.BankAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BankAccountRepository extends JpaRepository<BankAccount,String> {
    List<BankAccount> findByCustomerId(Long customerId);
    // Query to count the number of BankAccounts based on the type discriminator column
    // Query to count accounts based on class type
    @Query("SELECT COUNT(b) FROM BankAccount b WHERE TYPE(b) = :type")
    long countAccountsByType(@Param("type") Class<? extends BankAccount> type);
}