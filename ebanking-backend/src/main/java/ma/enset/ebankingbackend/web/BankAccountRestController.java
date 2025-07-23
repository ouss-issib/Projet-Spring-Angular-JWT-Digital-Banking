package ma.enset.ebankingbackend.web;

import lombok.AllArgsConstructor;
import ma.enset.ebankingbackend.dtos.*;
import ma.enset.ebankingbackend.exceptions.BankAccountNotFoundException;
import ma.enset.ebankingbackend.exceptions.CustomerNotFoundException;
import ma.enset.ebankingbackend.services.BankAccountService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
public class BankAccountRestController {
    private BankAccountService bankAccountService;

    @GetMapping("/accounts/{id}")
    @PreAuthorize("hasRole('USER')")
    public BankAccountDTO getBankAccountById(@PathVariable String id) throws BankAccountNotFoundException {
        return bankAccountService.getBankAccount(id);
    }

    @GetMapping("/accounts")
    @PreAuthorize("hasRole('USER')")
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
    @PreAuthorize("hasRole('USER')")

    public List<AccountOperationDTO> getHistoriqueBankAccounts(@PathVariable String accountId) {
        return bankAccountService.accountHistorique(accountId);
    }

    @GetMapping("/accounts/{accountId}/pageOperations")
    @PreAuthorize("hasRole('USER')")

    public AccountHistoryDTO getAccountHistory(
            @PathVariable String accountId,
            @RequestParam(name = "page",defaultValue = "0") int page,
            @RequestParam(name = "size",defaultValue = "5") int size ) throws BankAccountNotFoundException {
        return bankAccountService.getAccountHistory(accountId,page,size);
    }

    @GetMapping("accounts/by-customer/{customerId}")
    @PreAuthorize("hasRole('USER')")

    public List<BankAccountDTO> getAccountsByCustomer(@PathVariable Long customerId) {
        return bankAccountService.bankAccountList(customerId);
    }
    @PostMapping("/accounts/credit")
    public void credit(@RequestBody DebitDTO request) throws Exception {
        bankAccountService.credit(request.getAccountId(), request.getAmount(), request.getDescription());
    }

    @PostMapping("/accounts/debit")
    public void debit(@RequestBody DebitDTO request) throws Exception {
        bankAccountService.debit(request.getAccountId(), request.getAmount(), request.getDescription());
    }

    @PostMapping("/accounts/transfer")
    public void transfer(@RequestBody TransferRequestDTO request) throws Exception {
        bankAccountService.transfer(request.getSourceAccount(), request.getDestinationAccount(), request.getAmount());
    }

    @GetMapping("/accounts/others/{id}")
    @PreAuthorize("hasRole('USER')")

    public List<BankAccountDTO> getOtherAccounts(@PathVariable String id) {
        return bankAccountService.bankAccountList().stream()
                .filter(account -> !account.getId().equals(id))
                .collect(Collectors.toList());
    }

}
