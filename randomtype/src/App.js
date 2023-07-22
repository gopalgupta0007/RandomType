import Registration from './components/Authentication/Registration';
import Login from "./components/Authentication/Login";
import Typing from "./components/Typing/Typing";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home"
import Navbar from "./components/Navbar/Navbar";

function App() {
  console.log("app.js");
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/typing" component={Typing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
