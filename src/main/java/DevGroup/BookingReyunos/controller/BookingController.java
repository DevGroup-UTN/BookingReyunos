package DevGroup.BookingReyunos.controller;

import DevGroup.BookingReyunos.dto.BookingDTO;
import DevGroup.BookingReyunos.dto.CloseDatesRequest;
import DevGroup.BookingReyunos.security.JwtUtil;
import DevGroup.BookingReyunos.service.AccommodationService;
import DevGroup.BookingReyunos.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
public class BookingController {

    private final BookingService bookingService;
    private final JwtUtil jwtUtil;

    @Value("${jwt.secret}")
    private String secretKey;

    @Autowired
    private AccommodationService accommodationService;

    public BookingController(BookingService bookingService, JwtUtil jwtUtil) {
        this.bookingService = bookingService;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO newBooking = bookingService.createBooking(bookingDTO);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }
    @GetMapping("/{id}")
    public ResponseEntity<BookingDTO> findBookingById(@PathVariable Integer id) {
        Optional<BookingDTO> booking = bookingService.findBookingById(id);
        return booking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    @GetMapping
    public ResponseEntity<List<BookingDTO>> findAllBooking(){
        List<BookingDTO> bookings = bookingService.findAllBooking();
        return ResponseEntity.ok(bookings);
    }
    @GetMapping("/accommodation/{accommodationId}")
    public ResponseEntity<List<BookingDTO>> findBookingsByAccommodationId(@PathVariable Integer accommodationId) {
        List<BookingDTO> bookings = bookingService.findBookingsByAccommodationId(accommodationId);
        return ResponseEntity.ok(bookings);
    }
    @GetMapping("/guest/{guestId}")
    public ResponseEntity<List<BookingDTO>> findBookingsByGuestId(@PathVariable Integer guestId){
        List<BookingDTO> bookings = bookingService.findBookingsByGuestId(guestId);
        return ResponseEntity.ok(bookings);
    }
    @PutMapping("/{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Integer id, @RequestBody BookingDTO bookingDetailsDTO) {
        Optional<BookingDTO> updateBooking = bookingService.updateBooking(id, bookingDetailsDTO);
        return updateBooking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Integer id){
        boolean isDeleted = bookingService.deleteBooking(id);
        if(isDeleted){
            return ResponseEntity.noContent().build();
        } else{
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/close-dates")
    public ResponseEntity<String> closeDates(@RequestBody CloseDatesRequest request) {
        try {
            accommodationService.closeDates(request); // Llama al servicio para cerrar las fechas
            return ResponseEntity.ok("Fechas cerradas exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al cerrar las fechas: " + e.getMessage());
        }
    }
    @PostMapping("/open-dates")
    public ResponseEntity<String> openDates(@RequestBody CloseDatesRequest request) {
        try {
            accommodationService.openDates(request);
            return ResponseEntity.ok("Fechas abiertas exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al abrir las fechas: " + e.getMessage());
        }
    }
}
