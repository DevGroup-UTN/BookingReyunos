package DevGroup.BookingReyunos.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
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
    @PrePersist
    public void assignDefaultGuest() {
        if (this.guest == null) {
            User defaultGuest = new User();
            defaultGuest.setId(32); // Asignar el ID del usuario "Cerrado"
            this.guest = defaultGuest;
        }
    }

    @ManyToOne
    @JoinColumn(name = "accommodation_id", nullable = false)
    @JsonBackReference
    private Accommodation accommodation;
    @Column(name = "is_blocked", nullable = false)
    private boolean isBlocked = false; // Valor predeterminado en la entidad

    @PrePersist
    public void ensureDefaults() {
        if (isBlocked == false) {
            this.isBlocked = false; // Si no se asigna, asegúrate de que sea falso
        }
    }


}

