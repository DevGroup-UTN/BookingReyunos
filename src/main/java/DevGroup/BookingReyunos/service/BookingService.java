package DevGroup.BookingReyunos.service;

import DevGroup.BookingReyunos.dto.BookingDTO;
import DevGroup.BookingReyunos.exceptions.AccommodationNotFoundException;
import DevGroup.BookingReyunos.model.Booking;
import DevGroup.BookingReyunos.repository.BookingRepository;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.repository.UserRepository;
import DevGroup.BookingReyunos.model.Accommodation;
import DevGroup.BookingReyunos.repository.AccommodationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
        bookingDTO.setAccommodationId(booking.getAccommodation().getId());
        bookingDTO.setDailyRate(booking.getAccommodation().getPricePerNight());
        bookingDTO.setBlocked(booking.isBlocked());
        // Manejar guest
        if (booking.getGuest() != null) {
            bookingDTO.setGuestId(booking.getGuest().getId());
            bookingDTO.setGuestName(booking.getGuest().getUsername());
            bookingDTO.setGuestEmail(booking.getGuest().getEmail());
        }
        return bookingDTO;
    }


    // Método para convertir de BookingDTO a Booking (Entity)
    private Booking convertBookingToEntity(BookingDTO bookingDTO) {
        Booking bookingEntity = new Booking();
        bookingEntity.setId(bookingDTO.getId());
        bookingEntity.setCheckInDate(bookingDTO.getCheckInDate());
        bookingEntity.setCheckOutDate(bookingDTO.getCheckOutDate());
        bookingEntity.setBlocked(bookingDTO.isBlocked());

        // Manejar el caso del guest
        if (bookingDTO.getGuestId() != null) {
            // Si hay guestId, asignar un placeholder (se actualizará en el servicio si es válido)
            User guest = userRepository.findById(bookingDTO.getGuestId())
            .orElseThrow(() -> new AccommodationNotFoundException("Owner not found"));
            bookingEntity.setGuest(guest);
        } else if (bookingDTO.getGuestName() != null && bookingDTO.getGuestEmail() != null) {
            // Si no hay guestId, crear un usuario temporal
            User temporaryGuest = new User();
            temporaryGuest.setUsername(bookingDTO.getGuestName());
            temporaryGuest.setEmail(bookingDTO.getGuestEmail());
            bookingEntity.setGuest(temporaryGuest); // Usuario temporal
        }
        return bookingEntity;
    }


    // Método para calcular el precio total en base a los días y la tarifa diaria
    public BigDecimal calcultotalPrice(LocalDate checkIn, LocalDate checkout, BigDecimal dailyRate) {
        long days = ChronoUnit.DAYS.between(checkIn, checkout);
        return dailyRate.multiply(BigDecimal.valueOf(days));
    }

    // Método para crear una nueva reserva
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        Booking bookingEntity = convertBookingToEntity(bookingDTO);

        // Obtener el Accommodation correspondiente al booking
        Integer accommodationId = bookingDTO.getAccommodationId();
        Optional<Accommodation> accommodation = accommodationRepository.findById(accommodationId);
        if (accommodation.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Accommodation not found for the provided ID");
        }

        // Manejar el caso del guest
        User guest = null;
        if (bookingDTO.getGuestId() != null) {
            // Buscar el usuario en la base de datos
            guest = userRepository.findById(bookingDTO.getGuestId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found for the provided ID"));
        } else {
            // Validar que se hayan proporcionado guestName y guestEmail
            if (bookingDTO.getGuestName() == null || bookingDTO.getGuestEmail() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "GuestName and GuestEmail must be provided if GuestId is not present");
            }

            // Crear un objeto User temporal y guardarlo en la base de datos
            // Comprobar si ya existe un usuario con ese email
            guest = userRepository.findByEmail(bookingDTO.getGuestEmail())
            .orElseGet(() -> {
                // Crear un objeto User temporal
                User temporaryGuest = new User();
                temporaryGuest.setUsername(bookingDTO.getGuestName());
                temporaryGuest.setEmail(bookingDTO.getGuestEmail());
                
                // Generar una contraseña segura
                String securePassword = passwordEncoder.encode("temporaryPassword123"); // Usa un PasswordEncoder
                temporaryGuest.setPassword(securePassword);

                // Guardar el usuario temporal en la base de datos
                return userRepository.save(temporaryGuest);
            });
        }

        BigDecimal dailyRate = accommodation.get().getPricePerNight();

        // Calcular el precio total
        BigDecimal totalPrice = calcultotalPrice(bookingEntity.getCheckInDate(), bookingEntity.getCheckOutDate(), dailyRate);

        bookingEntity.setTotalPrice(totalPrice);
        bookingEntity.setGuest(guest);
        bookingEntity.setAccommodation(accommodation.get());

        // Guardar la reserva
        Booking savedBooking = bookingRepository.save(bookingEntity);
        // Enviar correo de confirmación
        String userEmail = guest.getEmail();
        String subject = "Confirmación de Reserva";
        String body = "Estimado usuario, su reserva ha sido confirmada con éxito.\n\n" +
                "Detalles de la reserva:\n" +
                "Alojamiento: " + accommodation.get().getName() + "\n" +
                "Fecha de entrada: " + bookingDTO.getCheckInDate() + "\n" +
                "Fecha de salida: " + bookingDTO.getCheckOutDate() + "\n" +
                "Precio total: " + totalPrice + "\n\n" +
                "Tenga en cuenta que su reserva *NO ES SEGURA*, ya que se priorizan las actividades educativas. En caso de cambios en su reserva se le comunicará.\n" +
                "Gracias por elegirnos.";

        emailService.sendEmail(userEmail, subject, body);
        return convertBookingToDTO(savedBooking);
    }

    // Método para buscar reservas por ID de alojamiento
    public List<BookingDTO> findBookingsByAccommodationId(Integer accommodationId) {
        List<Booking> bookings = bookingRepository.findByAccommodationId(accommodationId);
        return bookings.stream()
                .map(this::convertBookingToDTO)
                .collect(Collectors.toList());
    }
    public List<BookingDTO> findBookingsByGuestId(Integer guestId) {
        Optional<User> guest = userRepository.findById(guestId);
        List<Booking> bookings = bookingRepository.findByGuest(guest.get());
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

            // Manejar el caso del guest
            if (bookingDetailsDTO.getGuestId() != null) {
                // Buscar el usuario en la base de datos
                Optional<User> userGuest = userRepository.findById(bookingDetailsDTO.getGuestId());
                if (userGuest.isPresent()) {
                    existingBooking.setGuest(userGuest.get());
                } else {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Guest not found for the provided ID");
                }
            } else {
                // Validar que se hayan proporcionado guestName y guestEmail
                if (bookingDetailsDTO.getGuestName() == null || bookingDetailsDTO.getGuestEmail() == null) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "GuestName and GuestEmail must be provided if GuestId is not present");
                }

                // Crear un objeto User temporal
                User temporaryGuest = new User();
                temporaryGuest.setUsername(bookingDetailsDTO.getGuestName());
                temporaryGuest.setEmail(bookingDetailsDTO.getGuestEmail());
                existingBooking.setGuest(temporaryGuest); // No persiste, solo se usa para la reserva
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
    public List<Map<String, Object>> getAccommodationStats(LocalDate checkInDate, LocalDate checkOutDate) {
        List<Object[]> results = bookingRepository.findAccommodationStats(checkInDate, checkOutDate);
        return results.stream()
                .map(result -> Map.of(
                        "accommodationId", result[0], // ID del alojamiento
                        "name", result[1],            // Nombre del alojamiento
                        "count", result[2],           // Conteo de reservas
                        "bookingIds", result[3]       // IDs de reservas
                ))
                .collect(Collectors.toList());
    }

}