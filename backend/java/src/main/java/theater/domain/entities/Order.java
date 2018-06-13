package theater.domain.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import theater.domain.EntityBase;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_order")
//@TypeDef(name="myEnumConverter", typeClass=MyEnumConverter.class)
public class Order implements Serializable, EntityBase<Order> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(value = "code")
    public Long id;

    public Boolean confirmed;

    @Enumerated(EnumType.STRING)
    public Checkout checkout;

    @Column(name = "created_on", nullable = false)
    public Timestamp createdOn;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "session", nullable = false)
    public Session session;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "client", nullable = false)
    public Client client;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JoinColumn(name = "order")
    public List<Seat> seats = new ArrayList<>();

    private Order() {
        this.createdOn = new Timestamp(System.currentTimeMillis());
    }

    public Order(Session session, Client client, Checkout checkout) {
        this();
        this.session = session;
        this.client = client;
        this.checkout = checkout;
    }

    @Override
    public void print() {
        System.out.println("Order (" + id + "). Created on " + createdOn
                + ". Checkout: " + checkout + ". Confirmed: " + confirmed);
        client.print();
        session.print();
    }

    @Override
    public boolean equals(Order another) {
        var confirmedEqual = false;
        if (confirmed == null) {
            confirmedEqual = another.confirmed == null;
        } else {
            confirmedEqual = confirmed.equals(another.confirmed);
        }

        return confirmedEqual && checkout.equals(another.checkout)
                && createdOn.equals(another.createdOn) && session.equals(another.session)
                && client.equals(another.client);
    }

    public static enum Checkout {
        DELIVERY, SELF_CHECKOUT, PAY_BEFORE
    }

    @Entity
    @Table(name = "t_order_seat")
    public static class Seat implements Serializable {
        @Id
        public int row;
        @Id
        public int seat;

        @Override
        public String toString() {
            return "Row " + this.row + ". Seat " + this.seat;
        }
    }
}
