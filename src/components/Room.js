import SockJsClient from 'react-stomp';
import { useState } from 'react';
import { useParams } from "react-router";
import { useData } from "../providers/DataProvider";

export const Room = () => {

    const { data, setData } = useData();
    const userdata = data.userdata;
    const [clientRef, setClienteRef] = useState();
    const [users, setUsers] = useState([]);
    const { roomCode } = useParams();
    const [time, setTime] = useState(30);
    const [startGame, setStartGame] = useState(false);
    const [admin, setAdmin] = useState(false);

    const onMessageReceive = (msg, topic) => {
        
        if(topic === "/topic/game."+roomCode){
            validateGame(msg);
        }else if (topic === "/topic/timer."+roomCode){
            if (msg === 0){
                setStartGame(false);
            }
            setTime(msg);
        }else if (topic === "/topic/room."+roomCode){
            validateUsers(msg);
        }else if(topic === "/topic/start."+roomCode){
            setStartGame(true);
        } else {
            console.log(msg+" "+topic);
        }
    }

    const validateUsers = (msg) => {
        const i = msg.findIndex((element) => element.username === userdata);
        const value = msg[i].role === "admin" ? true: false;
        setAdmin(value);
        validateGame(msg);
    }

    const validateGame = (msg) => {
        const userSort = msg.sort((a, b) =>{
            if(a.clicks < b.clicks){
                return 1;
            } else if (a.clicks > b.clicks){
                return -1;
            } else {
                return 0;
            }
        });
        setUsers(userSort);
    }

    const handleConnect = () => {
        clientRef.sendMessage("/app/room."+roomCode, userdata);
    }

    const handleCountClick = () => {
        clientRef.sendMessage("/app/game."+roomCode, userdata);
    }

    const handleStart = () => {
        clientRef.sendMessage("/app/start."+roomCode, userdata);
        clientRef.sendMessage("/app/timer."+roomCode, userdata);
    }

    return (
        
        <div className="container-fluid RoomContainer px-5 py-5">
            <div className="row RoomSubContainer rounded">
                <div className="col-md-6">
                    <div>
                        <SockJsClient url="http://localhost:8080/stompendpoint" 
                            topics={["/topic/room."+roomCode,"/topic/game."+roomCode,"/topic/timer."+roomCode,"/topic/start."+roomCode]}
                            onMessage={onMessageReceive} ref={(client) => { setClienteRef(client) }} 
                            onConnect={handleConnect}/>
                        <h1>Clicker</h1>
                        <h3>Sala: {roomCode}</h3>
                        <div className="RoomInfo">
                            <span >Tiempo: {time} seg</span>
                        </div>
                        <div className="d-grid gap-2">
                            {startGame ?
                                <button className="py-5 mb-3" onClick={handleCountClick}>Click Here</button>:
                                <button className="py-5 mb-3" disabled>Espere que el anfitrion inicie el juego</button>
                            }
                                    
                        </div>
                        {(!startGame && admin) ? 
                            <button className="mb-3" onClick={handleStart}>Iniciar Juego</button>:
                            <span className="mb-3">{admin ? "El juego ha iniciado":""}</span>    
                        }
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