package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.Room;
import hotel.model.Reservation;
import hotel.model.User;
import hotel.service.RoomService;
import hotel.service.ReservationService;
import hotel.service.UserService;
import hotel.utils.AuxiliaryClass;
import hotel.web.dto.ReservationDTO;


@Component
public class ReservationDTOToReservation implements Converter<ReservationDTO, Reservation> {
	
	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private UserService userService;

	@Override
	public Reservation convert(ReservationDTO dto) {
		
		Room room = roomService.getById(dto.getRoomId());
		User user = userService.getById(dto.getUserId());
		
		Reservation reservation = null;
		
		if(dto.getId()!=null){
			reservation = reservationService.getById(dto.getId());
			
			if(reservation == null){
				throw new IllegalStateException("Tried to "
						+ "modify a non-existant Reservation");
			}
		}
		else {
			reservation = new Reservation();
		}
		
		reservation.setId(dto.getId());
		reservation.setCode(AuxiliaryClass.AssignCode());
		reservation.setDateTimeEntryT(AuxiliaryClass.ConvertStringToSqlDateAndTime(dto.getDateTimeEntryS()));
		reservation.setDateTimeEntryS(dto.getDateTimeEntryS());        
		reservation.setDateTimeOutputT(AuxiliaryClass.ConvertStringToSqlDateAndTime(dto.getDateTimeOutputS()));
		reservation.setDateTimeOutputS(dto.getDateTimeOutputS());
		
		reservation.setUser(user);
		reservation.setRoom(room);
		
		return reservation;
	}
	
	
	public List<Reservation> convert (List<ReservationDTO> dtoReservations){
		List<Reservation> reservations = new ArrayList<>();
		
		for(ReservationDTO dto : dtoReservations){
			reservations.add(convert(dto));
		}
		
		return reservations;
	}

}
