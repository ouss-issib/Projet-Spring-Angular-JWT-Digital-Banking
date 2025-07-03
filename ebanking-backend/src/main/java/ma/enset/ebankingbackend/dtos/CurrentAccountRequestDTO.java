package ma.enset.ebankingbackend.dtos;

import lombok.Data;

@Data
public class CurrentAccountRequestDTO {
    private double initialBalance;
    private double overDraft;
    private Long customerId;
}
