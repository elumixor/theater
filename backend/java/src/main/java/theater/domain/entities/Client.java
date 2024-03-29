package theater.domain.entities;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "t_client")
@JsonPropertyOrder({"contact", "name"})
public class Client extends EntityBase<Client> implements Serializable {
    //region Fields
    @Column(unique = true, nullable = false)
    public String contact;

    public String name;
    //endregion

    //region Constructors
    public Client() {
    }

    @JsonCreator
    public Client(@JsonProperty("contact") String contact, @JsonProperty("name") String name) {
        this.contact = contact;
        this.name = name;
    }
    //endregion

    //region Implementation
    @Override
    public void print() {
        System.out.println("Client " + name + " (" + contact + ")");
    }

    @Override
    public boolean equalz(Client another) {
        return contact.equals(another.contact) && name.equals(another.name);
    }

    @Override
    public void update(Client another) {
        contact = another.contact;
        name = another.name;
    }

    @Override
    public String stringValue() {
        return fieldsToString(name, contact);
    }
    //endregion
}
