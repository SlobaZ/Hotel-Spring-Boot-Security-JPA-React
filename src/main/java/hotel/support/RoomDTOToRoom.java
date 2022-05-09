package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.Room;
import hotel.service.RoomService;
import hotel.web.dto.RoomDTO;

@Component
public class RoomDTOToRoom implements Converter<RoomDTO,Room>{
	
	@Autowired
	private RoomService roomService;
	
	
	@Override
	public Room convert(RoomDTO dto) {
		
		Room room = null;
		
		if(dto.getId()!=null){
			room = roomService.getById(dto.getId());
			
			if(room == null){
				throw new IllegalStateException("Tried to "
						+ "modify a non-existant Room");
			}
			
		}
		else {
			room = new Room();
		}
		
		room.setId(dto.getId());
		room.setName(dto.getName());
		room.setNumberOfBeds(dto.getNumberOfBeds());
		room.setFree(dto.getFree());
		

		return room;
	}
	
	
	public List<Room> convert (List<RoomDTO> dtoRooms){
		List<Room> rooms = new ArrayList<>();
		
		for(RoomDTO dto : dtoRooms){
			rooms.add(convert(dto));
		}
		
		return rooms;
	}


}
