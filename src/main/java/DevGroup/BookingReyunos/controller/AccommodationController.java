package DevGroup.BookingReyunos.controller;

import DevGroup.BookingReyunos.dto.AccommodationDTO;
import DevGroup.BookingReyunos.service.AccommodationService;
import DevGroup.BookingReyunos.exceptions.AccommodationNotFoundException;
import DevGroup.BookingReyunos.service.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/accommodations")
public class AccommodationController {

    @Autowired
    private AccommodationService accommodationService;

    @Autowired
    private CloudinaryService cloudinaryService;


    // Obtener todos los alojamientos
    @GetMapping
    public ResponseEntity<List<AccommodationDTO>> getAllAccommodations() {
        List<AccommodationDTO> accommodations = accommodationService.findAll();
        return new ResponseEntity<>(accommodations, HttpStatus.OK);
    }

    // Obtener un alojamiento por su ID
    @GetMapping("/{id}")
    public ResponseEntity<AccommodationDTO> getAccommodationById(@PathVariable Integer id) {
        try {
            AccommodationDTO accommodation = accommodationService.findById(id);
            return new ResponseEntity<>(accommodation, HttpStatus.OK);
        } catch (AccommodationNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Obtener alojamientos por ID del propietario
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<AccommodationDTO>> getAccommodationsByOwnerId(@PathVariable Integer ownerId) {
        try {
            List<AccommodationDTO> accommodations = accommodationService.findByOwnerId(ownerId);
            return new ResponseEntity<>(accommodations, HttpStatus.OK);
        } catch (AccommodationNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Crear un nuevo alojamiento
    @PostMapping
    public ResponseEntity<AccommodationDTO> createAccommodation(@RequestBody AccommodationDTO accommodationDTO) {
        AccommodationDTO createdAccommodation = accommodationService.save(accommodationDTO);
        return new ResponseEntity<>(createdAccommodation, HttpStatus.CREATED);
    }

    // Actualizar un alojamiento existente
    @PutMapping("/{id}")
    public ResponseEntity<AccommodationDTO> updateAccommodation(@PathVariable Integer id, @RequestBody AccommodationDTO accommodationDTO) {
        try {
            AccommodationDTO updatedAccommodation = accommodationService.update(id, accommodationDTO);
            return new ResponseEntity<>(updatedAccommodation, HttpStatus.OK);
        } catch (AccommodationNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Eliminar un alojamiento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAccommodation(@PathVariable Integer id) {
        try {
            accommodationService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (AccommodationNotFoundException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //Imagenes
    // Subir imagen y asociarla a un alojamiento
    @PostMapping("/{id}/uploadImage")
    public ResponseEntity<String> uploadAccommodationImage(
            @PathVariable Integer id,
            @RequestParam("file") MultipartFile file) {
        try {
            // Subir la imagen a Cloudinary
            String imageUrl = cloudinaryService.uploadImage(file);

            // Asociar la URL de la imagen al alojamiento
            accommodationService.addImageToAccommodation(id,imageUrl);

            return new ResponseEntity<>("Image uploaded successfully. URL: " + imageUrl, HttpStatus.OK);
        } catch (IOException e) {
            return new ResponseEntity<>("Error uploading image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (AccommodationNotFoundException e) {
            return new ResponseEntity<>("Accommodation not found", HttpStatus.NOT_FOUND);
        }

    }

    @DeleteMapping("/{id}/deleteImage")
    public ResponseEntity<String> deleteAccommodationImage(
            @PathVariable Integer id,
            @RequestParam("imageUrl") String imageUrl) {
        try {
            // Eliminar la imagen del alojamiento
            accommodationService.removeImageFromAccommodation(id, imageUrl);

            //Eliminamos la imagen de cloudinary
            cloudinaryService.deleteImage(imageUrl);

            return new ResponseEntity<>("Image deleted successfully.", HttpStatus.OK);
        } catch (AccommodationNotFoundException e) {
            return new ResponseEntity<>("Accommodation not found", HttpStatus.NOT_FOUND);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (IOException e) {
            return new ResponseEntity<>("Error deleting image: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}