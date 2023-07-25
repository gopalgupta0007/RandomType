import Registration from './components/Authentication/Registration';
import Login from "./components/Authentication/Login";
import Typing from "./components/Typing/Typing";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home"
import Navbar from "./components/Navbar/Navbar";
import KeyShortcut from './components/keyboradShortcut/KeyShortcut';
import Footer from './components/footer/Footer';
import About from './components/footer/About';
import Contact from './components/footer/Contact';

function App() {
  console.log("app.js");
  return (
    <div className="App">
      <Navbar />
      <div id="keyShortcutList" className="h-0 overflow-hidden duration-1000 transition-all relative z-50">
        <KeyShortcut />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/typing" component={Typing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/test" component={KeyShortcut} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
