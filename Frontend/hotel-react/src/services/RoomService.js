import axios from 'axios';
import authHeader from './AuthenticationHeader';

const ROOM_API_BASE_URL = "http://localhost:8080/api/rooms";


    const getAlls = () => {
		return axios.get(ROOM_API_BASE_URL + '/all' , { headers: authHeader() } );
	}

    const getRooms = (config) => {
        return axios.get(ROOM_API_BASE_URL, config );
    }

    const createRoom = (room) => {
        return axios.post(ROOM_API_BASE_URL, room, { headers: authHeader() });
    }

    const getRoomById = (roomId) => {
        return axios.get(ROOM_API_BASE_URL + '/' + roomId, { headers: authHeader() });
    }

    const updateRoom = (roomId, room) => {
        return axios.put(ROOM_API_BASE_URL + '/' + roomId, room, { headers: authHeader() });
    }

    const deleteRoom = (roomId) => {
        return axios.delete(ROOM_API_BASE_URL + '/' + roomId, { headers: authHeader() });
    }

    const setAvailableRoomWhenUpdatingReservation = (roomId) => {
        return axios.get(ROOM_API_BASE_URL + '/setAvailableRoomWhenUpdatingReservation/' + roomId, { headers: authHeader() });
    }

    const checkFreeRoomsToday = () => {
		return axios.get(ROOM_API_BASE_URL + '/checkFreeRoomsToday' , { headers: authHeader() } );
	}


const RoomService = { 
    getAlls, getRooms, createRoom, getRoomById, updateRoom, deleteRoom, setAvailableRoomWhenUpdatingReservation, checkFreeRoomsToday
}

export default RoomService;