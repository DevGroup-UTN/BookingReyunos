package DevGroup.BookingReyunos.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class BookingDTO {
    private BigDecimal dailyRate; 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkInDate;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate checkOutDate;
    private BigDecimal totalPrice;
    private Integer guestId; // Referencia al huésped (User)
    private Integer accommodationId; // Referencia al alojamiento
    private boolean isBlocked;
}
