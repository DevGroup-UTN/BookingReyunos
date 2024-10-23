package DevGroup.BookingReyunos.service;

import DevGroup.BookingReyunos.dto.AccommodationDTO;
import DevGroup.BookingReyunos.exceptions.AccommodationNotFoundException;
import DevGroup.BookingReyunos.model.Accommodation;
import DevGroup.BookingReyunos.model.User;
import DevGroup.BookingReyunos.repository.AccommodationRepository;
import DevGroup.BookingReyunos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AccommodationService {

    @Autowired
    private AccommodationRepository accommodationRepository;

    @Autowired
    private UserRepository userRepository; // Necesitamos el UserRepository

    private AccommodationDTO convertToDTO(Accommodation accommodation) {
        AccommodationDTO dto = new AccommodationDTO();
        dto.setId(accommodation.getId());
        dto.setName(accommodation.getName());
        dto.setDescription(accommodation.getDescription());
        dto.setPricePerNight(accommodation.getPricePerNight());

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
}
