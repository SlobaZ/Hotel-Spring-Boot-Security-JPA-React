package hotel.web.dto;

import java.sql.Timestamp;


public class ReservationDTO {
	
	private Integer id;
	private String code;
	private Timestamp dateTimeEntryT;
	private String dateTimeEntryS;
	private Timestamp dateTimeOutputT;
	private String dateTimeOutputS;
	
	
	private Integer userId;
	private String userUsername;
	private String userCity;
	private String userJmbg;
	private String userPhone;
	
	
	private Integer roomId;
	private String roomName;
	private Integer roomNumberOfBeds;
	private String roomFree;
	
	

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

	
	
	
	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getUserUsername() {
		return userUsername;
	}

	public void setUserUsername(String userUsername) {
		this.userUsername = userUsername;
	}

	public String getUserCity() {
		return userCity;
	}

	public void setUserCity(String userCity) {
		this.userCity = userCity;
	}

	public String getUserJmbg() {
		return userJmbg;
	}

	public void setUserJmbg(String userJmbg) {
		this.userJmbg = userJmbg;
	}

	public String getUserPhone() {
		return userPhone;
	}

	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
	}

	
	
	
	
	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public Integer getRoomNumberOfBeds() {
		return roomNumberOfBeds;
	}

	public void setRoomNumberOfBeds(Integer roomNumberOfBeds) {
		this.roomNumberOfBeds = roomNumberOfBeds;
	}

	public String getRoomFree() {
		return roomFree;
	}

	public void setRoomFree(String roomFree) {
		this.roomFree = roomFree;
	}
	
	
	
	
	

}
