package hotel.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

@Entity
@Table( name="user", uniqueConstraints = {@UniqueConstraint(columnNames = "username"), @UniqueConstraint(columnNames = "jmbg")} )
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message = "Please provide a username")
	@Size(min=5)
	private String username;
	
	@NotEmpty(message = "Please provide a password")
	@Size(min=6)
	private String password;
	
	@NotEmpty(message = "Please provide a city")
	@Size(max = 50)
	private String city;
	
	@PositiveOrZero(message = "Only positive number")
	@Size(min=13,max=13)
	private String jmbg;
	
	@PositiveOrZero(message = "Only positive number")
	@Size(min=6,max=10)
	private String phone;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();
	
	
	public User() {
	}
	
	

	public User(String username, String password, String city, String jmbg, String phone) { 
		this.username = username;
		this.password = password;
		this.city = city;
		this.jmbg = jmbg;
		this.phone = phone;
	}



	public User(Integer id, String username, String password, String city, String jmbg, String phone) {
		this.id = id;
		this.username = username;
		this.password = password;
		this.city = city;
		this.jmbg = jmbg;
		this.phone = phone;
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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	
	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	 
	public void addRole(Role role) {
		roles.add(role);
	}
	
	
	

}
