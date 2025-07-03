package ma.enset.ebankingbackend.web;

import lombok.AllArgsConstructor;
import ma.enset.ebankingbackend.dtos.*;
import ma.enset.ebankingbackend.exceptions.BankAccountNotFoundException;
import ma.enset.ebankingbackend.exceptions.CustomerNotFoundException;
import ma.enset.ebankingbackend.services.BankAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class BankAccountRestController {
    private BankAccountService bankAccountService;

    @GetMapping("/accounts/{id}")
    public BankAccountDTO getBankAccountById(@PathVariable String id) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(id);
    }

    @GetMapping("/accounts")
    public List<BankAccountDTO> getAllBankAccounts() {
        return bankAccountService.bankAccountList();
    }

    // For Saving Account
    @PostMapping("/accounts/saving")
    public SavingBankAccountDTO saveSavingAccount(@RequestBody SavingAccountRequestDTO dto) throws CustomerNotFoundException {
        return bankAccountService.saveSavingBankAccount(dto.getInitialBalance(), dto.getInterestRate(), dto.getCustomerId());
    }

    @PutMapping("/accounts/{accountId}")
    public BankAccountDTO updateAccount(@PathVariable String accountId, @RequestBody BankAccountDTO dto) throws BankAccountNotFoundException {
        dto.setId(accountId);
        return bankAccountService.updateBankAccount(dto);
    }

    @DeleteMapping("/accounts/{accountId}")
    public void deleteAccount(@PathVariable String accountId) {
        bankAccountService.deleteBankAccount(accountId);
    }

    // For Current Account
    @PostMapping("/accounts/current")
    public CurrentBankAccountDTO saveCurrentAccount(@RequestBody CurrentAccountRequestDTO dto) throws CustomerNotFoundException {
        return bankAccountService.saveCurrentBankAccount(dto.getInitialBalance(), dto.getOverDraft(), dto.getCustomerId());
    }

    @GetMapping("/accounts/{accountId}/operations")
    public List<AccountOperationDTO> getHistoriqueBankAccounts(@PathVariable String accountId) {
        return bankAccountService.accountHistorique(accountId);
    }

    @GetMapping("/accounts/{accountId}/pageOperations")
    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size ) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId,page,size);
    }

    @GetMapping("accounts/by-customer/{customerId}")
    public List<BankAccountDTO> getAccountsByCustomer(@PathVariable Long customerId) {
        return bankAccountService.bankAccountList(customerId);
    }

}
