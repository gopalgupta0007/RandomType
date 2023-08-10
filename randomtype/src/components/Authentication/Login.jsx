import React, { useState } from 'react';
import { iconsStyle, boxStyle, btnSubmit, labelStyle } from './sx';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Input, FormControl, InputLabel, InputAdornment, Box, TextField, Button } from '@mui/material'
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { userAuthenticated } from '../../redux/action/Actions';
import store from '../../redux/store/store';

const Login = () => {
    const typing_data = useSelector(state => state.TypingTestReducer)
    const user_data = useSelector(state => state.AuthReducer)
    const dispatch = useDispatch();
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [loginData, setloginData] = useState({
        email: "",
        password: ""
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const preventDefaultt = (event) => {
        event.preventDefault();
    };

    const handleInput = (e) => {
        setloginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const verifyData = async (e) => {
        try {
            e.preventDefault();
            const { email, password } = loginData;
            const axiosPost = await axios.post("/users/login",
                { email, password },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            ) // for cookie because we have to use axious method to fetch data
            console.log("axiosPost.data => ", axiosPost.data);
            dispatch(userAuthenticated())
            history.push('/');
            // e.preventDefault()
            // window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    localStorage.setItem("typingData", JSON.stringify(typing_data));
    return (
        <>
            {console.log("user_data 60 => ", user_data)}
            <h1 className="text-center mt-5 text-white text-4xl">Login</h1>
            <form method="post" onSubmit={verifyData}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, rowGap: 2 }}>
                    <Box sx={boxStyle}>
                        <MailRoundedIcon sx={iconsStyle} />
                        <TextField className='inputStyle ' value={loginData.email} sx={{ input: { color: 'white' } }} onChange={handleInput} label="email" color='warning' InputLabelProps={labelStyle} name='email' variant='standard' autoComplete="off" />
                    </Box>
                    <Box sx={boxStyle}>
                        <KeyRoundedIcon sx={iconsStyle} />
                        <FormControl variant="standard">
                            <InputLabel htmlFor="standard-adornment-password" color='warning' sx={{ color: '#ff7000' }}>Password</InputLabel>
                            <Input
                                className='inputStyle'
                                color='warning'
                                sx={{ input: { color: 'white' } }}
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={handleInput}
                                value={loginData.password}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={preventDefaultt}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                    </Box>
                    <Button variant="contained" type='submit' sx={btnSubmit} size="large">
                        Login
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default Login;
