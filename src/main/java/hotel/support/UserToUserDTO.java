package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.User;
import hotel.web.dto.UserDTO;

@Component
public class UserToUserDTO implements Converter<User,UserDTO> {

	@Override
	public UserDTO convert(User user) {
		if(user==null){
			return null;
		}
		UserDTO dto = new UserDTO();
		dto.setId(user.getId());
		dto.setUsername(user.getUsername());
		dto.setPassword(user.getPassword());
		dto.setCity(user.getCity());
		dto.setJmbg(user.getJmbg());
		dto.setPhone(user.getPhone());
		
		return dto;
	}
	
	
	public List<UserDTO> convert(List<User> users){
		List<UserDTO> ret = new ArrayList<>();
		
		for(User u: users){
			ret.add(convert(u));
		}
		
		return ret;
	}

}
