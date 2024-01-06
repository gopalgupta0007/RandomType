import Registration from './components/Authentication/Registration';
import Login from "./components/Authentication/Login";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home"
import Navbar from "./components/Navbar/Navbar";
import KeyShortcut from './components/keyboradShortcut/KeyShortcut';
import Footer from './components/footer/Footer';
import About from './components/footer/About';
import Contact from './components/footer/Contact';
import Settings from './components/rtsetting/Settings';
import Logout from './components/Logout/Logout';
import User from './components/User/User';
import CarGame from './components/Games/CarGame';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUserData, userId } from './redux/action/Actions';
import axios from 'axios';

const App = () => {
  const dispatch = useDispatch();
  const author = useSelector(state => state.AuthorReducer)
  const auth = useSelector(state => state.AuthReducer)

  const fetchData = async () => {
    try {
      await axios.get("/users/about",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }).then(res => {
          console.log(res.data.user)
          dispatch(userId(res.data.user._id))
          dispatch(setUserData(res.data.user))
        }).catch(err => console.error(err))
      // return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (auth) {
      fetchData();
      console.log(author);
    }
  }, [])
  // console.log(author);
  // useEffect(() => {
  //   localStorage.setItem("authorId", JSON.stringify(author))
  //   // dispatch(setUserData(response.data.user))
  // }, [author])
  console.log("app.js");
  return (
    <div className="App">
      <Navbar />
      <div id="keyShortcutList" className="h-0 overflow-hidden duration-1000 transition-all z-50">
        <KeyShortcut />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/user" component={User} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/settings" component={Settings} />
        <Route exact path="/game" component={CarGame} />
        <Route exact path="/logout" component={Logout} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
