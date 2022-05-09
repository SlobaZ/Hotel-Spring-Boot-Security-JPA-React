package hotel.service;

import java.util.List;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.repository.query.Param;

import hotel.model.ERole;
import hotel.model.Reservation;
import hotel.model.User;

public interface UserService {
	
	User getById(Integer id);
	
	User save(User user);
	List<User> saveAll(List<User> users);
	User delete(Integer id);
	
	Optional<User> findByUsername(String username);
	
	User findByUserName(String username);
	
	List<User> findByRoles_name(ERole name);
	
	Page<User> findByRoles_name(ERole name, int pageNum);

	
	Page<User> searchForEmployee(
			@Param("username") String username, 
			@Param("jmbg") String jmbg, 
			@Param("city") String city,
			 int pageNum);
	
	
	Page<User> findAllForAdmin(int pageNum);
	
	Page<User> searchForAdmin(
			@Param("username") String username, 
			@Param("jmbg") String jmbg, 
			@Param("city") String city,
			 int pageNum);
	
	
	List<Reservation> guestData( @Param("idG") Integer idG);
	

}
