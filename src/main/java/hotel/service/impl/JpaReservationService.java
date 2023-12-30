package hotel.service.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import hotel.model.Reservation;
import hotel.model.Room;
import hotel.repository.ReservationRepository;
import hotel.repository.RoomRepository;
import hotel.service.ReservationService;
import hotel.utils.AuxiliaryClass;

@Service
public class JpaReservationService implements ReservationService {
	
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	@Autowired
	private RoomRepository roomRepository;
		
	
	

	@Override
	public Reservation getReferenceById(Integer id) {
		return reservationRepository.getReferenceById(id);
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
	
		Room room = reservation.getRoom();
		room.setFree("NO");
		roomRepository.save(room);
		return reservationRepository.save(reservation);
	}

	@Override
	public List<Reservation> saveAll(List<Reservation> reservations) {
		return reservationRepository.saveAll(reservations);
	}

	@Override
	public Reservation delete(Integer id) {
		Reservation reservation = reservationRepository.getReferenceById(id);
		if(reservation!=null) {
			Room room = roomRepository.getReferenceById(reservation.getRoom().getId()) ;
			room.setFree("YES");
			roomRepository.save(room);
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
	
	
	
	@Override
	public List<String> guestData(Integer idG) {
		
		List<Reservation> reservations = reservationRepository.findByUserId(idG);
		
		if(reservations==null){
			return null;
		}
		
		
		Reservation	reservation = reservations.get(0);
		for(Reservation reserv : reservations) {
			if(reservation.getDateTimeEntryT().before(reserv.getDateTimeEntryT())) {
				reservation = reserv;
			}
		}
		Integer idGuest = reservation.getUser().getId();
		String guestId = Integer.toString(idGuest) ; 
		String guestUsername = reservation.getUser().getUsername();
		Integer idRoom = reservation.getRoom().getId();
		String roomId = Integer.toString(idRoom) ; 
		String roomName = reservation.getRoom().getName();
		String enter = reservation.getDateTimeEntryS();
		String exit = reservation.getDateTimeOutputS();
		
		Double numberOfDaysD = AuxiliaryClass.TheNumberOfDays(enter, exit);
		Double priceOfDay = AuxiliaryClass.price(numberOfDaysD, roomName);
		
		String numberOfDays = String.valueOf ( numberOfDaysD ) ; 
		String price = String.valueOf ( priceOfDay ) ; 

		List<String> dataGuest = new ArrayList<String>();
		dataGuest.add(guestId);
		dataGuest.add(guestUsername);
		dataGuest.add(roomId);
		dataGuest.add(roomName);
		dataGuest.add(enter);
		dataGuest.add(exit);
		dataGuest.add(numberOfDays);
		dataGuest.add(price);
		
		return dataGuest;
		
	}

	@Override
	public Reservation findByRoomId(Integer id) {
		return reservationRepository.findByRoomId(id);
	}
	
	

}
