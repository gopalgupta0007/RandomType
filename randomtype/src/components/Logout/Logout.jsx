import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/action/Actions';
import { NavLink } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';



const Logout = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const typing_data = useSelector(state => state.TypingTestReducer)
    const user_data = useSelector(state => state.AuthReducer)

    const logoutUser = async (e) => {
        try {
            axios.get("/users/logout", { headers: { "Content-Type": "application/json" }, withCredentials: true })
            alert("logout")
            dispatch(userLogout())
            history.push('/');
            // e.preventDefault()
            // window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    localStorage.setItem("typingData", JSON.stringify(typing_data));
    return (
        <NavLink to="/" id="userLogout" onClick={logoutUser} className="flex gap-x-2 text-white hover:text-gray-200 mb-[40px] mt-12 mr-12 scale-[1.85] hover:scale-[2.2] transition-transform duration-300"  >
            {console.log("user_data 60 => ", user_data)}
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
