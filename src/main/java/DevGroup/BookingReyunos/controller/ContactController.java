package DevGroup.BookingReyunos.controller;

import DevGroup.BookingReyunos.dto.ContactRequestDTO;
import DevGroup.BookingReyunos.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/contact")
public class ContactController {
    @Autowired
    private EmailService emailService; // Inyectamos el servicio para enviar correos

    @PostMapping("/send")
    public ResponseEntity<String> sendContactMessage(@RequestBody ContactRequestDTO contactRequest){
        try{
            //MENSAJE DEL CORREO
            String subject = "Nueva consulta de contacto";
            String body = String.format(
                    "Nueva consulta recibida:\n\nNombre: %s %s\nEmail: %s\nTeléfono: %s\nPaís: %s\nProvincia: %s\nConsulta: %s",
                    contactRequest.getFirstName(),
                    contactRequest.getLastName(),
                    contactRequest.getEmail1(),
                    contactRequest.getPhone(),
                    contactRequest.getCountry(),
                    contactRequest.getState(),
                    contactRequest.getQuery()
            );

            // Enviar el correo
            emailService.sendEmail("angelovellar24@gmail.com", subject, body);

            return ResponseEntity.ok("Mensaje enviado con éxito.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al enviar el mensaje: " + e.getMessage());
        }
        }
    }
