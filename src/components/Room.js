import SockJsClient from 'react-stomp';
import { useState } from 'react';
import { useParams } from "react-router";
import { useData } from "../providers/DataProvider";

export const Room = () => {

    const { data, setData } = useData();
    const userdata = data.userdata;
    const [clientRef, setClienteRef] = useState();
    const [users, setUsers] = useState([]);
    const {roomCode}=useParams();

    const onMessageReceive = (msg, topic) => {
        
        if(topic === "/topic/room."+roomCode){
            validateUser(msg);
        } else {
            console.log(msg+" "+topic);
        }
    }

    const validateUser = (msg) => {
        setUsers(msg)
    }

    const handleConnect = () => {
        clientRef.sendMessage("/app/room."+roomCode, userdata);
    }

    const handleCountClick = () => {
        clientRef.sendMessage("/app/game."+roomCode, userdata);
    }

    return (
        
        <div className="container-fluid RoomContainer px-5 py-5">
            <div className="row RoomSubContainer rounded">
                <div className="col-md-6">
                    <div>
                        <h1>Clicker</h1>
                        <SockJsClient url="https://nevits-clicker-back.herokuapp.com/stompendpoint" topics={["/topic/room."+roomCode,"/topic/game."+roomCode]}
                            onMessage={onMessageReceive} ref={(client) => { setClienteRef(client) }} 
                            onConnect={handleConnect}/>
                        <div className="d-grid gap-2">
                            <button className="py-5 mb-3"onClick={handleCountClick}>Click Here</button>
                        </div> 
                    </div>
                </div>
                <div className="col-md-6">
                    <table className="table">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Nombre</th>
                                <th scope="col">Clicks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user,index) => {
                                return(
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{user.username}</td>
                                        <td>{user.clicks}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}