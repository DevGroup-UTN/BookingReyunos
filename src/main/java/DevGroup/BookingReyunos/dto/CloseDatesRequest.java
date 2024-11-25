package DevGroup.BookingReyunos.dto;

import java.time.LocalDate;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CloseDatesRequest {

    private Integer accommodationId;
    private LocalDate startDate;
    private LocalDate endDate;

}