package DevGroup.BookingReyunos.controller;

import jakarta.mail.Multipart;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Value("${upload.directory}")
    private String uploadDirectory;

    //Subir un imagen
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file")MultipartFile file){
        try{
            if(file.isEmpty()){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("El archivo está vacío");

            }
            //Crear el directorio si no existe
            File directory = new File(uploadDirectory);
            if (!directory.exists()){
                directory.mkdirs();
            }
            //Guardar el archivo
            String fileName = file.getOriginalFilename();
            Path filePath = Paths.get(uploadDirectory,fileName);
            Files.write(filePath, file.getBytes());

            return ResponseEntity.ok("Se ha subido el archivo correctamente: " + fileName);
        } catch (IOException e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al subir la imagen");

        }
    }

    //Obtener la imagen por nombre
    @GetMapping("/{fileName}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileName) {
        try {
            Path filePath = Paths.get(uploadDirectory, fileName);
            byte[] imageBytes = Files.readAllBytes(filePath);

            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
                    .body(imageBytes);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
