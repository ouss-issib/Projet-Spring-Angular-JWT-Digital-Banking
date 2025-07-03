package ma.enset.ebankingbackend.mappers;

import ma.enset.ebankingbackend.dtos.*;
import ma.enset.ebankingbackend.entities.*;
import ma.enset.ebankingbackend.enums.OperationType;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
public class BankAccountMapperImpl {
    public CustomerDTO fromCustomer(Customer customer) {
        if (customer == null) return null;  // <-- ajouter ce test null
        CustomerDTO customerDTO = new CustomerDTO();
        BeanUtils.copyProperties(customer, customerDTO);
        return customerDTO;
    }

    public Customer fromCustomerDTO(CustomerDTO customerDTO) {
        if (customerDTO == null) return null;  // <-- IMPORTANT
        Customer customer = new Customer();
        BeanUtils.copyProperties(customerDTO, customer);
        return customer;
    }
    public SavingBankAccountDTO fromSavingAccount(SavingAccount savingAccount) {
        SavingBankAccountDTO accountDTO = new SavingBankAccountDTO();
        BeanUtils.copyProperties(savingAccount, accountDTO);
        accountDTO.setCustomerDTO(fromCustomer(savingAccount.getCustomer()));
        accountDTO.setType(savingAccount.getClass().getSimpleName());
        return accountDTO;
    }

    public SavingAccount fromSavingAccountDTO(SavingBankAccountDTO savingBankAccountDTO) {
        SavingAccount savingAccount = new SavingAccount();
        BeanUtils.copyProperties(savingBankAccountDTO, savingAccount);
        savingAccount.setCustomer(fromCustomerDTO(savingBankAccountDTO.getCustomerDTO()));
        return savingAccount;
    }

    public CurrentBankAccountDTO fromCurrentAccount(CurrentAccount currentAccount) {
        CurrentBankAccountDTO accountDTO = new CurrentBankAccountDTO();
        BeanUtils.copyProperties(currentAccount, accountDTO);
        accountDTO.setCustomerDTO(fromCustomer(currentAccount.getCustomer()));
        accountDTO.setType(currentAccount.getClass().getSimpleName());
        return accountDTO;
    }

    public CurrentAccount fromCurrentAccountDTO(CurrentBankAccountDTO currentBankAccountDTO) {
        CurrentAccount currentAccount = new CurrentAccount();
        BeanUtils.copyProperties(currentBankAccountDTO,currentAccount);
        currentAccount.setCustomer(fromCustomerDTO(currentBankAccountDTO.getCustomerDTO()));
        return currentAccount;
    }

    public AccountOperationDTO fromAccountOperation(AccountOperation accountOperation) {
        AccountOperationDTO accountOperationDTO = new AccountOperationDTO();
        BeanUtils.copyProperties(accountOperation, accountOperationDTO);
        return accountOperationDTO;
    }

    public BankAccountDTO fromBankAccount(BankAccount account) {
        if (account == null) return null;
        if (account instanceof SavingAccount) {
            return fromSavingAccount((SavingAccount) account);
        } else if (account instanceof CurrentAccount) {
            return fromCurrentAccount((CurrentAccount) account);
        }
        return null;
    }


}
