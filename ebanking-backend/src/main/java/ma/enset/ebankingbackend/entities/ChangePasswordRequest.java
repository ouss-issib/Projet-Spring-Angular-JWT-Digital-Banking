package ma.enset.ebankingbackend.entities;
import lombok.Data;

@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
}

