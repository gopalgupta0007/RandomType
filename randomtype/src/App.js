import Registration from './components/Authentication/Registration';
import Login from "./components/Authentication/Login";
import { Route, Switch } from "react-router-dom";
import ColorLensIcon from '@mui/icons-material/ColorLens';
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
import { setUserData } from './redux/action/Actions';
import axios from 'axios';
import { on, setFavicons, setThemeOnBody } from './Methods/methods';
import { themeBtn } from './components/rtsetting/lists/ListOfSetting';
import IndexTheme from './components/rtsetting/theme/IndexTheme';

const App = () => {
  // localStorage.setItem("DBdata", (localStorage.getItem("DBdata") == null) ? btoa(author) : localStorage.getItem("DBdata"));

  const dispatch = useDispatch();
  // const [Data, setData] = useState({});
  const author = useSelector(state => state.AuthorReducer)
  const auth = useSelector(state => state.AuthReducer.auth)


  useEffect(() => {
    // append theme class to the body
    const themeCls = author.UserData.data.setting.theme.replace(/ /g, "_").toLowerCase();
    setThemeOnBody(themeCls)
    setFavicons(themeCls)
  }, [author.UserData.data.setting.theme])

  console.log(themeBtn);
  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        // these fetchData method is copy the stored user data in DB take copy and set into the redux-state
        try {
          const d = await axios.get("/users/about",
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true
            }).then(res => {
              console.log("pormise => ", res.data.user)
              dispatch(setUserData(res.data.user))
            }).catch(err => console.error(err))
          // return response.data;
          console.log(d);
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
      fetchData();
      // forceUpdate();
      console.log(author);
    }
  }, [])
  console.log(author.UserData.data.setting);

  
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
      {/* <div id="overlay4" className='overlay-4 transition '>
        <div id="text4" className='text-center transition mt-40 relative z-50' style={{ width: '75vw', margin: 'auto' }}>
          <div className="bg-base-color m-10 rounded-lg relative transition shadow">
            <span onClick={() => { off(4) }} className="absolute right-0 top-0 text-4xl mx-0 px-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200 duration-100 transition text-black">&times;</span>
            <h1 className="p-4 text-4xl text-center border-b-2 border-black text-bnw font-extrabold text-background-color">Themes</h1>
            <div id="listOfTheme" className="mx-5">
              {themeBtn.map((theme, index) => (
                <div className='key p-[3px] px-5 flex justify-between text-background-color font-extrabold'
                  onMouseEnter={() => setTheme(theme.name.replace(/ /g, "_").toLowerCase())}
                  onMouseLeave={()=>{setTheme(author.UserData.data.setting.theme.replace(/ /g, "_").toLowerCase())}}
                  onClick={() => { dispatch(updateTheme(theme.name.replace(/ /g, "_").toLowerCase())); off(4); updateThemeDataInDB(theme.name.replace(/ /g, "_").toLowerCase())}}
                >
                  <div key={index} className="">
                    <h1>{theme.name}</h1>
                  </div>
                  <div className="dotColor flex gap-x-2 items-center">
                    <div className={`base-color w-4 h-4 rounded-full border-bnw bg-[${theme.colours.base_color}]`}></div>
                    <div className={`background-color w-4 h-4 rounded-full border-bnw bg-[${theme.colours.bg_color}]`}></div>
                    <div className={`root-background-color w-4 h-4 rounded-full border-bnw bg-[${theme.colours.root_bg_color}]`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <IndexTheme />
      {auth
        &&
        <button id='themeIconBtn' className='bg-white absolute z-10 right-28 bottom-20 rounded-full shadow transition' onClick={() => { on(4); }}>
          <ColorLensIcon sx={{ fontSize: '5em' }} />
        </button>}
      <Footer />
    </div>
  );
}

export default App;
