package DevGroup.BookingReyunos.service;

import DevGroup.BookingReyunos.dto.AccommodationDTO;
import DevGroup.BookingReyunos.exceptions.AccommodationNotFoundException;
import DevGroup.BookingReyunos.model.Accommodation;
import DevGroup.BookingReyunos.model.Booking;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.repository.AccommodationRepository;
import DevGroup.BookingReyunos.repository.BookingRepository;
import DevGroup.BookingReyunos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    @Autowired
    private UserRepository userRepository; // Necesitamos el UserRepository

    private AccommodationDTO convertToDTO(Accommodation accommodation) {
        AccommodationDTO dto = new AccommodationDTO();
        dto.setId(accommodation.getId());
        dto.setName(accommodation.getName());
        dto.setDescription(accommodation.getDescription());
        dto.setPricePerNight(accommodation.getPricePerNight());
        dto.setImageUrl(accommodation.getImageUrl());

        if (accommodation.getOwner() != null) {
            dto.setOwnerId(accommodation.getOwner().getId()); // Asignamos el ID del propietario
        }

        return dto;
    }

    private Accommodation convertToEntity(AccommodationDTO dto) {
        Accommodation accommodation = new Accommodation();
        accommodation.setId(dto.getId());
        accommodation.setName(dto.getName());
        accommodation.setDescription(dto.getDescription());
        accommodation.setPricePerNight(dto.getPricePerNight());
        accommodation.setImageUrl(dto.getImageUrl());

        // Buscamos al propietario usando el ID proporcionado en el DTO
        User owner = userRepository.findById(dto.getOwnerId())
            .orElseThrow(() -> new AccommodationNotFoundException("Owner not found"));
        accommodation.setOwner(owner);

        return accommodation;
    }

    public List<AccommodationDTO> findAll() {
        List<Accommodation> accommodations = accommodationRepository.findAll();
        return accommodations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AccommodationDTO findById(Integer id) {
        Optional<Accommodation> accommodation = accommodationRepository.findById(id);
        return accommodation.map(this::convertToDTO)
                .orElseThrow(() -> new AccommodationNotFoundException("Accommodation not found"));
    }

    public List<AccommodationDTO> findByOwnerId(Integer ownerId) {
        List<Accommodation> accommodations = accommodationRepository.findByOwner_Id(ownerId);
        if (accommodations.isEmpty()) {
            throw new AccommodationNotFoundException("No accommodations found for owner ID: " + ownerId);
        }
        return accommodations.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public AccommodationDTO save(AccommodationDTO accommodationDTO) {
        Accommodation accommodation = convertToEntity(accommodationDTO);
        Accommodation savedAccommodation = accommodationRepository.save(accommodation);
        return convertToDTO(savedAccommodation);
    }

    public AccommodationDTO update(Integer id, AccommodationDTO accommodationDTO) {
        if (!accommodationRepository.existsById(id)) {
            throw new AccommodationNotFoundException("Accommodation not found");
        }
        Accommodation accommodation = convertToEntity(accommodationDTO);
        accommodation.setId(id);
        Accommodation updatedAccommodation = accommodationRepository.save(accommodation);
        return convertToDTO(updatedAccommodation);
    }

    public void delete(Integer id) {
        if (!accommodationRepository.existsById(id)) {
            throw new AccommodationNotFoundException("Accommodation not found");
        }
        accommodationRepository.deleteById(id);
    }

    public void addImageToAccommodation(Integer id, String imageUrl) {
        // Buscar el alojamiento por ID
        Accommodation accommodation = accommodationRepository.findById(id)
                .orElseThrow(() -> new AccommodationNotFoundException("Alojamiento no encontrado con ID: " + id));

        // Actualizar la URL de la imagen
        accommodation.setImageUrl(imageUrl);

        // Guardar el alojamiento actualizado
        accommodationRepository.save(accommodation);
    }

    public void closeDates(Integer accommodationId, LocalDate startDate, LocalDate endDate) {
        // Validación de fechas
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin.");
        }

        // Crear y guardar bloqueos de fechas
        LocalDate currentDate = startDate;
        while (!currentDate.isAfter(endDate)) {
            Booking booking = new Booking();
            booking.setCheckInDate(currentDate);
            booking.setCheckOutDate(currentDate); // Puedes ajustar esto según tus necesidades
            booking.setBlocked(true); // Supongamos que tienes un flag para indicar fechas bloqueadas
            bookingRepository.save(booking);
            currentDate = currentDate.plusDays(1); // Avanza un día
        }
    }
    public void openDates(Integer accommodationId, LocalDate startDate, LocalDate endDate){
        // Validación de fechas
        if (startDate.isAfter(endDate)) {
            throw new IllegalArgumentException("La fecha de inicio no puede ser posterior a la fecha de fin.");
        }
        
            bookingRepository.deleteByAccommodationIdAndBlockedDates(accommodationId, startDate, endDate);
    }
}
