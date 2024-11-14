package DevGroup.BookingReyunos.repository;

import DevGroup.BookingReyunos.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findByAccommodationId(Integer accommodationId);
}
