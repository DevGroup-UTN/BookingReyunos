package DevGroup.BookingReyunos.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonBackReference;

import DevGroup.BookingReyunos.repository.BookingRepository;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data

@Entity
public class Booking { // Esta clase entidad representa una reserva hecha por un usuario para un alojamiento específico.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "guest_id", nullable = false)
    @JsonBackReference
    private User guest;

    @ManyToOne
    @JoinColumn(name = "accommodation_id", nullable = false)
    @JsonBackReference
    private Accommodation accommodation;
    private boolean isBlocked;


}

