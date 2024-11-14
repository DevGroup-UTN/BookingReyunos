package DevGroup.BookingReyunos.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import DevGroup.BookingReyunos.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByUsername(String username);
    boolean existsByUsername(String username);// Se verifica si existe un usuario con el nombre de usuario dado
    // Método para buscar un usuario por correo electrónico
    Optional<User> findByEmail(String email);

    // Método para buscar un usuario por el token de restablecimiento
    Optional<User> findByResetToken(String resetToken);
}
