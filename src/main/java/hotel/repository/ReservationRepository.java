package hotel.repository;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import hotel.model.Reservation;
import hotel.model.Room;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation,Integer>{
	
	@Query("SELECT r FROM Reservation r WHERE "
			+ "(:roomId IS NULL or r.room.id = :roomId ) AND "
			+ "(:code IS NULL or r.code = :code ) AND "
			+ "(:dateTimeEntryT IS NULL or r.dateTimeEntryT >= :dateTimeEntryT ) AND "
			+ "(:dateTimeOutputT IS NULL or r.dateTimeOutputT <= :dateTimeOutputT ) "
			)
	Page<Reservation> search(
			@Param("roomId") Integer roomId, 
			@Param("code") String code, 
			@Param("dateTimeEntryT") Timestamp dateTimeEntryT,
			@Param("dateTimeOutputT") Timestamp dateTimeOutputT,
			Pageable pageRequest);
	
	
	List<Reservation> findByRoomOrderByDateTimeOutputTDesc (Room room);


}
