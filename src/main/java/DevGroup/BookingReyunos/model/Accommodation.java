package DevGroup.BookingReyunos.model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Accommodation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String description;
    private BigDecimal pricePerNight;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonBackReference
    private User owner;

    @OneToMany(mappedBy = "accommodation")
    @JsonManagedReference
    private List<Booking> bookings;

    //Ruta de las imagenes
    private String imagePath;

    private String imageUrl; //URL de la imagen guardada de forma remota en la bd

}
