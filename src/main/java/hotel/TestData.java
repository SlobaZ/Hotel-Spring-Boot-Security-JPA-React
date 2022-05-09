package hotel;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import hotel.model.ERole;
import hotel.model.Role;
import hotel.repository.RoleRepository;
import hotel.model.User;
import hotel.model.Reservation;
import hotel.model.Room;
import hotel.service.UserService;
import hotel.service.ReservationService;
import hotel.service.RoomService;


@Component
public class TestData { 
	
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private ReservationService reservationService;
		
	
	@PostConstruct
	public void init() {
		
		
		//  ROLE & USERS
		
		Role role1 = new Role();
		role1.setName(ERole.ROLE_ADMIN);
		role1 = roleRepository.save(role1);
		
		Role role2 = new Role();
		role2.setName(ERole.ROLE_EMPLOYEE);
		role2 = roleRepository.save(role2);
		
		Role role3 = new Role();
		role3.setName(ERole.ROLE_GUEST);
		role3 = roleRepository.save(role3);
		
		
		User user1 = new User();
		user1.setUsername("Admin");
		user1.setPassword("$2a$10$hKDVYxLefVHV/vtuPhWD3OigtRyOykRLDdUAp80Z1crSoS1lFqaFS");     // admin
		user1.setCity("AdminCity");
		user1.setJmbg("1234567890123");
		user1.setPhone("0123456789");
		user1 = userService.save(user1);
		
		User user2 = new User();
		user2.setUsername("Employee");
		user2.setPassword("$2a$10$Locf9fRBO84ejEc/bQFEROChVsd2ixjv4M2kYX6KSLp74iacK.N3W");    // 123456
		user2.setCity("New York");
		user2.setJmbg("0510968123456");
		user2.setPhone("064112233");
		user2 = userService.save(user2);
		
		User user3 = new User();
		user3.setUsername("PeraPeric");
		user3.setPassword("$2a$10$bwQVsArIQJtmkPckmfRZGOEMAGBXcHaziXIEgstc9ePsPG6sYEFK.");    // 654321
		user3.setCity("Detroit");
		user3.setJmbg("1106974123456");
		user3.setPhone("063221133");
		user3 = userService.save(user3);
		
		User user4 = new User();
		user4.setUsername("VasaVasic");
		user4.setPassword("$2a$10$43jqK4UjygMmsQS4khzCbO7zlak7SGkQiUJYSIZgPKCJU7X9xy/dy");    // 987654
		user4.setCity("Pennsylvania");
		user4.setJmbg("2208978123456");
		user4.setPhone("062113322");
		user4 = userService.save(user4);
		
		User user5 = new User();
		user5.setUsername("JovaJovic");
		user5.setPassword("$2a$10$/3H3aBRWtUgnYUmxdfzNoOLYB80X21O60uSVjwuUR5zwQSGFN5YBS");    // 456789
		user5.setCity("New York");
		user5.setJmbg("1702958123456");
		user5.setPhone("064445566");
		user5 = userService.save(user5);

		user1.addRole(role1);
		user2.addRole(role2);
		user3.addRole(role3);
		user4.addRole(role3);
		user5.addRole(role3);
		user1 = userService.save(user1);
		user2 = userService.save(user2);
		user3 = userService.save(user3);
		user4 = userService.save(user4);
		user5 = userService.save(user5);
		
		// ROMS
		
		Room room1 = new Room();
		room1.setName("Single 01");
		room1.setNumberOfBeds(1);
		room1 = roomService.save(room1);

		Room room2 = new Room();
		room2.setName("Single 02");
		room2.setNumberOfBeds(1);
		room2.setUser(user1);
		room2 = roomService.save(room2);

		Room room3 = new Room();
		room3.setName("Double 01");
		room3.setNumberOfBeds(2);
		room3.setUser(user2);
		room3 = roomService.save(room3);

		Room room4 = new Room();
		room4.setName("Double 02");
		room4.setNumberOfBeds(2);
		room4 = roomService.save(room4);

		Room room5 = new Room();
		room5.setName("Double 03");
		room5.setNumberOfBeds(2);
		room5 = roomService.save(room5);

		Room room6 = new Room();
		room6.setName("Double 04");
		room6.setNumberOfBeds(2);
		room6 = roomService.save(room6);

		Room room7 = new Room();
		room7.setName("Triple 01");
		room7.setNumberOfBeds(3);
		room7 = roomService.save(room7);

		Room room8 = new Room();
		room8.setName("Triple 02");
		room8.setNumberOfBeds(3);
		room8 = roomService.save(room8);

		Room room9 = new Room();
		room9.setName("Family room 01");
		room9.setNumberOfBeds(4);
		room9 = roomService.save(room9);

		Room room10 = new Room();
		room10.setName("Family room 02");
		room10.setNumberOfBeds(4);
		room10.setUser(user3);
		room10 = roomService.save(room10);

		Room room11 = new Room();
		room11.setName("Suite 01");
		room11.setNumberOfBeds(2);
		room11 = roomService.save(room11);

		Room room12 = new Room();
		room12.setName("Suite 02");
		room12.setNumberOfBeds(2);
		room12 = roomService.save(room12);
	
		
		// RESERVATIONS
		
		Reservation reservation1 = new Reservation();
		reservation1.setDateTimeEntryT(java.sql.Timestamp.valueOf("2020-04-11 10:10:10"));
		reservation1.setDateTimeEntryS("11.04.2020. 10:10");
		reservation1.setDateTimeOutputT(java.sql.Timestamp.valueOf("2020-04-23 10:10:10"));
		reservation1.setDateTimeOutputS("23.04.2020. 10:10");
		reservation1.setUser(user3);
		reservation1.setRoom(room2);
		reservation1 = reservationService.save(reservation1);
		
		Reservation reservation2 = new Reservation();
		reservation2.setDateTimeEntryT(java.sql.Timestamp.valueOf("2020-03-06 14:30:10"));
		reservation2.setDateTimeEntryS("06.03.2020. 14:30");
		reservation2.setDateTimeOutputT(java.sql.Timestamp.valueOf("2020-03-19 14:30:10"));
		reservation2.setDateTimeOutputS("19.03.2020. 14:30");
		reservation2.setUser(user4);
		reservation2.setRoom(room3);
		reservation2 = reservationService.save(reservation2);
		
		Reservation reservation3 = new Reservation();
		reservation3.setDateTimeEntryT(java.sql.Timestamp.valueOf("2020-04-01 18:15:10"));
		reservation3.setDateTimeEntryS("01.04.2020. 18:15");
		reservation3.setDateTimeOutputT(java.sql.Timestamp.valueOf("2020-04-15 18:15:10"));
		reservation3.setDateTimeOutputS("15.04.2020. 18:15");
		reservation3.setUser(user5);
		reservation3.setRoom(room10);
		reservation3 = reservationService.save(reservation3);
	
		
		
	}

}
