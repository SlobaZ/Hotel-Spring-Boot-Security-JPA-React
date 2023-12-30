import axios from 'axios';
import authHeader from './AuthenticationHeader';

const RESERVATION_API_BASE_URL = "http://localhost:8080/api/reservations";
const ROOM_API_BASE_URL = "http://localhost:8080/api/rooms";
const USER_API_BASE_URL = "http://localhost:8080/api/users";


    const getAlls = () => {
		return axios.get(RESERVATION_API_BASE_URL + '/all' , { headers: authHeader() } );
	}

    const getReservations = (config) => {
        return axios.get(RESERVATION_API_BASE_URL, config );
    }

    const createReservation = (reservation) => {
        return axios.post(RESERVATION_API_BASE_URL, reservation, { headers: authHeader() });
    }

    const getReservationById = (reservationId) => {
        return axios.get(RESERVATION_API_BASE_URL + '/' + reservationId, { headers: authHeader() });
    }

    const updateReservation = (reservationId, reservation) => {
        return axios.put(RESERVATION_API_BASE_URL + '/' + reservationId, reservation, { headers: authHeader() });
    }

    const deleteReservation = (reservationId) => {
        return axios.delete(RESERVATION_API_BASE_URL + '/' + reservationId, { headers: authHeader() });
    }

    const getRooms = () => {
        return axios.get(ROOM_API_BASE_URL + '/all' , { headers: authHeader() } );
    }
    
    const getUsers = () => {
        return axios.get(USER_API_BASE_URL + '/all' , { headers: authHeader() } );
    }

    const guestData = (userId) => {
    	return axios.get(RESERVATION_API_BASE_URL + '/guestData/' + userId , { headers: authHeader() });
    }

const ReservationService = { 
    getAlls, getReservations, createReservation, getReservationById, updateReservation, deleteReservation, getRooms, getUsers, guestData
}

export default ReservationService;