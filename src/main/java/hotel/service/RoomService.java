package hotel.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import hotel.model.Room;

public interface RoomService {
	
	Room getById(Integer id);
	List<Room> findAll();
	Page<Room> findAll(int pageNum);
	Room save(Room room);
	List<Room> saveAll(List<Room> rooms);
	Room delete(Integer id);
	
	Page<Room> search( 
			@Param("name") String name,
			@Param("numberOfBeds") Integer numberOfBeds,
			@Param("free") String free,
			 int pageNum);

}
