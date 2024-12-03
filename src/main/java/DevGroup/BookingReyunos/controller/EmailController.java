package DevGroup.BookingReyunos.controller;

import DevGroup.BookingReyunos.service.EmailService;
import DevGroup.BookingReyunos.dto.EmailRequestDTO;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.repository.UserRepository;

import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/email")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequestDTO emailRequestDTO) {
        try {
            // Buscar el usuario por ID
            Optional<User> optionalUser = userRepository.findById(emailRequestDTO.getTo());
            if (optionalUser.isEmpty()) {
                return ResponseEntity.status(404).body("Usuario no encontrado.");
            }

            User user = optionalUser.get();

            // Enviar correo usando el servicio de correo
            emailService.sendEmail(user.getEmail(), emailRequestDTO.getSubject(), emailRequestDTO.getBody());
            return ResponseEntity.ok("Correo enviado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar el correo: " + e.getMessage());
        }
    }
main
}
