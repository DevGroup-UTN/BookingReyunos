package DevGroup.BookingReyunos.controller;

import DevGroup.BookingReyunos.service.EmailService;
import DevGroup.BookingReyunos.dto.EmailRequestDTO;
import org.springframework.web.bind.annotation.RestController;
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

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequestDTO emailRequestDTO) {
        try {
            emailService.sendEmail(emailRequestDTO.getTo(), emailRequestDTO.getSubject(), emailRequestDTO.getBody());
            return ResponseEntity.ok("Correo enviado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar el correo: " + e.getMessage());
        }
    }


}
