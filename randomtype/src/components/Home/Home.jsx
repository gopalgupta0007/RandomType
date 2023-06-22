import { Box, Container, Button } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { NavLink } from "react-router-dom";
import RTlg from "./RTlg";
import Typing from "../Typing/Typing";
import RTsm from "./RTsm";


const Home = () => {
    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType</title></Helmet>
                    <Container maxWidth="xl">
                    <Box id="nav" className="flex justify-between ">
                        <NavLink to="/" id="logo" className="cursor-pointer z-10" onClick={e => {e.preventDefault();window.location.reload();} }>
                            {(window.outerWidth>=800)?<RTlg />:<RTsm />}
                        </NavLink>
                        <Box sx={{borderRadius:'20px'}} className="h-fit mt-8 mr-5 w-22">
                            <Button sx={{border:'1px solid black' ,borderRadius:'50vh',paddingRight:'30px',paddingLeft:'30px', backgroundColor:'var(--text-color)',color:'var(--bg-intro)', "&:hover":{backgroundColor:'white'}}} variant="contained" className="translate-x-4 z-0 hover:z-10 hover:scale-110 bg-red-500-contained">
                                    <NavLink to="/login">
                                        Login
                                    </NavLink>
                            </Button>
                            <Button sx={{border:'1px solid black' ,borderRadius:'50vh',paddingLeft:'30px',paddingRight:'30px', backgroundColor:'var(--text-color)',color:'var(--bg-intro)', "&:hover":{backgroundColor:'white'}}} variant="contained" className="translate-x-[-8px] z-0 hover:z-10 hover:scale-110">
                                <NavLink to="/registration">
                                    Registraiton
                                </NavLink>
                            </Button>
                        </Box>
                    </Box>
                    <Typing />
                </Container>
            </HelmetProvider>
        </>
    )
}

export default Home;
