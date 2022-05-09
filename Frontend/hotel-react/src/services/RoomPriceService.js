import axios from 'axios';

const ROOMPRICE_API_BASE_URL = "http://localhost:8080/api/roomprice";

class RoomPriceService { 

	getRoomsPrices(){
		return axios.get(ROOMPRICE_API_BASE_URL  );
	}

    
}

export default new RoomPriceService()