package DevGroup.BookingReyunos.repository;

import DevGroup.BookingReyunos.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findByAccommodationId(Integer accommodationId);
    @Transactional
    @Modifying
    @Query("DELETE FROM Booking b WHERE b.accommodationId = :accommodationId " +
           "AND b.checkInDate >= :startDate AND b.checkOutDate <= :endDate " +
           "AND b.isBlocked = true")
    void deleteByAccommodationIdAndBlockedDates(Integer accommodationId, LocalDate startDate, LocalDate endDate);
}
