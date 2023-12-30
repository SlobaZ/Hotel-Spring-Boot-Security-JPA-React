import React from 'react';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import RoomService from '../../services/RoomService';
import AuthenticationService from "../../services/AuthenticationService";

const ListRooms = () => {

    let navigate = useNavigate();
	
	const[rooms,setRooms] = useState([]);
	const[searchName,setSearchName] = useState('');
	const[searchNumberOfBeds,setSearchNumberOfBeds] = useState('');
    const[searchFree,setSearchFree] = useState('');
    const[showAdmin,setShowAdmin] = useState('');

    useEffect(() => {
		refreshRooms();
     },[]);

    const handleChangeName = (event) => {
        setSearchName(event.target.value);
    }
	const handleChangeNumberOfBeds = (event) => {
        setSearchNumberOfBeds(event.target.value);
    }
	const handleChangeFree = (event) => {
        setSearchFree(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();  
        refreshRooms();
    }

    const addRoom = () => {
        navigate('/addorupdate-room/_add');
    }

    const editRoom  = (id) => {
        navigate(`/addorupdate-room/${id}` , {id});
    }

	const deleteRoom = (id) => {
        RoomService.deleteRoom(id).then( response => {
            refreshRooms();
         });
    }

    function refreshRooms() {     
    
        const user = AuthenticationService.getCurrentUser();
	    if (user) {
	      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
	    }
        let config = { params: {} };
    
        if (searchName !== "") {
          config.params.name = searchName;
        }
        if (searchNumberOfBeds !== "") {
          config.params.numberOfBeds = searchNumberOfBeds;
        }
        if (searchFree !== "") {
          config.params.free = searchFree;
        }
        RoomService.getRooms(config).then((response) => {
          		setRooms(response.data);
        });
      }



     return (
        <div>
                <div className="box">
                <form className="form-inline" onSubmit={handleSubmit}>
                    
                        <label className="mt-2 mt-sm-0 mr-2">Name: </label>
                        <input type="text" className="form-control mr-4" placeholder="Enter name"  value={searchName} onChange={handleChangeName} />
                    
                    
                        <label className="mt-2 mt-sm-0 mr-2">Number of beds: </label>
                        <input type="number" className="form-control mr-4" placeholder="Number of beds"  value={searchNumberOfBeds} onChange={handleChangeNumberOfBeds}/>  
                 
                    
                        <label className="mt-2 mt-sm-0 mr-2">Free: </label>
                        <select  className="form-control mr-4" value={searchFree} onChange={handleChangeFree}>
	                                <option value={""}> --- Select ---</option>
	                                <option value={"YES"}> YES </option>
	                                <option value={"NO"}> NO </option>
                            </select>  
                                            
                        <button type="submit" className="btn btn-search"> <i className='fa fa-search'></i> Search</button>
                    
                </form>
                </div>

                <div className="tablemodel">
                 				
                                 <div class="rowModel">
                                     <p>Rooms List</p>
                                     {showAdmin && (
                                       <button className="btn btn-add" onClick={ addRoom }> <i class='fas fa-plus'></i> Add Room </button>
                                       )}
                                 </div>
               
                                       <table>
               
                                           <thead>
                                               <tr>
                                                    <th> Name</th>
                                                    <th> Number Of Beds</th>
                                                    <th> Free </th>
                                                   {showAdmin && (    <th> Update </th> )}
                                                   {showAdmin && (    <th> Delete </th> )}
                                               </tr>
                                           </thead>
                                           <tbody>
                                               { rooms.map( room => 
                                                       <tr key = {room.id}>
                                                            <td data-label="Name"> {room.name} </td>   
                                                            <td data-label="Number of beds"> {room.numberOfBeds}</td>
                                                            {room.free ==="YES" &&
                                                            <td data-label="Free">{room.free}</td>
								                            }
								                            {room.free ==="NO" &&
                                                            <td data-label="Free" style={{color: "red"}} >{room.free} <i class="fa fa-times"></i> </td>
								                            }
                                                            {showAdmin && ( 
                                                            <td data-label="Update"> <button onClick={ () => editRoom(room.id)} className="btn btn-update"> <i className='fas fa-pencil-alt'></i> Update </button> </td>
                                                            )}   
                                                            {showAdmin && ( 
                                                             <td data-label="Delete"> <button onClick={ () => deleteRoom(room.id)} className="btn btn-delete"> <i className='fas fa-trash-alt'></i> Delete </button> </td>
                                                            )}
                                                       </tr>
                                                   )
                                               }
                                           </tbody>
                                       </table>
                                       <div className="empty"></div>
                       </div>
            


        </div>
    )


}
export default ListRooms;
