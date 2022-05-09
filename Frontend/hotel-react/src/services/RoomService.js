import axios from 'axios';
import authHeader from './auth-header';

const ROOM_API_BASE_URL = "http://localhost:8080/api/rooms";

class RoomService { 

	getAlls(){
		return axios.get(ROOM_API_BASE_URL + '/all' , { headers: authHeader() } );
	}

    getRooms(config){
        return axios.get(ROOM_API_BASE_URL, config );
    }

    createRoom(room){
        return axios.post(ROOM_API_BASE_URL, room, { headers: authHeader() });
    }

    getRoomById(roomId){
        return axios.get(ROOM_API_BASE_URL + '/' + roomId, { headers: authHeader() });
    }

    updateRoom(room, roomId){
        return axios.put(ROOM_API_BASE_URL + '/' + roomId, room, { headers: authHeader() });
    }

    deleteRoom(roomId){
        return axios.delete(ROOM_API_BASE_URL + '/' + roomId, { headers: authHeader() });
    }


}

export default new RoomService()