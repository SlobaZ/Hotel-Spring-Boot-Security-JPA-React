package hotel.service.impl;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

import hotel.model.User;


public class UserDetailsImpl implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Integer id;

	private String username;

	@JsonIgnore
	private String password;
	
	private String city;
	
	private String jmbg;
	
	private String phone;
	

	private Collection<? extends GrantedAuthority> authorities;
	
	

	public UserDetailsImpl(Integer id, String username, String password, String city, String jmbg, String phone,
							Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.city = city;
		this.jmbg = jmbg;
		this.phone = phone;
		this.authorities = authorities;
	}
	

	public static UserDetailsImpl build(User user) {
		List<GrantedAuthority> authorities = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());

		return new UserDetailsImpl(
				user.getId(), 
				user.getUsername(), 
				user.getPassword(), 
				user.getCity(),
				user.getJmbg(),
				user.getPhone(),
				authorities);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	public Integer getId() {
		return id;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}
	
	public String getCity() {
		return city;
	}
	
	public String getJmbg() {
		return jmbg;
	}

	public String getPhone() {
		return phone;
	}



	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserDetailsImpl user = (UserDetailsImpl) o;
		return Objects.equals(id, user.id);
	}


	@Override
	public String toString() {
		return "UserDetailsImpl [id=" + id + ", username=" + username + ", password=" + password + ", city=" + city
				+ ", jmbg=" + jmbg + ", phone=" + phone + ", authorities=" + authorities + "]";
	}


	
	
	
	
	
}
