import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import PublicRoute from "./routing/PublicRoute";
import {Room} from "./components/Room";
import {Home} from "./components/Home";

function App() {

  return (
    <Router>
      <Switch>
        <PublicRoute restricted={true} component={Home} path="/" exact />
        <PrivateRoute component={Room} path="/room/:roomCode" />
        <Route>
          <div>Not found</div>
        </Route>
      </Switch>
    </Router>
  );
  
}

export default App;
