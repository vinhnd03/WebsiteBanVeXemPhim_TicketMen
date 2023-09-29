package nhom3.datn.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@SuppressWarnings("*")
@Data
@Entity
@Table(name = "TicketTypes")
public class TicketType implements Serializable{
    @Id
    String id;

    String name;
    Double price;

    @JsonIgnore
    @OneToMany(mappedBy = "ticketType")
    List<Ticket> tickets;
}