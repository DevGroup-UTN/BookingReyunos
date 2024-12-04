package DevGroup.BookingReyunos.service;

import DevGroup.BookingReyunos.model.Accommodation;
import DevGroup.BookingReyunos.model.Booking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;
    private EmailService emailService;


    public void sendConfirmationEmail(Accommodation accommodation, Booking booking, String email, BigDecimal totalPrice) {
        String subject = "Confirmación de Reserva";
        String body = "Estimado usuario, su reserva ha sido confirmada con éxito.\n\n" +
                "Detalles de la reserva:\n" +
                "Alojamiento: " + accommodation.getName() + "\n" +
                "Fecha de entrada: " + booking.getCheckInDate() + "\n" +
                "Fecha de salida: " + booking.getCheckOutDate() + "\n" +
                "Precio total: " + totalPrice + "\n\n" +
                "Gracias por elegirnos.";

        emailService.sendEmail(email, subject, body);
    }
    public void sendEmail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
    public void sendCancellationEmail(String to){
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Cancelación de la Reserva");
        message.setText("Su reserva ha sido cancelada con éxito.");
        mailSender.send(message);
    }

}
