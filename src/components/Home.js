import { useState } from "react";
import { useHistory } from "react-router";
import { useData } from "../providers/DataProvider";

export const Home = () => {

    const { data, setData } = useData();
    const [username, setUsername] = useState(data.userdata);
    const [code, setCode] = useState("");
    const history = useHistory();
    const [infoMsj, setInfoMsj] = useState("");

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        setUsername(value);
        setInfoMsj("");
    }

    const handleCodeChange = (e) => {
        const value = e.target.value;
        setCode(value);
        setInfoMsj("");
    }

    const handleClick = () => {
        setData((prev) => ({...prev,userdata:username}));
        if(code === "" || username === ""){
            setInfoMsj("No deje los campos vacios");
        } else {
            history.push("/room/"+code);
        }
        
    }

    return(
        <div className="LoginContainer d-flex align-items-center justify-content-center">
            <div className="LoginSubContainer rounded">
                <label>{infoMsj}</label>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="username" onChange={handleUsernameChange}/>
                    <label>Nombre de usuario</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" placeholder="code" onChange={handleCodeChange}/>
                    <label>Codigo</label>
                </div>
                <div className="d-grid gap-2">
                    <button type="button" className="btnEnter btn btn-primary btn-lg btn-block" onClick={handleClick}>Entrar</button>
                </div>
            </div>
        </div>
    );
}