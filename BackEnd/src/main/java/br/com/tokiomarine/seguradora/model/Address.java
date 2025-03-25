package br.com.tokiomarine.seguradora.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name = "addresses")
@Data
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_client", updatable = false)
    @JsonBackReference
    private Client client;

    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private String number;

    private String complement;

    @Column(name = "postal_code")
    private String postalCode;

    private String city;
    private String state;
    private String country;

}
