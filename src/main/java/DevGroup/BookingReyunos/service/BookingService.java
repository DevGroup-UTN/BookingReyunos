package DevGroup.BookingReyunos.service;

import DevGroup.BookingReyunos.dto.BookingDTO;
import DevGroup.BookingReyunos.model.Booking;
import DevGroup.BookingReyunos.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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



    private BookingDTO convertBookingToDTO(Booking booking){
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setTotalPrice(booking.getTotalPrice());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        return bookingDTO;
    }

    private Booking convertBookingToEntity(BookingDTO bookingDTO){
        Booking bookingEntity = new Booking();
        bookingEntity.setId(bookingDTO.getId());
        bookingEntity.setTotalPrice(bookingDTO.getTotalPrice());
        bookingEntity.setCheckOutDate(bookingDTO.getCheckOutDate());
        bookingEntity.setCheckInDate(bookingDTO.getCheckInDate());
        return bookingEntity;
    }


    //Método para calcular el precio en base a los días y la tarifa existente
    public BigDecimal calcultotalPrice(LocalDate checkIn, LocalDate checkout, BigDecimal dailyRate){
        long days = ChronoUnit.DAYS.between(checkIn,checkout);
        return dailyRate.multiply(BigDecimal.valueOf(days));
    }


    public BookingDTO createBooking(BookingDTO bookingDTO) {
        // Convertimos de DTO a Entity
        Booking bookingEntity = convertBookingToEntity(bookingDTO);

        // tarifa diaria
        BigDecimal dailyRate = bookingDTO.getDailyRate();

        // Calcular el precio total
        BigDecimal totalPrice = calcultotalPrice(bookingEntity.getCheckInDate(), bookingEntity.getCheckOutDate(), dailyRate);

        //guardar el precio total en entidad Booking
        bookingEntity.setTotalPrice(totalPrice);

        // Guardar la reserva
        Booking savedBooking = bookingRepository.save(bookingEntity);

        // Convertimos de Entity a DTO y devolvemos
        return convertBookingToDTO(savedBooking);
    }


    //Método para buscar reserva por ID
    public Optional<BookingDTO> findBookingById(Integer id){
        return bookingRepository.findById(id).map(this::convertBookingToDTO);
    }

    public List<BookingDTO> findAllBooking(){
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(this::convertBookingToDTO)
                .collect(Collectors.toList());
    }

    public Optional<BookingDTO> updateBooking(Integer id, BookingDTO bookingDetailsDTO) {
        return bookingRepository.findById(id).map(existingBooking -> {
            // Convertir DTO a Entity para actualizar los detalles de la reserva
            existingBooking.setCheckInDate(bookingDetailsDTO.getCheckInDate());
            existingBooking.setCheckOutDate(bookingDetailsDTO.getCheckOutDate());

            // Calcular el precio total utilizando dailyRate desde el DTO
            BigDecimal totalPrice = calcultotalPrice(
                    bookingDetailsDTO.getCheckInDate(),
                    bookingDetailsDTO.getCheckOutDate(),
                    bookingDetailsDTO.getDailyRate()
            );
            existingBooking.setTotalPrice(totalPrice);

            // Guardar la reserva actualizada
            Booking updatedBooking = bookingRepository.save(existingBooking);

            // Convertir la reserva actualizada a DTO y retornamos
            return convertBookingToDTO(updatedBooking);
        });
    }
    //Elimina una reserva desde la base de datos, devuelve un true si la reserva fue encontrada
    // y eliminado, o false si no la encontró
    public boolean deleteBooking(Integer id) {
            if (bookingRepository.existsById(id)) {
                bookingRepository.deleteById(id);
                return true;
            }
            return false;
    }

}
