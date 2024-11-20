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
    private String password;
    private String token;
    private String role;

    public LoginDTO(Integer id, String username, String token, String role){
        this.id = id;
        this.username = username;
        this.token = token;
        this.role = role;
    }
}
