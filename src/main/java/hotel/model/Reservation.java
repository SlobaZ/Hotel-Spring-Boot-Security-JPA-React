package hotel.model;

import java.sql.Timestamp;

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


@Entity
@Table(name="reservation")
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@NotEmpty(message = "*Please provide a code")
	private String code;
	
	@Column(nullable=false)
	private Timestamp dateTimeEntryT;
	
	
	private String dateTimeEntryS;
	
	@Column(nullable=false)
	private Timestamp dateTimeOutputT;
	
	
	private String dateTimeOutputS;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user")
	private User user;
	
	@OneToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="room")
	private Room room;
	
	


	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public Timestamp getDateTimeEntryT() {
		return dateTimeEntryT;
	}

	public void setDateTimeEntryT(Timestamp dateTimeEntryT) {
		this.dateTimeEntryT = dateTimeEntryT;
	}

	public String getDateTimeEntryS() {
		return dateTimeEntryS;
	}

	public void setDateTimeEntryS(String dateTimeEntryS) {
		this.dateTimeEntryS = dateTimeEntryS;
	}

	public Timestamp getDateTimeOutputT() {
		return dateTimeOutputT;
	}

	public void setDateTimeOutputT(Timestamp dateTimeOutputT) {
		this.dateTimeOutputT = dateTimeOutputT;
	}

	public String getDateTimeOutputS() {
		return dateTimeOutputS;
	}

	public void setDateTimeOutputS(String dateTimeOutputS) {
		this.dateTimeOutputS = dateTimeOutputS;
	}

	
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	}
	
	
	
	
	

}
