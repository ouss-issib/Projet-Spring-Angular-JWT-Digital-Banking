package ma.enset.ebankingbackend.web;

import lombok.AllArgsConstructor;
import ma.enset.ebankingbackend.dtos.AccountHistoryDTO;
import ma.enset.ebankingbackend.dtos.AccountOperationDTO;
import ma.enset.ebankingbackend.dtos.BankAccountDTO;
import ma.enset.ebankingbackend.exceptions.BankAccountNotFoundException;
import ma.enset.ebankingbackend.services.BankAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
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

//    @PostMapping("/accounts/{id}")
//    public BankAccountDTO saveAccount(@PathVariable String id , @RequestBody BankAccountDTO bankAccountDTO){
//        return
//    }

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

}
