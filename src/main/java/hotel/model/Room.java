package hotel.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;
import org.springframework.lang.Nullable;


@Entity
@Table(name="room")
public class Room {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message = "*Please provide a name of room")
	@Size(max=25)
	private String name;
	
	@PositiveOrZero(message = "*Only positive number")
	private Integer numberOfBeds;
	
	@Column
	private String free;

	@Nullable
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user")
	@NotFound(action=NotFoundAction.IGNORE)
	private User user;

	
	public Room() {
		this.free = "YES";
	}
	

	public Room(Integer id,String name,Integer numberOfBeds, String free) {
		this.id = id;
		this.name = name;
		this.numberOfBeds = numberOfBeds;
		this.free = free;
	}


	public Room(Integer id, String name, Integer numberOfBeds, String free, User user) {
		this.id = id;
		this.name = name;
		this.numberOfBeds = numberOfBeds;
		this.free = free;
		this.user = user;
	}


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getNumberOfBeds() {
		return numberOfBeds;
	}

	public void setNumberOfBeds(Integer numberOfBeds) {
		this.numberOfBeds = numberOfBeds;
	}

	public String getFree() {
		return free;
	}
	public void setFree(String free) {
		this.free = free;
	}



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
	
	
	
	

}
