package ma.enset.ebankingbackend.dtos;


import lombok.Data;
import ma.enset.ebankingbackend.enums.AccountStatus;

import java.util.Date;


@Data
public class CurrentBankAccountDTO {
    private String id;
    private Date createdAt;
    private double balance;
    private AccountStatus status;
    private String currency;
    private CustomerDTO customerDTO;
    private double overDraft;
}
