import axios from 'axios';

const ROOMPRICE_API_BASE_URL = "http://localhost:8080/api/roomprice";



	const getRoomsPrices = () => {
		return axios.get(ROOMPRICE_API_BASE_URL  );
	}

const RoomPriceService = { 
    getRoomsPrices
}

export default RoomPriceService;