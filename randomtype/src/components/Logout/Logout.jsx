import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../redux/action/Actions';


const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = async (e) => {
        try {
            axios.get("/users/logout", { headers: { "Content-Type": "application/json" }, withCredentials: true })
            localStorage.setItem("auth", btoa(false));
            dispatch(userLogout())
            alert("logout")
            history.push('/');
        } catch (err) {
            console.log(err);
        }
    }
    return (
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
    )
}

export default Logout;
