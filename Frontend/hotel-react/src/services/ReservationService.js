import axios from 'axios';
import authHeader from './auth-header';

const RESERVATION_API_BASE_URL = "http://localhost:8080/api/reservations";
const ROOM_API_BASE_URL = "http://localhost:8080/api/rooms";
const USER_API_BASE_URL = "http://localhost:8080/api/users";


class ReservationService { 

    getAlls(){
		return axios.get(RESERVATION_API_BASE_URL + '/all' , { headers: authHeader() } );
	}

    getReservations(config){
        return axios.get(RESERVATION_API_BASE_URL, config );
    }

    createReservation(reservation){
        return axios.post(RESERVATION_API_BASE_URL, reservation, { headers: authHeader() });
    }

    getReservationById(reservationId){
        return axios.get(RESERVATION_API_BASE_URL + '/' + reservationId, { headers: authHeader() });
    }

    updateReservation(reservation, reservationId){
        return axios.put(RESERVATION_API_BASE_URL + '/' + reservationId, reservation, { headers: authHeader() });
    }

    deleteReservation(reservationId){
        return axios.delete(RESERVATION_API_BASE_URL + '/' + reservationId, { headers: authHeader() });
    }

    getRooms(){
        return axios.get(ROOM_API_BASE_URL + '/all' , { headers: authHeader() } );
    }
    
    getUsers(){
        return axios.get(USER_API_BASE_URL + '/all' , { headers: authHeader() } );
    }


}

export default new ReservationService()