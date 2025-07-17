package ma.enset.ebankingbackend.web;

import ma.enset.ebankingbackend.dtos.DashboardDTO;
import ma.enset.ebankingbackend.entities.BankAccount;
import ma.enset.ebankingbackend.repositories.BankAccountRepository;
import ma.enset.ebankingbackend.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
