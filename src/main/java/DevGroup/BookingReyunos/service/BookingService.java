package DevGroup.BookingReyunos.service;

import DevGroup.BookingReyunos.dto.BookingDTO;
import DevGroup.BookingReyunos.model.Booking;
import DevGroup.BookingReyunos.repository.BookingRepository;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.repository.UserRepository;
import DevGroup.BookingReyunos.model.Accommodation;
import DevGroup.BookingReyunos.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private EmailService emailService;

    // Método para convertir de Booking (Entity) a BookingDTO
    private BookingDTO convertBookingToDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setGuestId(booking.getGuest().getId());
        bookingDTO.setAccommodationId(booking.getAccommodation().getId());
        bookingDTO.setDailyRate(booking.getAccommodation().getPricePerNight()); // Daily rate del alojamiento
        bookingDTO.setGuestEmail(booking.getGuestEmail());
        bookingDTO.setGuestName(booking.getGuestName());
        return bookingDTO;

    }

    // Método para convertir de BookingDTO a Booking (Entity)
    private Booking convertBookingToEntity(BookingDTO bookingDTO) {
        Booking bookingEntity = new Booking();
        bookingEntity.setId(bookingDTO.getId());
        bookingEntity.setCheckInDate(bookingDTO.getCheckInDate());
        bookingEntity.setCheckOutDate(bookingDTO.getCheckOutDate());
        return bookingEntity;
    }

    // Método para calcular el precio total en base a los días y la tarifa diaria
    public BigDecimal calcultotalPrice(LocalDate checkIn, LocalDate checkout, BigDecimal dailyRate) {
        long days = ChronoUnit.DAYS.between(checkIn, checkout);
        return dailyRate.multiply(BigDecimal.valueOf(days));
    }
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking bookingEntity = convertBookingToEntity(bookingDTO);

        //  Para validar y obt. el alojamiento
        Accommodation accommodation = accommodationRepository.findById(bookingDTO.getAccommodationId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Accommodation not found for the provided ID"));

        bookingEntity.setAccommodation(accommodation);

        // Manejar el guest
        if (bookingDTO.getGuestId() != null) {
            // Buscar el usuario por guestId
            User guest = userRepository.findById(bookingDTO.getGuestId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Guest not found for the provided ID"));
            bookingEntity.setGuest(guest);
        } else if (bookingDTO.getGuestName() != null && bookingDTO.getGuestEmail() != null) {
            // Usar datos del guest de forma manual para el owner
            bookingEntity.setGuestName(bookingDTO.getGuestName());
            bookingEntity.setGuestEmail(bookingDTO.getGuestEmail());
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Debe proporcionar un guestId o los datos del guest (nombre y email).");
        }

        // Calcular el precio total
        BigDecimal dailyRate = accommodation.getPricePerNight();
        BigDecimal totalPrice = calcultotalPrice(bookingEntity.getCheckInDate(), bookingEntity.getCheckOutDate(), dailyRate);
        bookingEntity.setTotalPrice(totalPrice);

        // Guardar la reserva
        Booking savedBooking = bookingRepository.save(bookingEntity);

        // Enviar correo de confirmación si un email del usuario
        if (bookingEntity.getGuest() != null) {
            String userEmail = bookingEntity.getGuest().getEmail();
            emailService.sendConfirmationEmail(accommodation, bookingEntity, userEmail, totalPrice);
        } else if (bookingEntity.getGuestEmail() != null) {
            emailService.sendConfirmationEmail(accommodation, bookingEntity, bookingEntity.getGuestEmail(), totalPrice);
        }

        return convertBookingToDTO(savedBooking);


    }

    // Método para buscar reservas por ID de alojamiento
    public List<BookingDTO> findBookingsByAccommodationId(Integer accommodationId) {
        List<Booking> bookings = bookingRepository.findByAccommodationId(accommodationId);
        return bookings.stream()
                .map(this::convertBookingToDTO)
                .collect(Collectors.toList());
    }

    // Método para buscar una reserva por ID
    public Optional<BookingDTO> findBookingById(Integer id) {
        return bookingRepository.findById(id).map(this::convertBookingToDTO);
    }

    // Método para obtener todas las reservas
    public List<BookingDTO> findAllBooking() {
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::convertBookingToDTO)
                .collect(Collectors.toList());
    }

    // Método para actualizar una reserva existente
    public Optional<BookingDTO> updateBooking(Integer id, BookingDTO bookingDetailsDTO) { 
        return bookingRepository.findById(id).map(existingBooking -> {
            existingBooking.setCheckInDate(bookingDetailsDTO.getCheckInDate());
            existingBooking.setCheckOutDate(bookingDetailsDTO.getCheckOutDate());
    
            // Obtener el usuario guest por guestId
            Integer guestId = bookingDetailsDTO.getGuestId();
            if (guestId != null) {
                Optional<User> userGuest = userRepository.findById(guestId);
                if (userGuest.isPresent()) {
                    existingBooking.setGuest(userGuest.get());
                } else {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Guest not found for the provided ID");
                }
            } else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Guest ID cannot be null");
            }
    
            // Obtener el Accommodation correspondiente
            Integer accommodationId = bookingDetailsDTO.getAccommodationId();
            Optional<Accommodation> accommodation = accommodationRepository.findById(accommodationId);
            if (accommodation.isEmpty()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Accommodation not found for the provided ID");
            }
    
            BigDecimal dailyRate = accommodation.get().getPricePerNight();
    
            // Calcular el precio total
            BigDecimal totalPrice = calcultotalPrice(
                    bookingDetailsDTO.getCheckInDate(),
                    bookingDetailsDTO.getCheckOutDate(),
                    dailyRate
            );
            existingBooking.setTotalPrice(totalPrice);
            existingBooking.setAccommodation(accommodation.get());
    
            Booking updatedBooking = bookingRepository.save(existingBooking);
            return convertBookingToDTO(updatedBooking);
        });
    }
    

    // Método para eliminar una reserva por ID
    public boolean deleteBooking(Integer id) {
        Optional<Booking> bookingOptional = bookingRepository.findById(id);

        if (bookingOptional.isPresent()) {
            Booking booking = bookingOptional.get();

            // Obtener el correo del usuario
            String userEmail = booking.getGuest().getEmail();

            // Eliminar la reserva
            bookingRepository.deleteById(id);

            // Enviar correo de cancelación usando el método en EmailService
            emailService.sendCancellationEmail(userEmail);

            return true;
        }

        return false;
    }

}
