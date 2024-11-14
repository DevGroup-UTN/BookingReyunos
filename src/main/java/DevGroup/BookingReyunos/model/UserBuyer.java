package DevGroup.BookingReyunos.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserBuyer {
    private String title;
    private int quantity;
    private BigDecimal unit_price;
}
