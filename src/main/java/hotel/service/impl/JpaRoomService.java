package hotel.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import hotel.model.Reservation;
import hotel.model.Room;
import hotel.repository.ReservationRepository;
import hotel.repository.RoomRepository;
import hotel.service.RoomService;
import hotel.utils.AuxiliaryClass;

@Service
public class JpaRoomService implements RoomService {
	
	
	@Autowired
	private RoomRepository roomRepository;
	
	@Autowired
	private ReservationRepository reservationRepository;
	
	

	@Override
	public Room getReferenceById(Integer id) {
		return roomRepository.getReferenceById(id);
	}

	@Override
	public List<Room> findAll() {
		return roomRepository.findAll();
	}

	@Override
	public Page<Room> findAll(int pageNum) {
		PageRequest pageable = PageRequest.of(pageNum, 30);
		return roomRepository.findAll(pageable);
	}

	@Override
	public Room save(Room room) {
		return roomRepository.save(room);
	}

	@Override
	public List<Room> saveAll(List<Room> rooms) {
		return roomRepository.saveAll(rooms);
	}

	@Override
	public Room delete(Integer id) {
		Room room = roomRepository.getReferenceById(id);
		if(room!=null) {
			roomRepository.delete(room);
		}
		return room;
	}

	@Override
	public Page<Room> search(String name, Integer numberOfBeds, String free, int pageNum) {
		if( name != null) {
			name = '%' + name + '%';
		}
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return roomRepository.search(name, numberOfBeds, free, pageable);
	}

	@Override
	public Room setAvailableRoomWhenUpdatingReservation(Integer id) {
		Room room = roomRepository.getReferenceById(id);
		room.setFree("YES");
		return roomRepository.save(room);
	}


	@Override
	public List<Room> checkFreeRoomsToday() {
		List <Room> rooms = roomRepository.findByFree("NO");
		for (Room room : rooms) {
			Reservation reservation = reservationRepository.findByRoomId(room.getId());
			if(AuxiliaryClass.compareWithToday(reservation.getDateTimeOutputS())==true) {
				room.setFree("YES");
				roomRepository.save(room);
			}
		}
		return rooms;
	}
	

}


