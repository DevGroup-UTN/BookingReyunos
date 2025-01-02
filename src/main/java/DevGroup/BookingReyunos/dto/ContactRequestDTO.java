package DevGroup.BookingReyunos.dto;

import lombok.Data;

@Data
public class ContactRequestDTO {
    private String firstName;
    private String lastName;
    private String email1;
    private String email2;
    private String phone;
    private String country;
    private String state;
    private String query;
}
