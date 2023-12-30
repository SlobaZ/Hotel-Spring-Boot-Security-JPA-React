package hotel.service.impl;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import hotel.model.ERole;
import hotel.model.User;
import hotel.repository.UserRepository;
import hotel.service.UserService;

@Service
public class UserDetailsServiceImpl implements UserService, UserDetailsService{
	
	
	@Autowired
	private UserRepository userRepository;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = (userRepository.findByUsername(username))
				  .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));

		return UserDetailsImpl.build(user);
	}


	@Override
	public User getReferenceById(Integer id) {
		return userRepository.getReferenceById(id);
	}



	@Override
	public User save(User user) {
		return userRepository.save(user);
	}

	@Override
	public List<User> saveAll(List<User> users) {
		return userRepository.saveAll(users);
	}

	@Override
	public User delete(Integer id) {
		User user = userRepository.getReferenceById(id);
		if(user!=null) {
			userRepository.delete(user);
		}
		return user;
	}
	
	@Override
	public Optional<User> findByUsername(String username) {
		return userRepository.findByUsername(username);
	}
	
	@Override
	public User findByUserName(String username) {
		return userRepository.findByUserName(username);
	}
	
	
	@Override
	public List<User> findByRoles_name(ERole name) {
		return userRepository.findByRoles_name(name);
	}
	
	
	@Override
	public Page<User> findByRoles_name(ERole name, int pageNum) {
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return userRepository.findByRoles_name(name, pageable);
	}
	
	
	@Override
	public Page<User> searchForEmployee(String username, String jmbg, String city, int pageNum) {
		if( username != null) {
			username = '%' + username + '%';
		}
		if( city != null) {
			city = '%' + city + '%';
		}
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return userRepository.searchForEmployee(username, jmbg, city, pageable);
	}


	@Override
	public Page<User> findAllForAdmin(int pageNum) {
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return userRepository.findAll(pageable);
	}
	
	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}
	
	@Override
	public Page<User> searchForAdmin(String username, String jmbg, String city, int pageNum) {
		if( username != null) {
			username = '%' + username + '%';
		}
		if( city != null) {
			city = '%' + city + '%';
		}
		PageRequest pageable = PageRequest.of(pageNum, 20);
		return userRepository.searchForAdmin(username, jmbg, city, pageable);
	}





	


	
	

}
