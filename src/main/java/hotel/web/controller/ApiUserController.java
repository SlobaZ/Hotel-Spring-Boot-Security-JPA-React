package hotel.web.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import jakarta.validation.Valid;
import hotel.payload.response.MessageResponse;
import hotel.utils.PasswordContainsLowercaseUppercaseSpecialCharacterDigit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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
import hotel.model.Role;
import hotel.model.User;
import hotel.service.UserService;
import hotel.service.impl.UserDetailsImpl;
import hotel.support.UserDTOToUser;
import hotel.support.UserToUserDTO;


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
	
	@Autowired
	private PasswordEncoder encoder;
	
		
	
	@GetMapping("/all")
	@PreAuthorize("hasAnyRole('ROLE_ADMIN','ROLE_EMPLOYEE')")
	ResponseEntity<List<UserDTO>> getAlls() {
		List<User> users = userService.findAll();
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
		User user = userService.getReferenceById(id);
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
	ResponseEntity<?> updateUser( @PathVariable Integer id, @Valid @RequestBody UserDTO userDTO){
		
		try {
			if(userDTO==null || id==null){
				return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
			}

			User persisted = userService.getReferenceById(id);
			
			if(persisted.getPassword().equals(userDTO.getPassword())) {
				persisted.setPassword(userDTO.getPassword());
			}
			else {
				if (!PasswordContainsLowercaseUppercaseSpecialCharacterDigit.passwordContainsLowercaseUppercaseSpecialCharacterDigit(userDTO.getPassword())) {
					return ResponseEntity.badRequest().body(new MessageResponse("Error: Password must have atleast one: digit, uppercase character, lowercase character and specail character !"));
				}
				persisted.setPassword(encoder.encode(userDTO.getPassword()));
			}
			
			userDTO.setId(id);
			persisted = userService.save(toUser.convert(userDTO));
			return new ResponseEntity<>(toDTO.convert(persisted),HttpStatus.OK);
		}
		catch (Exception e) {
				return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
		}
		
	}
	
	
		
	
	
	@ExceptionHandler(value=DataIntegrityViolationException.class)
	public ResponseEntity<Void> handle() {
		return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	}
	
	
	
	
	
	

	
	
}
