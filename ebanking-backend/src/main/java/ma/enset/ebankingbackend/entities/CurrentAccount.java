package ma.enset.ebankingbackend.entities;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Entity
@DiscriminatorValue("CA")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder

public class CurrentAccount extends BankAccount{
    private double overDraft;
}
