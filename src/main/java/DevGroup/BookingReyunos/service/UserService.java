package DevGroup.BookingReyunos.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import DevGroup.BookingReyunos.dto.LoginDTO;
import DevGroup.BookingReyunos.dto.UserDTO;
import DevGroup.BookingReyunos.dto.UserRoleDTO;
import DevGroup.BookingReyunos.exceptions.InvalidCredentialsException;
import DevGroup.BookingReyunos.exceptions.UserNotFoundException;
import DevGroup.BookingReyunos.model.Role;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.repository.UserRepository;


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${jwt.secret}")
    private String secretKeyString;

    @Autowired
    private JavaMailSender emailSender; // Para enviar correos

    public void assignRole(UserRoleDTO userRoleDTO) {
        String username = userRoleDTO.getUsername();
        if (username == null || username.isEmpty()) {
            throw new RuntimeException("Username must not be null or empty");
        }

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        try {
            Role role = Role.valueOf(userRoleDTO.getRole());
            user.setRole(role);
            userRepository.save(user);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role specified: " + userRoleDTO.getRole());
        }
    }

    // Método para registrar un nuevo usuario
    public User register(UserDTO userDTO) {
        // Verificar si el username ya está en uso
        if (userRepository.existsByUsername(userDTO.getUsername())) {
            throw new RuntimeException("Username already in use");
        }

        // Crear nuevo usuario a partir del DTO
        UserRoleDTO userRoleDTO = new UserRoleDTO();
        userRoleDTO.setRole("GUEST");
        User user = new User();
        user.setUsername(userDTO.getUsername().toLowerCase());
        user.setEmail(userDTO.getEmail());
        user.setRole(userDTO.getRole());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword())); // Cifrar la contraseña

        // Guardar el usuario en la base de datos
        return userRepository.save(user);
    }

    // Método para autenticar a un usuario y generar un token JWT
    public User authenticate(LoginDTO loginDTO) {
        // Buscar el usuario por su nombre de usuario
        User user = userRepository.findByUsername(loginDTO.getUsername().toLowerCase())
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    
        // Verificar la contraseña
        if (!passwordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid credentials");
        }
        return user; // Retornar el usuario encontrado
    }   
    

    // Método para obtener un usuario por su ID
    public User getUser(Integer id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException("User not found"));
    }

    // Enviar token de restablecimiento de contraseña
    public void sendResetPasswordToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("No se encontró un usuario con ese correo."));

        // Generar un token único para el restablecimiento de contraseña
        String token = UUID.randomUUID().toString();
        user.setResetToken(token); // Asegúrate de tener este campo en tu modelo User
        userRepository.save(user);

        // Enviar el correo con el token
        String resetLink = "http://localhost:3001/reset-password?token=" + token; // Cambia la URL según sea necesario
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Restablecer contraseña");
        message.setText("Para restablecer su contraseña, haga clic en el siguiente enlace: " + resetLink);
        emailSender.send(message);
        
        System.out.println("Token enviado a: " + email);
    }

    public Optional<User> updateUser(Integer id, UserDTO userDTO) {
        return userRepository.findById(id).map(existingUser -> {
            // Actualizar campos solo si no están nulos en el UserDTO
            if (userDTO.getUsername() != null) {
                existingUser.setUsername(userDTO.getUsername());
            }
            if (userDTO.getEmail() != null) {
                existingUser.setEmail(userDTO.getEmail());
            }
            if (userDTO.getRole() != null) {
                existingUser.setRole(userDTO.getRole());
            }
            
            return userRepository.save(existingUser);
        });
    }


    // Restablecer contraseña usando el token
    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Token inválido o expirado."));

        // Actualiza la contraseña
        user.setPassword(passwordEncoder.encode(newPassword));
        user.setResetToken(null); // Limpiar el token
        userRepository.save(user);
        
        System.out.println("Contraseña actualizada con éxito.");
    }
}
