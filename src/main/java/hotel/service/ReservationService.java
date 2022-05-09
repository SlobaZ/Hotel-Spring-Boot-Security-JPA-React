package hotel.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import hotel.model.Reservation;
import hotel.model.Room;

public interface ReservationService {
	
	Reservation getById(Integer id);
	List<Reservation> findAll();
	Page<Reservation> findAll(int pageNum);
	Reservation save(Reservation reservation);
	List<Reservation> saveAll(List<Reservation> reservations);
	Reservation delete(Integer id);
	
	Page<Reservation> search( 
			@Param("roomId") Integer roomId, 
			@Param("code") String code, 
			@Param("dateTimeEntryS") String dateTimeEntryS,
			@Param("dateTimeOutputS") String dateTimeOutputS,
			 int pageNum);

	
	List<Reservation> findByRoomOrderByDateTimeOutputTDesc (Room room);
	
	
}
