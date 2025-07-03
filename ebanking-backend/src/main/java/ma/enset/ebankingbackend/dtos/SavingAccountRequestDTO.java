package ma.enset.ebankingbackend.dtos;

import lombok.Data;

@Data
public class SavingAccountRequestDTO {
    private double initialBalance;
    private double interestRate;
    private Long customerId;
}
