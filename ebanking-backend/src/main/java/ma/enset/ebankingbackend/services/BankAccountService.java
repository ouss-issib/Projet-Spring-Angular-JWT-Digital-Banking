package ma.enset.ebankingbackend.services;

import ma.enset.ebankingbackend.dtos.*;
import ma.enset.ebankingbackend.entities.BankAccount;
import ma.enset.ebankingbackend.entities.CurrentAccount;
import ma.enset.ebankingbackend.entities.Customer;
import ma.enset.ebankingbackend.entities.SavingAccount;
import ma.enset.ebankingbackend.exceptions.BalanceNotSufficientException;
import ma.enset.ebankingbackend.exceptions.BankAccountNotFoundException;
import ma.enset.ebankingbackend.exceptions.CustomerNotFoundException;

import java.util.List;

public interface BankAccountService {
    CustomerDTO saveCustomer(CustomerDTO customerDTO);

    CustomerDTO updateCustomer(CustomerDTO customerDTO);

    void deleteCustomer(Long customerId);

    CurrentBankAccountDTO saveCurrentBankAccount(double initialBalance, double overDraft, Long customerId) throws CustomerNotFoundException;
    SavingBankAccountDTO saveSavingBankAccount(double initialBalance, double interestRate, Long customerId) throws CustomerNotFoundException;

    List<CustomerDTO> listCustomers();
    BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException;

    BankAccountDTO updateBankAccount(BankAccountDTO bankAccountDTO) throws BankAccountNotFoundException;

    void deleteBankAccount(String accountId);

    void debit(String accountId, double amount, String description) throws BankAccountNotFoundException, BalanceNotSufficientException;
    void credit(String accountId, double amount,String description) throws BankAccountNotFoundException;
    void transfer(String accountIdSource, String accountIdDestination, Double amount) throws BankAccountNotFoundException, BalanceNotSufficientException;

    List<BankAccountDTO> bankAccountList();
    List<BankAccountDTO> bankAccountList(Long customerId);
    CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException;

    List<AccountOperationDTO> accountHistorique(String accountId);

    AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException;

    List<CustomerDTO> searchCustomers(String keyword);

    CustomerDTO searchCustomerById(Long id) throws CustomerNotFoundException;
}
