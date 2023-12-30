import React from 'react';
import {useState, useEffect} from 'react';
import RoomPriceService from '../../services/RoomPriceService';

const ListRoomsPrices = () => {

    const[roomsprices,setRoomsprices] = useState([]);

    useEffect(() => {
        refreshRoomsPrices();
    },[]);

    function refreshRoomsPrices () {
        RoomPriceService.getRoomsPrices().then((response) => {
            setRoomsprices(response.data);
        });
    }

    return (
        <div>
           <div className="tablemodel">
                 				
               <div class="rowModel">
                    <p>Rooms Prices List</p>
               </div>
               
               <table>
                        <thead>
                            <tr>
                                <th> Name</th>
                                <th> Number Of Rooms</th>
                                <th> Number Of Beds</th>
                                <th> Price </th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomsprices.map(
                                    roomprice => 
                                    <tr key = {roomprice.id}>
                                         <td> {roomprice.name} </td>   
                                         <td> {roomprice.numberOfRooms}</td>
                                         <td> {roomprice.numberOfBeds}</td>
                                         <td> {roomprice.price}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

             </div>
             <div className="empty"></div>
        </div>
    )

}

export default ListRoomsPrices;
