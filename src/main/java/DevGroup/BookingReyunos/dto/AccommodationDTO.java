package DevGroup.BookingReyunos.dto;

import lombok.Data;
import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor

public class AccommodationDTO {
    private Integer id;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    private BigDecimal pricePerNight;
    private Integer ownerId; // Referencia al propietario


}
