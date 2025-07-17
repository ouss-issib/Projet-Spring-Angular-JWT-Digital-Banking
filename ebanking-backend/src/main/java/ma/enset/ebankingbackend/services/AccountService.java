package ma.enset.ebankingbackend.services;

import ma.enset.ebankingbackend.entities.AppRole;
import ma.enset.ebankingbackend.entities.AppUser;

import java.util.List;

/**
 * @author $ {USER}
 **/
public interface AccountService {
    AppUser addUser(AppUser user);
    AppRole addRole(AppRole role);
    void addRoleToUser(String username, String roleName);
    AppUser getUser(String username);
    List<AppUser> listUsers();
}
