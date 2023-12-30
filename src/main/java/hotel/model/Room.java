package hotel.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;



@Entity
@Table(name="room")
public class Room {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message = "Please provide a name of room")
	@Size(max=25)
	private String name;
	
	@PositiveOrZero(message = "Only positive number")
	private Integer numberOfBeds;
	
	@Column
	private String free;

	
	public Room() {
	}
	

	public Room(Integer id,String name,Integer numberOfBeds, String free) {
		this.id = id;
		this.name = name;
		this.numberOfBeds = numberOfBeds;
		this.free = free;
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

	

}
