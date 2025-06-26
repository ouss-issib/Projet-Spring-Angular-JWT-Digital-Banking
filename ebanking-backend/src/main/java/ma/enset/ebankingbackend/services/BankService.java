package ma.enset.ebankingbackend.services;

import ma.enset.ebankingbackend.entities.BankAccount;
import ma.enset.ebankingbackend.entities.CurrentAccount;
import ma.enset.ebankingbackend.entities.SavingAccount;
import ma.enset.ebankingbackend.repositories.BankAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class BankService {
    @Autowired
    private BankAccountRepository bankAccountRepository;

    public void consulter(){
        BankAccount bankAccount = bankAccountRepository.findById("2541f102-6c32-4de8-b0e5-e181d305dd0a").orElse(null);
        System.out.println("*********************************");

        if(bankAccount != null){
            System.out.println("Bank Account ID: " + bankAccount.getId());
            System.out.println("Bank Account Balance: " + bankAccount.getBalance());
            System.out.println("Bank Account Status: " + bankAccount.getStatus());
            System.out.println("Bank Account CreatedAt: " + bankAccount.getCreatedAt());
            System.out.println("Customer Name : " + bankAccount.getCustomer().getName());
            System.out.println("Class Name : " + bankAccount.getClass().getSimpleName());
            if(bankAccount instanceof CurrentAccount){
                System.out.println("Over Draft => "+((CurrentAccount) bankAccount).getOverDraft());
            } else if (bankAccount instanceof SavingAccount) {
                System.out.println("Rate => "+((SavingAccount)bankAccount).getInterestRate());
            }

            bankAccount.getAccountOperations().forEach(operation -> {
                System.out.println(operation.getOperationType()+ "\t"
                        +operation.getAmount()+ "\t"
                        +operation.getDate()+ "\t");
            });
        }
    }
}



