package DevGroup.BookingReyunos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import DevGroup.BookingReyunos.dto.UserDTO;
import DevGroup.BookingReyunos.repository.UserRepository;
import DevGroup.BookingReyunos.dto.ForgotPasswordRequest;
import DevGroup.BookingReyunos.dto.ResetPasswordRequest;
import DevGroup.BookingReyunos.dto.LoginDTO;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.security.JwtUtil;
import DevGroup.BookingReyunos.service.UserService;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;


    @Value("${jwt.secret}")
    private String secretKey;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil; // Inicialización en el constructor
    }

    // Registro de usuario
    @PostMapping("/register")
    public ResponseEntity<UserDTO> registerUser(@RequestBody UserDTO userDTO) {
        User user = userService.register(userDTO);
        return ResponseEntity.ok(new UserDTO(user));
    }

    // Inicio de sesión
    @PostMapping("/login")
    public ResponseEntity<LoginDTO> loginUser(@RequestBody LoginDTO loginDTO) {
        User user = userService.authenticate(loginDTO);

        // Generar el token JWT usando la clave secreta definida en application.properties
        String token = jwtUtil.generateToken(user);

        LoginDTO response = new LoginDTO(user.getId(),user.getUsername(), token, user.getRole());
        return ResponseEntity.ok(response);
    }
    
    // Consulta del perfil del usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserProfile(@PathVariable Integer id) {
        User user = userService.getUser(id);
        return ResponseEntity.ok(new UserDTO(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @RequestBody UserDTO userDTO) {
        Optional<User> updatedUser = userService.updateUser(id, userDTO);
        return updatedUser.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping("/bulk")
    public ResponseEntity<List<User>> getUsersByIds(@RequestBody List<Integer> guestIds) {
        List<User> users = userRepository.findAllById(guestIds);
        return ResponseEntity.ok(users);
    }


    // Solicitud de restablecimiento de contraseña
    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody ForgotPasswordRequest request) {
        userService.sendResetPasswordToken(request.getEmail());
        return ResponseEntity.ok("Correo de restablecimiento enviado.");
    }

    // Restablecimiento de contraseña usando el token
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody ResetPasswordRequest request) {
        userService.resetPassword(request.getToken(), request.getNewPassword());
        return ResponseEntity.ok("Contraseña restablecida exitosamente.");
    }
}
