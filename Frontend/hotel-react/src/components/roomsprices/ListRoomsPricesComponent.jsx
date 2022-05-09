import React, { Component } from 'react'
import RoomPriceService from '../../services/RoomPriceService'

class ListRoomsPricesComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                roomsprices: [],
                
        };
        
    }


    componentDidMount(){
        this.refreshRoomsPrices();
    }

    refreshRoomsPrices() {
       
        RoomPriceService.getRoomsPrices().then((response) => {
          this.setState({ roomsprices: response.data });
        });
      }


    render() {
        return (
            <div>
                <br/>  
				<br/> 
                 <h2 className="text-center">Rooms Prices List</h2>

                 <br></br>
                 <div className = "row">
                        <table className = "table table-striped table-bordered table-hover">

                            <thead>
                                <tr>
                                    <th> Name</th>
									<th> Number Of Rooms</th>
                                    <th> Number Of Beds</th>
                                    <th> Price </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.roomsprices.map(
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
                 <br/>
            </div>
        )
    }
}

export default ListRoomsPricesComponent
