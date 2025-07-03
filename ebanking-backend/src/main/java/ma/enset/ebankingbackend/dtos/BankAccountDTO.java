package ma.enset.ebankingbackend.dtos;

import com.fasterxml.jackson.annotation.JsonSubTypes;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import lombok.Data;
@JsonTypeInfo(
        use = JsonTypeInfo.Id.NAME,
        include = JsonTypeInfo.As.PROPERTY,
        property = "type"
)
@JsonSubTypes({
        @JsonSubTypes.Type(value = SavingBankAccountDTO.class, name = "SavingAccount"),
        @JsonSubTypes.Type(value = CurrentBankAccountDTO.class, name = "CurrentAccount")
})
@Data
public class BankAccountDTO {
    // ✅ Required to avoid 'Cannot resolve method setId'
    private String id;
    private String type;
}
