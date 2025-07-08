package ma.enset.ebankingbackend;

import ma.enset.ebankingbackend.dtos.BankAccountDTO;
import ma.enset.ebankingbackend.dtos.CurrentBankAccountDTO;
import ma.enset.ebankingbackend.dtos.CustomerDTO;
import ma.enset.ebankingbackend.dtos.SavingBankAccountDTO;
import ma.enset.ebankingbackend.entities.*;
import ma.enset.ebankingbackend.enums.AccountStatus;
import ma.enset.ebankingbackend.enums.OperationType;
import ma.enset.ebankingbackend.exceptions.BalanceNotSufficientException;
import ma.enset.ebankingbackend.exceptions.BankAccountNotFoundException;
import ma.enset.ebankingbackend.exceptions.CustomerNotFoundException;
import ma.enset.ebankingbackend.repositories.AccountOperationRepository;
import ma.enset.ebankingbackend.repositories.BankAccountRepository;
import ma.enset.ebankingbackend.repositories.CustomerRepository;
import ma.enset.ebankingbackend.services.BankAccountService;
import ma.enset.ebankingbackend.services.BankService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;


@SpringBootApplication
@EnableWebSecurity
public class EbankingBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(EbankingBackendApplication.class, args);
    }

    @Bean
    CommandLineRunner commandLineRunner(BankAccountService bankAccountService) {
        return args -> {
            Stream.of("ouss", "zouita", "nizar").forEach(name -> {
                CustomerDTO customer = new CustomerDTO();
                customer.setName(name);
                customer.setEmail(name + "@gmail.com");
                bankAccountService.saveCustomer(customer);
            });
            bankAccountService.listCustomers().forEach(c -> {
                try {
                    bankAccountService.saveCurrentBankAccount(Math.random() * 90000, 900, c.getId());
                    bankAccountService.saveSavingBankAccount(Math.random() * 90000, 4.5, c.getId());


                } catch (CustomerNotFoundException e) {
                    e.printStackTrace();
                }

            });

            List<BankAccountDTO> bankAccountList = bankAccountService.bankAccountList();
            for (BankAccountDTO bankAccount : bankAccountList) {
                for (int i = 0; i < 5; i++) {
                    String accountId;
                    if(bankAccount instanceof SavingBankAccountDTO){
                        accountId = ((SavingBankAccountDTO) bankAccount).getId();
                    }
                    else{
                        accountId = ((CurrentBankAccountDTO) bankAccount).getId();
                    }
                    bankAccountService.credit(accountId, 1000 + Math.random() * 1000, "Credit");
                    bankAccountService.debit(accountId, 1000 + Math.random() * 1000, "Debit");
                }

            }
        };
    }
}


//    @Bean
//    CommandLineRunner start(AccountOperationRepository accountOperationRepository,
//                            CustomerRepository customerRepository,
//                            BankAccountRepository bankAccountRepository) {
//        return args -> {
//            Stream.of("ouss","zouita","nizar").forEach(name -> {
//               Customer customer = new Customer();
//               customer.setName(name);
//               customer.setEmail(name+"@gmail.com");
//               customerRepository.save(customer);
//            });
//
//            customerRepository.findAll().forEach(customer -> {
//                SavingAccount savingAccount = new SavingAccount();
//                savingAccount.setId(UUID.randomUUID().toString());
//                savingAccount.setCreatedAt(new Date());
//                savingAccount.setInterestRate(Math.random()*10);
//                savingAccount.setBalance(Math.random()*500);
//                savingAccount.setStatus(AccountStatus.CREATED);
//                savingAccount.setCustomer(customer);
//                savingAccount.setCurrency("MAD");
//                bankAccountRepository.save(savingAccount);
//
//                CurrentAccount currentAccount = new CurrentAccount();
//                currentAccount.setId(UUID.randomUUID().toString());
//                currentAccount.setCreatedAt(new Date());
//                currentAccount.setBalance(Math.random()*500);
//                currentAccount.setStatus(AccountStatus.CREATED);
//                currentAccount.setCustomer(customer);
//                currentAccount.setCurrency("$");
//                currentAccount.setOverDraft(Math.random()*1000);
//                bankAccountRepository.save(currentAccount);
//            });
//
//
//            bankAccountRepository.findAll().forEach(bankAccount -> {
//                for (int i = 0; i < 5; i++) {
//                    AccountOperation accountOperation = new AccountOperation();
//                    accountOperation.setOperationType(Math.random()>0.5 ? OperationType.CREDIT: OperationType.DEBIT);
//                    accountOperation.setDate(new Date());
//                    accountOperation.setAmount(Math.random()*300);
//                    accountOperation.setBankAccount(bankAccount);
//                    accountOperationRepository.save(accountOperation);                }
//            });
//
//
//            BankAccount bankAccount = bankAccountRepository.findById("2541f102-6c32-4de8-b0e5-e181d305dd0a").orElse(null);
//            System.out.println("*********************************");
//            System.out.println(bankAccount.toString());
//        };
   // }
//}
