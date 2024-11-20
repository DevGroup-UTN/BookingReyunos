package DevGroup.BookingReyunos.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.ToString;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "users")
public class User { 
// esta entidad representa a los usuarios del sistema, que pueden ser administradores, propietarios o huéspedes.
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String username;
    private String password;
    private String email;
    private String resetToken;

    @Enumerated(EnumType.STRING)
    private String role; // ADMIN, OWNER, GUEST.

    // Relaciones
    @OneToMany(mappedBy = "owner")
    @JsonManagedReference
    private List<Accommodation> accommodations;
    
    @OneToMany(mappedBy = "guest")
    @JsonManagedReference
    private List<Booking> bookings;
}