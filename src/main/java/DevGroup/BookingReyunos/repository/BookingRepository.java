package DevGroup.BookingReyunos.repository;

import DevGroup.BookingReyunos.model.Booking;
import DevGroup.BookingReyunos.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking,Integer> {
    List<Booking> findByAccommodationId(Integer accommodationId);
    List<Booking> findByGuest(User guest);
    @Transactional
    @Modifying
    @Query("DELETE FROM Booking b WHERE b.accommodation.id = :accommodationId " +
           "AND b.checkInDate >= :startDate AND b.checkOutDate <= :endDate " +
           "AND b.isBlocked = true")
    void deleteByAccommodationIdAndBlockedDates(Integer accommodationId, LocalDate startDate, LocalDate endDate);
    
    @Query("SELECT b FROM Booking b WHERE b.accommodation.id = :accommodationId AND :date BETWEEN b.checkInDate AND b.checkOutDate")
    List<Booking> findByAccommodationIdAndDate(@Param("accommodationId") Integer accommodationId, @Param("date") LocalDate date);
    
    @Query(value = "SELECT b.accommodation_name AS name, COUNT(b.id) AS count, STRING_AGG(b.id::text, ',') AS bookingIds " +
    "FROM bookings b " +
    "WHERE b.check_in_date >= :checkInDate AND b.check_out_date <= :checkOutDate " +
    "GROUP BY b.accommodation_name " +
    "ORDER BY count DESC", 
    nativeQuery = true)
    List<Object[]> findAccommodationStats(@Param("checkInDate") LocalDate checkInDate, @Param("checkOutDate") LocalDate checkOutDate);

}
