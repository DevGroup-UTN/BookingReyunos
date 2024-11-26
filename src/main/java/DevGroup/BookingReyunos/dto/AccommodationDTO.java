package DevGroup.BookingReyunos.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.util.List;

@Data
public class AccommodationDTO {
    private Integer id;
    private String name;
    private String description;
    private BigDecimal pricePerNight;
    private Integer ownerId;  // ID del propietario
    private List<Integer> bookingIds;  // IDs de las reservas asociadas
    private List<String> imageUrl; //List de urls
}
