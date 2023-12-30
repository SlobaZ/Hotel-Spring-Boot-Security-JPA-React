import axios from 'axios';
import authHeader from './AuthenticationHeader';

const USER_API_BASE_URL = "http://localhost:8080/api/users";


	
    const getAll = () => { 
		return axios.get(USER_API_BASE_URL + '/all' , { headers: authHeader() } );
	}

    const getUsers = (config) => {
        return axios.get(USER_API_BASE_URL , config  );
    }


    const getUserById = (userId) => {
        return axios.get(USER_API_BASE_URL + '/' + userId , { headers: authHeader() });
    }

    const updateUser = (userId, user) => {
        return axios.put(USER_API_BASE_URL + '/' + userId, user , { headers: authHeader() });
    }

    const deleteUser = (userId) => {
        return axios.delete(USER_API_BASE_URL + '/' + userId , { headers: authHeader() });
    }
    


const UserService = { 
    getAll, getUsers, getUserById, updateUser, deleteUser
}

export default UserService;