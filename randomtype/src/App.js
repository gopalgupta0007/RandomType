import Registration from './components/Authentication/Registration';
import Login from "./components/Authentication/Login";
import Typing from "./components/Typing/Typing";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home"

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/typing" component={Typing}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/registration" component={Registration}/>
      </Switch>
    </div>
  );
}

export default App;
