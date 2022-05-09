package hotel.service.impl;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import hotel.model.User;
import hotel.model.Reservation;
import hotel.model.Room;
import hotel.repository.ReservationRepository;
import hotel.repository.RoomRepository;
import hotel.repository.UserRepository;
import hotel.service.ReservationService;
import hotel.utils.AuxiliaryClass;

@Service
public class JpaReservationService implements ReservationService {
	
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private RoomRepository roomRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	

	@Override
	public Reservation getById(Integer id) {
		return reservationRepository.getById(id);
	}

	@Override
	public List<Reservation> findAll() {
		return reservationRepository.findAll();
	}

	@Override
	public Page<Reservation> findAll(int pageNum) {
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return reservationRepository.findAll(pageable);
	}

	@Override
	public Reservation save(Reservation reservation) {
		reservation.setCode(AuxiliaryClass.AssignCode());
		Room room = reservation.getRoom();
		User user = reservation.getUser();
		room.setFree("NO");
		room.setUser(user);
		roomRepository.save(room);
		userRepository.save(user);	
		return reservationRepository.save(reservation);
	}

	@Override
	public List<Reservation> saveAll(List<Reservation> reservations) {
		return reservationRepository.saveAll(reservations);
	}

	@Override
	public Reservation delete(Integer id) {
		Reservation reservation = reservationRepository.getById(id);
		if(reservation!=null) {
			reservationRepository.delete(reservation);
		}
		return reservation;
	}

	@Override
	public Page<Reservation> search(Integer roomId, String code, String dateTimeEntryS, String dateTimeOutputS, int pageNum) {
		
		Timestamp dateTimeEntryT = null;
		Timestamp dateTimeOutputT = null;
		
		if(dateTimeEntryS != null) { 
			dateTimeEntryT = AuxiliaryClass.ConvertStringToSqlDateAndTime(dateTimeEntryS);
		}
		if(dateTimeOutputS !=null) {
			dateTimeOutputT = AuxiliaryClass.ConvertStringToSqlDateAndTime(dateTimeOutputS);
		}
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return reservationRepository.search(roomId, code, dateTimeEntryT, dateTimeOutputT, pageable);
	}

	@Override
	public List<Reservation> findByRoomOrderByDateTimeOutputTDesc(Room room) {
		return reservationRepository.findByRoomOrderByDateTimeOutputTDesc(room);
	}

	
	

}
