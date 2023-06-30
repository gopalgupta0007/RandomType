import { Box, Container, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import Registration from './components/Authentication/Registration';
import Login from "./components/Authentication/Login";
import Typing from "./components/Typing/Typing";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home"
import KeyShortcut from './components/keyboradShortcut/KeyShortcut';
import RTlg from "./components/Home/RTlg"
import RTsm from "./components/Home/RTsm"
import PersonIcon from '@mui/icons-material/Person';
import FullscreenIcon from '@mui/icons-material/Fullscreen';

const element = document.getElementById('fullScreen');

function requestFullscreen() {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }else{
    element.webkitRequestFullscreen();
  }
}


function App() {
  return (
    <div className="App">
      <Container maxWidth="xl">
        <Box id="nav" className="flex justify-between ">
          <NavLink to="/" id="logo" className="cursor-pointer z-10" onClick={e => { e.preventDefault(); window.location.reload(); }}>
            {(window.outerWidth >= 800) ? <RTlg /> : <RTsm />}
          </NavLink>
          {(window.location.pathname === '/' || window.location.pathname === '/login' || window.location.pathname === '/registration') ? <Box sx={{ borderRadius: '20px' }} className="h-fit mt-8 mr-5 w-22">
            <Button sx={{ border: '1px solid black', borderRadius: '50vh', paddingRight: '30px', paddingLeft: '30px', backgroundColor: 'var(--text-color)', color: 'var(--bg-intro)', "&:hover": { backgroundColor: 'white' } }} variant="contained" className="translate-x-4 z-0 hover:z-10 hover:scale-110 bg-red-500-contained">
              <NavLink to="/login">
                Login
              </NavLink>
            </Button>
            <Button sx={{ border: '1px solid black', borderRadius: '50vh', paddingLeft: '30px', paddingRight: '30px', backgroundColor: 'var(--text-color)', color: 'var(--bg-intro)', "&:hover": { backgroundColor: 'white' } }} variant="contained" className="translate-x-[-8px] z-0 hover:z-10 hover:scale-110">
              <NavLink to="/registration">
                Registraiton
              </NavLink>
            </Button>
          </Box> :
          <Box sx={{display:'flex'}}>
            <div id="fullScreen" onClick={requestFullscreen} className="flex gap-x-2 text-white hover:text-gray-200 mt-16 mr-12 scale-[2] hover:scale-[2.2] transition-transform duration-300"  >
              <FullscreenIcon />
            </div>
            <div id="userLogo" className="flex gap-x-2 text-white hover:text-gray-200 mt-16 mr-12 scale-[2] hover:scale-[2.2] transition-transform duration-300"  >
              <PersonIcon />
            </div>
          </Box>
          }
        </Box>
      </Container>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/typing" component={Typing} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/keydown" component={KeyShortcut} />
      </Switch>
    </div>
  );
}

export default App;
