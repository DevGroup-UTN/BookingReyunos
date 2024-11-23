package DevGroup.BookingReyunos.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;


@Service
public class CloudinaryService {
        private final Cloudinary cloudinary;

        @Autowired
        public CloudinaryService() {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", "dw3vcl4qu", // Reemplaza con tu cloud_name
                    "api_key", "513319616343576",       // Reemplaza con tu API key
                    "api_secret", "MQ73eIdnLR__soT5xxoBUVSqDXM" // Reemplaza con tu API secret
            ));
        }

        public String uploadImage(MultipartFile file) throws IOException {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            return uploadResult.get("url").toString(); // Devuelve la URL pública
        }
    }
