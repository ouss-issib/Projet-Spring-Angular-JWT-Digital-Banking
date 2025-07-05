package ma.enset.ebankingbackend.services;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import ma.enset.ebankingbackend.dtos.*;
import ma.enset.ebankingbackend.entities.*;
import ma.enset.ebankingbackend.enums.AccountStatus;
import ma.enset.ebankingbackend.enums.OperationType;
import ma.enset.ebankingbackend.exceptions.BalanceNotSufficientException;
import ma.enset.ebankingbackend.exceptions.BankAccountNotFoundException;
import ma.enset.ebankingbackend.exceptions.CustomerNotFoundException;
import ma.enset.ebankingbackend.mappers.BankAccountMapperImpl;
import ma.enset.ebankingbackend.repositories.AccountOperationRepository;
import ma.enset.ebankingbackend.repositories.BankAccountRepository;
import ma.enset.ebankingbackend.repositories.CustomerRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
@AllArgsConstructor
@Slf4j
public class BankAccountServiceImpl implements BankAccountService {

    private CustomerRepository customerRepository;
    private BankAccountRepository bankAccountRepository;
    private AccountOperationRepository accountOperationRepository;
    private BankAccountMapperImpl dtoMapper;


    @Override
    public CustomerDTO saveCustomer(CustomerDTO customerDTO) {
        log.info("Saving new Customer");
        Customer customer =  customerRepository.save(dtoMapper.fromCustomerDTO(customerDTO));
        Customer savedCustomer = customerRepository.save(customer);
        return dtoMapper.fromCustomer(savedCustomer);
    }


    @Override
    public CustomerDTO updateCustomer(CustomerDTO customerDTO) {
        log.info("Updating new Customer");
        Customer customer =  customerRepository.save(dtoMapper.fromCustomerDTO(customerDTO));
        Customer savedCustomer = customerRepository.save(customer);
        return dtoMapper.fromCustomer(savedCustomer);
    }


    @Override
    public void deleteCustomer(Long customerId) {
        log.info("Deleting a Customer");
        customerRepository.deleteById(customerId);
    }

    @Override
    public CurrentBankAccountDTO saveCurrentBankAccount(double initialBalance, double overDraft, Long customerId) throws CustomerNotFoundException {
        Customer customer= customerRepository.findById(customerId).orElse(null);
        if(customer == null) {
            throw new CustomerNotFoundException("Customer not found");
        }
        CurrentAccount currentAccount =new CurrentAccount();
        currentAccount.setId(UUID.randomUUID().toString());
        currentAccount.setCreatedAt(new Date());
        currentAccount.setBalance(initialBalance);
        currentAccount.setStatus(AccountStatus.CREATED);
        currentAccount.setOverDraft(overDraft);
        currentAccount.setCustomer(customer);
        return dtoMapper.fromCurrentAccount(bankAccountRepository.save(currentAccount));

    }

    @Override
    public SavingBankAccountDTO saveSavingBankAccount(double initialBalance, double interestRate, Long customerId) throws CustomerNotFoundException {
        Customer customer= customerRepository.findById(customerId).orElse(null);
        if(customer == null) {
            throw new CustomerNotFoundException("Customer not found");
        }
        SavingAccount savingAccount =new SavingAccount();
        savingAccount.setId(UUID.randomUUID().toString());
        savingAccount.setCreatedAt(new Date());
        savingAccount.setBalance(initialBalance);
        savingAccount.setInterestRate(interestRate);
        savingAccount.setStatus(AccountStatus.CREATED);
        savingAccount.setCustomer(customer);
        return dtoMapper.fromSavingAccount(bankAccountRepository.save(savingAccount));
    }


    @Override
    public List<CustomerDTO> listCustomers() {
        List<Customer> customerList = customerRepository.findAll();
        return customerList.stream().map(c -> dtoMapper.fromCustomer(c)).collect(Collectors.toList());
    }

    @Override
    public BankAccountDTO getBankAccount(String accountId) throws BankAccountNotFoundException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new BankAccountNotFoundException("BankAccount not found"));
        if(bankAccount instanceof SavingAccount) {
            return dtoMapper.fromSavingAccount((SavingAccount) bankAccount);
        }
        else {
            return dtoMapper.fromCurrentAccount((CurrentAccount) bankAccount);
        }
    }

    @Override
    public BankAccountDTO updateBankAccount(BankAccountDTO bankAccountDTO) throws BankAccountNotFoundException {
        log.info("Received bankAccountDTO: {}", bankAccountDTO);

        BankAccount existingAccount = bankAccountRepository.findById(bankAccountDTO.getId())
                .orElseThrow(() -> new BankAccountNotFoundException("BankAccount not found!"));

        if (bankAccountDTO instanceof SavingBankAccountDTO savingDTO && existingAccount instanceof SavingAccount savingAccount) {
            // Mise à jour des champs autorisés
            savingAccount.setBalance(savingDTO.getBalance());
            savingAccount.setInterestRate(savingDTO.getInterestRate());
            savingAccount.setStatus(savingDTO.getStatus());

            if (savingDTO.getCustomerDTO() != null) {
                savingAccount.setCustomer(dtoMapper.fromCustomerDTO(savingDTO.getCustomerDTO()));
            }

            existingAccount = savingAccount;

        } else if (bankAccountDTO instanceof CurrentBankAccountDTO currentDTO && existingAccount instanceof CurrentAccount currentAccount) {
            // Mise à jour des champs autorisés
            currentAccount.setBalance(currentDTO.getBalance());
            currentAccount.setOverDraft(currentDTO.getOverDraft());
            currentAccount.setStatus(currentDTO.getStatus());

            if (currentDTO.getCustomerDTO() != null) {
                currentAccount.setCustomer(dtoMapper.fromCustomerDTO(currentDTO.getCustomerDTO()));
            }
            existingAccount = currentAccount;

        } else {
            throw new IllegalArgumentException("Mismatched account types or unknown DTO type: " + bankAccountDTO.getClass().getSimpleName());
        }

        BankAccount savedAccount = bankAccountRepository.save(existingAccount);
        return dtoMapper.fromBankAccount(savedAccount);
    }



    @Override
    public void deleteBankAccount(String accountId) {
        log.info("Deleting a Bank Account");
        bankAccountRepository.deleteById(accountId);
    }

    @Override
    public void debit(String accountId, double amount, String description) throws BankAccountNotFoundException,BalanceNotSufficientException{
        BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new BankAccountNotFoundException("BankAccount not found"));
        if (bankAccount.getBalance() < amount) {
            throw new BalanceNotSufficientException("Balance not sufficient");
        }
        AccountOperation accountOperation = new AccountOperation();
        accountOperation.setOperationType(OperationType.DEBIT);
        accountOperation.setAmount(amount);
        accountOperation.setDescription(description);
        accountOperation.setDate(new Date());
        accountOperation.setBankAccount(bankAccount);
        accountOperationRepository.save(accountOperation);
        bankAccount.setBalance(bankAccount.getBalance() - amount);
        bankAccountRepository.save(bankAccount);
    }

    @Override
    public void credit(String accountId, double amount, String description) throws BankAccountNotFoundException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new BankAccountNotFoundException("BankAccount not found"));
        AccountOperation accountOperation = new AccountOperation();
        accountOperation.setOperationType(OperationType.CREDIT);
        accountOperation.setAmount(amount);
        accountOperation.setDescription(description);
        accountOperation.setDate(new Date());
        accountOperation.setBankAccount(bankAccount);
        accountOperationRepository.save(accountOperation);
        bankAccount.setBalance(bankAccount.getBalance() + amount);
        bankAccountRepository.save(bankAccount);
    }

    @Override
    public void transfer(String accountIdSource, String accountIdDestination, Double amount) throws BankAccountNotFoundException, BalanceNotSufficientException {
        debit(accountIdSource,amount,"Transfer to "+ accountIdDestination);
        credit(accountIdDestination,amount,"Transfer from "+accountIdSource);
    }

    @Override
    public List<BankAccountDTO> bankAccountList(){
        List<BankAccount> bankAccountDTOList =  bankAccountRepository.findAll();
        return bankAccountDTOList.stream()
                .map(acc-> {
            if(acc instanceof SavingAccount) {
                return dtoMapper.fromSavingAccount((SavingAccount) acc);
            }
            else {
                return dtoMapper.fromCurrentAccount((CurrentAccount) acc);
            }
        }).collect(Collectors.toList());
    }

    @Override
    public List<BankAccountDTO> bankAccountList(Long customerId) {
        Customer customer = customerRepository.findById(customerId).orElse(null);
        if (customer == null) {
            // You can throw an exception or return an empty list
            return List.of();
        }
        // Fetch all accounts for this customer
        List<BankAccount> accounts = bankAccountRepository.findByCustomerId(customerId);
        // Map to DTOs
        return accounts.stream()
                .map(account -> dtoMapper.fromBankAccount(account))
                .toList();
    }

    @Override
    public CustomerDTO getCustomer(Long customerId) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(customerId).orElseThrow(()->{
            return new CustomerNotFoundException("Customer not found");
        });
        return dtoMapper.fromCustomer(customer);
    }


    @Override
    public List<AccountOperationDTO> accountHistorique(String accountId){
        return accountOperationRepository.findByBankAccountId(accountId).stream()
                .sorted(Comparator.comparing(AccountOperation::getDate).reversed())
                .map(op->dtoMapper.fromAccountOperation(op)).collect(Collectors.toList());
    }

    @Override
    public AccountHistoryDTO getAccountHistory(String accountId, int page, int size) throws BankAccountNotFoundException {
        BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new BankAccountNotFoundException("BankAccount not found"));
        Page<AccountOperation> accountOperations = accountOperationRepository.findByBankAccountId(accountId, PageRequest.of(page, size));
        AccountHistoryDTO accountHistoryDTO = new AccountHistoryDTO();
        List<AccountOperationDTO> accountOperationsDTOS = accountOperations.getContent().stream()
                .sorted(Comparator.comparing(AccountOperation::getDate).reversed())
                .map(op -> dtoMapper.fromAccountOperation(op)).collect(Collectors.toList());
        accountHistoryDTO.setAccountOperations(accountOperationsDTOS);
        accountHistoryDTO.setAccountId(bankAccount.getId());
        accountHistoryDTO.setBalance(bankAccount.getBalance());
        accountHistoryDTO.setCurrentPage(page);
        accountHistoryDTO.setPageSize(size);
        accountHistoryDTO.setTotalPages(accountOperations.getTotalPages());
        return accountHistoryDTO;
    }

    @Override
    public List<CustomerDTO> searchCustomers(String keyword) {
        List<Customer> customerList = customerRepository.findByNameContains(keyword);
        return customerList.stream().map(customer -> dtoMapper.fromCustomer(customer)).collect(Collectors.toList());
    }

    @Override
    public CustomerDTO searchCustomerById(Long id) throws CustomerNotFoundException {
        Customer customer = customerRepository.findById(id).orElseThrow(()-> new CustomerNotFoundException("Customer Not Found"));
        return dtoMapper.fromCustomer(customer);    }



}
