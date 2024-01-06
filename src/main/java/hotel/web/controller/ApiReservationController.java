package hotel.web.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
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

import hotel.model.Reservation;
import hotel.model.Room;
import hotel.service.ReservationService;
import hotel.service.RoomService;
import hotel.support.ReservationDTOToReservation;
import hotel.support.ReservationToReservationDTO;
import hotel.utils.AuxiliaryClass;
import hotel.web.dto.ReservationDTO;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api/reservations")
public class ApiReservationController {

	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private ReservationToReservationDTO toDTO;
	 
	@Autowired
	private ReservationDTOToReservation toReservation;
	
	@Autowired
	private RoomService roomService;
	
	
		

	@GetMapping("/all")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE')")
	ResponseEntity<List<ReservationDTO>> getAlls() {
		List<Reservation> reservationList = null;
		reservationList = reservationService.findAll();
		return new ResponseEntity<>( toDTO.convert(reservationList) , HttpStatus.OK);
	}	
	
	
	@GetMapping()
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE')")
	ResponseEntity<List<ReservationDTO>> getAllReservations(
			@RequestParam(required=false) Integer roomId,
			@RequestParam(required=false) String code,
			@RequestParam(required=false) String dateTimeEntryS,
			@RequestParam(required=false) String dateTimeOutputS,
			@RequestParam(value="pageNum", defaultValue="0") int pageNum){
		
		Page<Reservation> reservationPage = null;
		
		if(roomId != null || code != null || dateTimeEntryS != null || dateTimeOutputS != null) {
			reservationPage = reservationService.search(roomId, code, dateTimeEntryS, dateTimeOutputS, pageNum);
		}
		else {
			reservationPage = reservationService.findAll(pageNum);
		}

		HttpHeaders headers = new HttpHeaders();
		headers.add("totalPages", Integer.toString(reservationPage.getTotalPages()) );
		
		return new ResponseEntity<>( toDTO.convert(reservationPage.getContent()) , headers , HttpStatus.OK);
	}

	
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	ResponseEntity<ReservationDTO> getReservationById(@PathVariable Integer id){
		Reservation reservation = reservationService.getReferenceById(id);
		if(reservation==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(reservation), HttpStatus.OK);
	}
	
	
		
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	@DeleteMapping("/{id}")
	ResponseEntity<ReservationDTO> deleteReservation(@PathVariable Integer id){
				
		Reservation deleted = reservationService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE') || hasRole('GUEST')")
	@PostMapping(consumes = "application/json")
	public ResponseEntity<ReservationDTO> addReservation ( @Validated @RequestBody ReservationDTO newreservationDTO){
				
		try {
			if(newreservationDTO==null) {
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}
			Room room = roomService.getReferenceById(newreservationDTO.getRoomId());
			if(room.getFree().equals("NO")) {
				return new ResponseEntity<>(null, HttpStatus.CONFLICT);
			}
			if(AuxiliaryClass.correspondsToTheRange(newreservationDTO.getDateTimeEntryS(), newreservationDTO.getDateTimeOutputS())==false) {
				return new ResponseEntity<>(null, HttpStatus.FORBIDDEN);
			}
		
			Reservation savedReservation = reservationService.save(toReservation.convert(newreservationDTO));
			return new ResponseEntity<>( toDTO.convert(savedReservation), HttpStatus.CREATED);
		}
		catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST); 
		}

	}
	
	
		
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE')")
	@PutMapping(value="/{id}" , consumes = "application/json")
	public ResponseEntity<ReservationDTO> editReservation ( @PathVariable Integer id, @Validated @RequestBody ReservationDTO reservationDTO ){
		
		try {
				if(reservationDTO==null || id==null){ 
					return new ResponseEntity<>(HttpStatus.NOT_FOUND);
				}				
				reservationDTO.setId(id);
				Reservation persisted = reservationService.save(toReservation.convert(reservationDTO));
				return new ResponseEntity<>(toDTO.convert(persisted),HttpStatus.OK);
		}
		catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
	
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE') || hasRole('GUEST')")
	@GetMapping(value="/guestData/{idG}")
	ResponseEntity<?> guestData(@PathVariable Integer idG){
		
		try {
			List<String> dataGuest = reservationService.guestData(idG);
			if(dataGuest==null){
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<List<String>>( dataGuest , HttpStatus.OK );
		}
		catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}
	
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE') || hasRole('GUEST')")
	@GetMapping(value="/reservationData/{idR}")
	ResponseEntity<?> reservationData(@PathVariable Integer idR){
		
		try {
			List<String> dataReservation = reservationService.reservationData(idR);
			if(dataReservation==null){
				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			}
			return new ResponseEntity<List<String>>( dataReservation , HttpStatus.OK );
		}
		catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}

	}
	

	
	
	
}
