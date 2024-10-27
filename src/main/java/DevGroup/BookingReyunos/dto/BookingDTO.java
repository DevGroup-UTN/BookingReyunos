package DevGroup.BookingReyunos.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;

@Data
public class BookingDTO {
    private BigDecimal dailyRate;
    private Integer id;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private BigDecimal totalPrice;
//    private Integer guestId; // Referencia al huésped (User)
//    private Integer accommodationId; // Referencia al alojamiento
}
