package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.User;
import hotel.repository.UserRepository;
import hotel.web.dto.UserDTO;


@Component
public class UserDTOToUser implements Converter<UserDTO, User> {
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public User convert(UserDTO dto) {
		
		User user = null;
		
		if(dto.getId()!=null){
			user = userRepository.getReferenceById(dto.getId());
			
			if(user == null){
				throw new IllegalStateException("Tried to modify a non-existant User");
			}
		}
		else {
			user = new User();
		}
		
		user.setId(dto.getId());
		user.setUsername(dto.getUsername());
		user.setPassword(dto.getPassword());
		user.setCity(dto.getCity());
		user.setJmbg(dto.getJmbg());
		user.setPhone(dto.getPhone());
		
		return user;
	}
	
	
	public List<User> convert (List<UserDTO> dtoUsers){
		List<User> users = new ArrayList<>();
		
		for(UserDTO dto : dtoUsers){
			users.add(convert(dto));
		}
		
		return users;
	}

}
