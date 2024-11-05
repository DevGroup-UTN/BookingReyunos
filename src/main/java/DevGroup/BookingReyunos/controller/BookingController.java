package DevGroup.BookingReyunos.controller;
import DevGroup.BookingReyunos.dto.BookingDTO;
import DevGroup.BookingReyunos.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

                                            //MÉTODOS



    @PostMapping
    public ResponseEntity<BookingDTO> createBooking(@RequestBody BookingDTO bookingDTO) {
        BookingDTO newBooking = bookingService.createBooking(bookingDTO);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }
    @GetMapping("{id}")
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
    @PutMapping("{id}")
    public ResponseEntity<BookingDTO> updateBooking(@PathVariable Integer id, @RequestBody BookingDTO bookingDetailsDTO) { //Revisar
        Optional<BookingDTO> updateBooking = bookingService.updateBooking(id, bookingDetailsDTO);
        return updateBooking.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteBooking(@PathVariable Integer id){ //Revisar
        boolean isDeleted = bookingService.deleteBooking(id);
        if(isDeleted){
            return ResponseEntity.noContent().build();
        } else{
            return ResponseEntity.notFound().build();
        }

    }
}
