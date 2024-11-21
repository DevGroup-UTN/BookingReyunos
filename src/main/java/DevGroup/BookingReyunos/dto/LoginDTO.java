package DevGroup.BookingReyunos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    private Integer id;
    private String username;
    private String email;
    private String password;
    private String phone;
    private String token;
    private String role;

    public LoginDTO(Integer id, String username, String email, String token, String role, String phone){
        this.id = id;
        this.username = username;
        this.email = email;
        this.token = token;
        this.role = role;
        this.phone = phone;
    }
}
