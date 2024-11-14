package DevGroup.BookingReyunos.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

import DevGroup.BookingReyunos.model.Accommodation;

@Repository
public interface AccommodationRepository extends JpaRepository<Accommodation, Integer> {
    List<Accommodation> findByOwner_Id(Integer ownerId); // Uso de "owner.id" para la consulta
}