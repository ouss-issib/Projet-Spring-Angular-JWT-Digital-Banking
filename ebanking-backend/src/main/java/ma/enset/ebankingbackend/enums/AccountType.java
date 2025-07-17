package ma.enset.ebankingbackend.enums;

/**
 * @author $ {USER}
 **/
public enum AccountType {
    SAVING("SA"),
    CURRENT("CA");

    private final String type;

    AccountType(String type) {
        this.type = type;
    }

    public String getType() {
        return type;
    }
}

