package hotel.web.controller;

import java.util.List;


import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hotel.web.dto.RoomDTO;
import hotel.model.Room;
import hotel.service.RoomService;
import hotel.support.RoomDTOToRoom;
import hotel.support.RoomToRoomDTO;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api/rooms")
public class ApiRoomController {
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private RoomToRoomDTO toDTO; 
	
	@Autowired
	private RoomDTOToRoom toRoom;
	

	@GetMapping("/all")
	ResponseEntity<List<RoomDTO>> getAlls() {
		List<Room> roomList = null;
		roomList = roomService.findAll();
		return new ResponseEntity<>( toDTO.convert(roomList) , HttpStatus.OK);
	}	
	
		
	@GetMapping()
	ResponseEntity<List<RoomDTO>> getAllRooms(
			@RequestParam(required=false) String name, 
			@RequestParam(required=false) Integer numberOfBeds,
			@RequestParam(required=false) String free,
			@RequestParam(value="pageNum", defaultValue="0") int pageNum){
		
		Page<Room> roomPage = null;		
		
		if(name != null || numberOfBeds != null ||  free != null ) {								
			roomPage = roomService.search(name, numberOfBeds, free, pageNum);	
		}
		else {
			roomPage = roomService.findAll(pageNum);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.add("totalPages", Integer.toString(roomPage.getTotalPages()) );
		return new ResponseEntity<>( toDTO.convert(roomPage.getContent()) , headers , HttpStatus.OK);
		
	}

	
	
	
	
	@GetMapping("/{id}")
	ResponseEntity<RoomDTO> getRoomById(@PathVariable Integer id){
		Room room = roomService.getById(id);
		if(room==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(room), HttpStatus.OK);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	ResponseEntity<RoomDTO> deleteRoom(@PathVariable Integer id){
		Room deleted = roomService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PostMapping(consumes = "application/json")
	ResponseEntity<RoomDTO> addRoom(@Valid @RequestBody RoomDTO newRoomDTO ){
		
		if(newRoomDTO==null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		Room savedRoom = roomService.save(toRoom.convert(newRoomDTO));
		
		return new ResponseEntity<>( toDTO.convert(savedRoom), HttpStatus.CREATED);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@PutMapping(value="/{id}" , consumes = "application/json")
	ResponseEntity<RoomDTO> updateRoom( @PathVariable Integer id, @Valid @RequestBody RoomDTO roomDTO){
				
		Room persisted = roomService.getById(id);
		
		persisted.setName(roomDTO.getName());
		persisted.setNumberOfBeds(roomDTO.getNumberOfBeds());
		persisted.setFree(roomDTO.getFree());
		
		roomService.save(persisted);
		
		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}
	
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	
	

	
	
}
