package hotel.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
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

import hotel.web.dto.UserDTO;
import hotel.model.ERole;
import hotel.model.Reservation;
import hotel.model.Role;
import hotel.model.User;
import hotel.service.UserService;
import hotel.service.impl.UserDetailsImpl;
import hotel.support.UserDTOToUser;
import hotel.support.UserToUserDTO;
import hotel.utils.AuxiliaryClass;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping(value="/api/users")
public class ApiUserController {
	

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	private UserService userService;
	
	@Autowired
	private UserToUserDTO toDTO; 
	
	@Autowired
	private UserDTOToUser toUser;
	
		
	
	@GetMapping("/all")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE')")
	ResponseEntity<List<UserDTO>> getAlls() {
		List<User> users = null;
		users = userService.findByRoles_name(ERole.ROLE_GUEST);
		return new ResponseEntity<>( toDTO.convert(users) , HttpStatus.OK);
	}	
	
	
	@GetMapping()
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE')")
	ResponseEntity<List<UserDTO>> getAllUsers(@RequestParam (required = false) String username,
			@RequestParam (required = false) String jmbg,
			@RequestParam (required = false) String city,
			@RequestParam(value="pageNum", defaultValue="0") int pageNum){
		
		
		Page<User> userPage = null;
		
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		String loggedUser = String.valueOf ( userDetails.getUsername() );
		
		
		User user = userService.findByUserName(loggedUser);
		Set<Role> roles = user.getRoles();
		List<Role> list = new ArrayList<Role>(roles);
		Role role = list.get(0);
						
		if(ERole.ROLE_ADMIN.equals(role.getName())) {
			if(username != null || jmbg != null || city != null ) {
				userPage = userService.searchForAdmin(username, jmbg, city, pageNum);
			}
			else {
				userPage = userService.findAllForAdmin(pageNum);
			}
		}
		if(ERole.ROLE_EMPLOYEE.equals(role.getName())) {
			if(username != null || jmbg != null || city != null ) {
				userPage = userService.searchForEmployee(username, jmbg, city, pageNum);
			}
			else {
				userPage = userService.findByRoles_name(ERole.ROLE_GUEST, pageNum);
			}
		}
		

		HttpHeaders headers = new HttpHeaders();
		headers.add("totalPages", Integer.toString(userPage.getTotalPages()) );
		return new ResponseEntity<>( toDTO.convert(userPage.getContent()) , headers , HttpStatus.OK);
		
	}
	
	
	
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('ADMIN') or hasRole('EMPLOYEE')")
	ResponseEntity<UserDTO> getUserById(@PathVariable Integer id){
		User user = userService.getById(id);
		if(user==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(user), HttpStatus.OK);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	ResponseEntity<UserDTO> deleteUser(@PathVariable Integer id){
		User deleted = userService.delete(id);
		
		if(deleted == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		
		return new ResponseEntity<>( toDTO.convert(deleted), HttpStatus.OK);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE')")
	@PostMapping(consumes = "application/json")
	ResponseEntity<UserDTO> addUser(@Valid @RequestBody UserDTO newUserDTO ){
		
		if(newUserDTO==null) {
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
		}
		
		User savedUser = userService.save(toUser.convert(newUserDTO));
		
		return new ResponseEntity<>( toDTO.convert(savedUser), HttpStatus.CREATED);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE')")
	@PutMapping(value="/{id}" , consumes = "application/json")
	ResponseEntity<UserDTO> updateUser( @PathVariable Integer id, @Valid @RequestBody UserDTO UserDTO){
				
		User persisted = userService.getById(id);
		
		persisted.setUsername(UserDTO.getUsername());
		persisted.setPassword(UserDTO.getPassword());
		persisted.setCity(UserDTO.getCity());
		persisted.setJmbg(UserDTO.getJmbg());
		persisted.setPhone(UserDTO.getPhone());
		
		userService.save(persisted);
		
		return new ResponseEntity<>(toDTO.convert(persisted), HttpStatus.OK);
	}
	
	
	
	@PreAuthorize("hasRole('ADMIN') || hasRole('EMPLOYEE') || hasRole('GUEST')")
	@GetMapping(value="/guestData/{idG}")
	ResponseEntity<?> guestData(@PathVariable Integer idG){
		
		List<Reservation> reservations = userService.guestData(idG);
		
		if(reservations==null){
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
		
		return new ResponseEntity<List<String>>( dataGuest , HttpStatus.OK );
	}
	
	
	
	
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	
	

	
	
}
