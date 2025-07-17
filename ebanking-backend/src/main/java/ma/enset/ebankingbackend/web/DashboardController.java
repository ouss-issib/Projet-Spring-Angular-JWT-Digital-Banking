package ma.enset.ebankingbackend.web;

import ma.enset.ebankingbackend.dtos.DashboardDTO;
import ma.enset.ebankingbackend.entities.BankAccount;
import ma.enset.ebankingbackend.entities.CurrentAccount;
import ma.enset.ebankingbackend.entities.SavingAccount;
import ma.enset.ebankingbackend.enums.AccountType;
import ma.enset.ebankingbackend.repositories.BankAccountRepository;
import ma.enset.ebankingbackend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * @author $ {USER}
 **/
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {


    private BankAccountRepository accountRepo;
    private CustomerRepository customerRepo;

    public DashboardController(BankAccountRepository accountRepo, CustomerRepository customerRepo) {
        this.accountRepo = accountRepo;
        this.customerRepo = customerRepo;
    }

    @GetMapping
    public DashboardDTO getDashboardData() {
        DashboardDTO dto = new DashboardDTO();
        dto.setTotalCustomers((int) customerRepo.count());
        dto.setTotalAccounts((int) accountRepo.count());
        dto.setTotalBalance(accountRepo.findAll()
                .stream()
                .mapToDouble(BankAccount::getBalance)
                .sum());
        return dto;
    }

    @GetMapping("/accounts-by-type")
    public Map<String, Long> getAccountsByType() {
        // Count Saving Accounts
        long savingAccountCount = accountRepo.countAccountsByType(SavingAccount.class);

        // Count Current Accounts
        long currentAccountCount = accountRepo.countAccountsByType(CurrentAccount.class);

        System.out.println("Saving Accounts: " + savingAccountCount);
        System.out.println("Current Accounts: " + currentAccountCount);
        Map<String, Long> result = new HashMap<>();
        result.put("Saving", savingAccountCount);
        result.put("Current", currentAccountCount);

        return result;
    }

}
