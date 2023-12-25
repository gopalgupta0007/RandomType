import React from 'react'
import { Box, Container, Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import FullScreenIcon from "./FullScreenIcon"
import RTlg from "../Home/RTlg"
import RTsm from "../Home/RTsm"
import SettingsIcon from '@mui/icons-material/Settings';
import Logout from '../Logout/Logout';
import { useSelector } from 'react-redux';


const Navbar = () => {
    const auth = useSelector(state=>state.AuthReducer)
    const ChangeIconColor = {
        backgroundColor: 'transparent',
        transition: 'background-color 0.3s, border-radius 0.5s',
        '&:hover': {
            backgroundColor: 'red',
            borderRadius: 5,
            padding: '1px',
        }
        // '&:active': {
        //     backgroundColor: 'red',
        //     borderRadius: 5,
        //     padding: '1px',
        // },
        // '&:focus': {
        //     backgroundColor: 'red',
        //     borderRadius: 5,
        //     padding: '1px',
        // },
    }
    // console.log("in nav typing_data => ", JSON.parse(localStorage.getItem("typingData")).isAuth );

    return (
        <>
            <Container maxWidth="xl">
                <Box id="nav" className="flex justify-between">
                    <NavLink to="/" id="logo" className="cursor-pointer z-10" onClick={e => { e.preventDefault(); window.location.reload(); }}>
                        {(window.outerWidth >= 800) ? <RTlg /> : <RTsm />}
                    </NavLink>
                    {console.log("in nav check auth 2 => ", auth)}
                    {(auth) ?
                        <Box sx={{ display: 'flex' }}>
                            <FullScreenIcon styleProp={ChangeIconColor}/>
                            <NavLink to="/settings" id="setting" className="flex gap-x-2 text-white hover:text-gray-200 mb-[40px] mt-12 mr-12 scale-[1.85] hover:scale-[2.2] transition-transform duration-300"  >
                                <SettingsIcon sx={ChangeIconColor} />
                            </NavLink>
                            <NavLink to="/user" id="userLogo" className="flex gap-x-2 text-white hover:text-gray-200 mb-[40px] mt-12 mr-12 scale-[1.85] hover:scale-[2.2] transition-transform duration-300"  >
                                <PersonIcon sx={ChangeIconColor} />
                            </NavLink>
                            <Logout/>
                        </Box>
                        :
                        <Box sx={{ borderRadius: '20px' }} className="h-fit mt-8 mr-5 w-22">
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
                        </Box>
                    }
                </Box>
            </Container>
        </>
    )
}

export default Navbar;