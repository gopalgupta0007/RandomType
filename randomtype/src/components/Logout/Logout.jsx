import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/action/Actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = async (e) => {
        try {
            axios.get("/users/logout", { headers: { "Content-Type": "application/json" }, withCredentials: true })
            dispatch(userLogout())
            localStorage.setItem("auth", btoa(false));
            // alert("logout")
            toast.success("Logout successfull")
            setTimeout(() => {
                history.push('/');
                window.location.reload();
            }, 6000);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <NavLink to="/" id="userLogout" onClick={logoutUser} className="flex gap-x-2 text-white hover:text-gray-200 mb-[40px] mt-12 mr-12 scale-[1.85] hover:scale-[2.2] transition-transform duration-300"  >
                <LogoutIcon sx={{
                    backgroundColor: 'transparent',
                    transition: 'background-color 0.3s, border-radius 0.5s',
                    '&:hover': {
                        backgroundColor: 'red',
                        borderRadius: 5,
                        padding: '1px',
                    },
                }} />
            </NavLink>
            <ToastContainer />
        </>
    )
}

export default Logout;
