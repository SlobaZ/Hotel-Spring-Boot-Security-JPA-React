package hotel.payload.response;

import java.util.List;

public class JwtResponse {
	
	private String token;
	private String type = "Bearer";
	private Integer id;
	private String username;
	private String city;
	private String jmbg;
	private String phone;
	private List<String> roles;

	public JwtResponse(String accessToken, Integer id, String username, String city, String jmbg, String phone, List<String> roles) {
		this.token = accessToken;
		this.id = id;
		this.username = username;
		this.city = city;
		this.jmbg = jmbg;
		this.phone = phone;
		this.roles = roles;
	}

	public String getAccessToken() {
		return token;
	}

	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}

	public String getTokenType() {
		return type;
	}

	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getJmbg() {
		return jmbg;
	}

	public void setJmbg(String jmbg) {
		this.jmbg = jmbg;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public List<String> getRoles() {
		return roles;
	}

	
	@Override
	public String toString() {
		return "JwtResponse [token=" + token + ", type=" + type + ", id=" + id + ", username=" + username + ", city="
				+ city + ", jmbg=" + jmbg + ", phone=" + phone + ", roles=" + roles + "]";
	}

	

	
	
	
	
}
