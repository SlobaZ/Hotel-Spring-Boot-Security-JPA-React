package hotel.support;

import java.util.ArrayList;
import java.util.List;

import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import hotel.model.Reservation;
import hotel.utils.AuxiliaryClass;
import hotel.web.dto.ReservationDTO;


@Component
public class ReservationToReservationDTO implements Converter<Reservation, ReservationDTO> {

	@Override
	public ReservationDTO convert(Reservation reservation) {
		
		if(reservation==null){
			return null;
		}
		
		ReservationDTO dto = new ReservationDTO();
		
		dto.setId(reservation.getId());
		dto.setCode(reservation.getCode());
		dto.setDateTimeEntryT(AuxiliaryClass.ConvertStringToSqlDateAndTime(reservation.getDateTimeEntryS()));
		dto.setDateTimeEntryS(reservation.getDateTimeEntryS());  
		dto.setDateTimeOutputT(AuxiliaryClass.ConvertStringToSqlDateAndTime(reservation.getDateTimeOutputS()));
		dto.setDateTimeOutputS(reservation.getDateTimeOutputS());  
		
		dto.setUserId(reservation.getUser().getId());
		dto.setUserUsername(reservation.getUser().getUsername());
		dto.setUserCity(reservation.getUser().getCity());
		dto.setUserJmbg(reservation.getUser().getJmbg());
		dto.setUserPhone(reservation.getUser().getPhone());
		
		dto.setRoomId(reservation.getRoom().getId());
		dto.setRoomName(reservation.getRoom().getName());
		dto.setRoomNumberOfBeds(reservation.getRoom().getNumberOfBeds());
		dto.setRoomFree(reservation.getRoom().getFree());
		
		return dto;
	}
	
	public List<ReservationDTO> convert(List<Reservation> reservations){
		List<ReservationDTO> ret = new ArrayList<>();
		
		for(Reservation r: reservations){
			ret.add(convert(r));
		}
		
		return ret;
	}

}
