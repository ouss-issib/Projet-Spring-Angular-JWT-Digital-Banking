package ma.enset.ebankingbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author $ {USER}
 **/
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class AppRole {
    @Id
    private String roleName;
}
