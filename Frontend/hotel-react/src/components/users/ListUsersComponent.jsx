import React from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';
import UserService from '../../services/UserService';
import AuthenticationService from "../../services/AuthenticationService";


const ListUsers = () => {

    let navigate = useNavigate();
	
	const[showAdmin,setShowAdmin] = useState('');
    const[showEmployeeAndAdmin,setShowEmployeeAndAdmin] = useState('');
	const[users,setUsers] = useState([]);
	const[searchUsername,setSearchUsername] = useState('');
	const[searchJmbg,setSearchJmbg] = useState('');
    const[searchCity,setSearchCity] = useState('');
	const[showSearch,setShowSearch] = useState(false);

    
	const handleChangeUsername = (event) => {
        setSearchUsername(event.target.value);
    }

	const handleChangeJmbg = (event) => {
        setSearchJmbg(event.target.value);
    }

    const handleChangeCity = (event) => {
        setSearchCity(event.target.value);
    }

	const handleSubmit = (event) => {
        event.preventDefault();  
        refreshUsers();
    }

    const deleteUser = (id) => {
        UserService.deleteUser(id).then( response => {
            refreshUsers();
         });
    }

	const addUser = () => {
        navigate("/register");
    }

    const showUsersCalculations = (id) => {
        navigate(`/showcalculate/${id}`, {id});
    }

	
	function refreshUsers () {
		const user = AuthenticationService.getCurrentUser();
	    if (user) {
			setShowAdmin(user.roles.includes("ROLE_ADMIN"));
            setShowEmployeeAndAdmin(user.roles.includes("ROLE_EMPLOYEE") || user.roles.includes("ROLE_ADMIN"));
	    }
		let config = { headers:{ Authorization: 'Bearer ' + user.accessToken } , params: {} };
        if (searchUsername !== "") {
          config.params.username = searchUsername;
        }
        if (searchJmbg !== "") {
            config.params.jmbg = searchJmbg;
        }
        if (searchCity !== "") {
            config.params.city = searchCity;
        }
        UserService.getUsers(config).then((response) => {
           setUsers(response.data);
        });
        
	}


    useEffect(() => {

		refreshUsers();

      },[]);
	
	
	
	return (
           
            <div>


				   
                <button className="btn btn-select" onClick={ () => setShowSearch(!showSearch)}> <i class='fas fa-plus'></i> Search</button>
                <br/><br/>
                { showSearch && (

                <div className="box">
                <form className="form-inline" onSubmit={handleSubmit}>
                    
                        <label className="mt-2 mt-sm-0 mr-2">Username: </label>
                        <input type="text" className="form-control mr-4" placeholder="Search by username"  value={searchUsername} onChange={handleChangeUsername} />
                    
                    
                        <label className="mt-2 mt-sm-0 mr-2">Jmbg: </label>
                        <input type="number" className="form-control mr-4" placeholder="Search by jmbg"  value={searchJmbg} onChange={handleChangeJmbg}/>  
                 
                        <label className="mt-2 mt-sm-0 mr-2">City: </label>
                        <input type="text" className="form-control mr-4" placeholder="Search by city"  value={searchCity} onChange={handleChangeCity}/>
                                                                    
                        <button type="submit" className="btn btn-search"> <i className='fa fa-search'></i> Search</button>
                    
                </form>
                </div>


                )}

              
			   {showEmployeeAndAdmin && ( 
                 <div className="tablemodel">

                <div className="rowModel">
                 <p>Users List</p>
                    <button className="btn btn-add" onClick={ addUser}> <i className='fas fa-plus'></i> Add User</button>
                 </div>

                        <table>
                                <thead>
                                <tr>
                                    <th> UserName</th>
                                    {showAdmin && (   <th> Password</th>   )}
                                    <th> Jmbg</th>
                                    <th> City</th>
                                    <th class="fixno"> Update</th>
                                    {showAdmin && ( 
                                    <th class="fixno"> Delete</th>
                                    )}
                                    <th class="fixno"> Calculate</th>
                                </tr>
                                </thead>
                                { users.map( user => 
                                        <tr key = {user.id}>
                                             <td data-label="UserName"> {user.username} </td>  
                                             {showAdmin && (  <td data-label="Password"> {user.password}</td>  )}
                                             <td data-label="Jmbg"> {user.jmbg}</td>
                                             <td data-label="City"> {user.city}</td>
                                             <td data-label="Update"><Link className="btn btn-update" to={`/update-user/${user.id}`} > <i className='fas fa-pencil-alt'></i> Update </Link> </td>
                                             {showAdmin && ( 
                                              <td data-label="Delete"><button onClick={ () => deleteUser(user.id)} className="btn btn-delete"> <i className='fas fa-trash-alt'></i> Delete </button></td>
                                             )}
                                             <td data-label="Calculate"><button onClick={ () => showUsersCalculations(user.id)} className="btn btn-select"> <i class="fa fa-calculator"></i> Calculate </button></td>
                                        </tr>
                                    )}
                        </table>
                        <div className="empty"></div>
                 </div>
			
			)}
			
        </div>
            
        )

	
	
}

export default ListUsers;

