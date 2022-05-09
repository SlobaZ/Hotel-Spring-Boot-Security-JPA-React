package hotel.web.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import hotel.model.RoomPrice;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api/roomprice")
public class ApiRoomPriceController {
	
	
	@RequestMapping(method=RequestMethod.GET)
	ResponseEntity<List<RoomPrice>> getRoomPrices(){
		
		List<RoomPrice> roomPrice = RoomPrice.prices();
		
		return new ResponseEntity<>( roomPrice , HttpStatus.OK);
	}
	
	

}
