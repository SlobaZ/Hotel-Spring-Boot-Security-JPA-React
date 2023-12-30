package hotel.model;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;


@Entity
@Table(name="reservation")
public class Reservation {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column
	private String code;
	
	@Column
	private Timestamp dateTimeEntryT;
	
	@Column(nullable=false)
	private String dateTimeEntryS;
	
	@Column
	private Timestamp dateTimeOutputT;
	
	@Column(nullable=false)
	private String dateTimeOutputS;
	
	
	
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="user")
	private User user;
	

	@ManyToOne(fetch=FetchType.LAZY)
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
