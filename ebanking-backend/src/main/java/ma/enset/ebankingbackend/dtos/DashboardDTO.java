package ma.enset.ebankingbackend.dtos;

import lombok.Data;

/**
 * @author $ {USER}
 **/
@Data
public class DashboardDTO {
    private int totalCustomers;
    private int totalAccounts;
    private double totalBalance;
}
