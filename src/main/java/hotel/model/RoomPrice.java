package hotel.model;

import java.util.ArrayList;
import java.util.List;

public class RoomPrice {
	
	private Integer id;
	private String name;
	private Integer numberOfRooms;
	private Integer numberOfBeds;
	private Double price;
	
	
	public RoomPrice(Integer id, String name, Integer numberOfRooms, Integer numberOfBeds, Double price) {
		this.id = id;
		this.name = name;
		this.numberOfRooms = numberOfRooms;
		this.numberOfBeds = numberOfBeds;
		this.price = price;
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

	public Integer getNumberOfRooms() {
		return numberOfRooms;
	}

	public void setNumberOfRooms(Integer numberOfRooms) {
		this.numberOfRooms = numberOfRooms;
	}

	public Integer getNumberOfBeds() {
		return numberOfBeds;
	}

	public void setNumberOfBeds(Integer numberOfBeds) {
		this.numberOfBeds = numberOfBeds;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}
	
	
	
	public static List<RoomPrice> prices() {
		
		List<RoomPrice> listOfRooms = new ArrayList<RoomPrice>();
		
		RoomPrice rp1 = new RoomPrice(1, "Single", 2 , 1 , 2000.0);
		RoomPrice rp2 = new RoomPrice(2, "Double" , 4 , 2 , 2500.0);
		RoomPrice rp3 = new RoomPrice(3, "Triple", 2 , 3 , 3500.0);
		RoomPrice rp4 = new RoomPrice(4, "Family room" , 2 , 4 , 2500.0 );		
		RoomPrice rp5 = new RoomPrice(5, "Suite", 2 , 2 , 3000.0);
		
		listOfRooms.add(rp1);
		listOfRooms.add(rp2);
		listOfRooms.add(rp3);
		listOfRooms.add(rp4);
		listOfRooms.add(rp5);
		
		return listOfRooms;
		
	}
	
	

}
