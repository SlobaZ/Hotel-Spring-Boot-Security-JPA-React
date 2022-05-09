package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.Room;
import hotel.web.dto.RoomDTO;

@Component
public class RoomToRoomDTO implements Converter<Room,RoomDTO>{
	
	@Override
	public RoomDTO convert(Room room) {
		if(room==null){
			return null;
		}
		RoomDTO dto = new RoomDTO();
		dto.setId(room.getId());
		dto.setName(room.getName());
		dto.setNumberOfBeds(room.getNumberOfBeds());
		dto.setFree(room.getFree());
		
		if(room.getUser()!=null) {
			dto.setUserId(room.getUser().getId());
			dto.setUserUsername(room.getUser().getUsername());
		}
		
		
				
		return dto;
	}
	
	
	public List<RoomDTO> convert(List<Room> rooms){
		List<RoomDTO> ret = new ArrayList<>();
		
		for(Room r: rooms){
			ret.add(convert(r));
		}
		
		return ret;
	}

}
