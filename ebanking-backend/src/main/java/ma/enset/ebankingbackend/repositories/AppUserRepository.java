package ma.enset.ebankingbackend.repositories;

import ma.enset.ebankingbackend.entities.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author $ {USER}
 **/
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    AppUser findByUsername(String username);

}


