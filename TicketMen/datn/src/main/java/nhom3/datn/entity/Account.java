package nhom3.datn.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@SuppressWarnings("*")
@Data
@Entity
@Table(name = "Accounts")
public class Account implements Serializable{
    @Id
    String username;
    String password;
    String name;
    String email;
    String sdt;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    List<Authority> authorities;

    @JsonIgnore
    @OneToMany(mappedBy = "account")
    List<Order> orders;

}