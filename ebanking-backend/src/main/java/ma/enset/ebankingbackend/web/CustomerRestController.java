package ma.enset.ebankingbackend.web;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import ma.enset.ebankingbackend.dtos.CustomerDTO;
import ma.enset.ebankingbackend.entities.Customer;
import ma.enset.ebankingbackend.exceptions.CustomerNotFoundException;
import ma.enset.ebankingbackend.services.BankAccountService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@CrossOrigin("*")
@Slf4j
public class CustomerRestController {
    private BankAccountService bankAccountService;

    @GetMapping("/customers")
    public List<CustomerDTO> customerList() {
        return bankAccountService.listCustomers();
    }


    @GetMapping("/customers/search")
    public List<CustomerDTO> searchCustomers(@RequestParam(name="keyword",defaultValue ="") String keyword) {
        return bankAccountService.searchCustomers(keyword);
    }

    @GetMapping("/customers/{id}")
    public CustomerDTO getCustomer(@PathVariable(name = "id") Long customerId ) throws CustomerNotFoundException {
        return bankAccountService.searchCustomerById(customerId);
    }

    @PostMapping("/customers")
    public CustomerDTO saveCustomer(@RequestBody CustomerDTO customerDTO) {
        return bankAccountService.saveCustomer(customerDTO);
    }

    @PutMapping ("/customers/{id}")
    public CustomerDTO updateCustomer(@PathVariable(name = "id") Long customerId, @RequestBody CustomerDTO customerDTO) {
        customerDTO.setId(customerId);
        return bankAccountService.updateCustomer(customerDTO);
    }

    @DeleteMapping("/customers/{id}")
    public void deleteCustomer(@PathVariable(name = "id") Long customerId) {
        bankAccountService.deleteCustomer(customerId);
    }
}
