import React, { useState } from 'react';
import axios from 'axios';
import { iconsStyle, boxStyle, btnSubmit, labelStyle } from './sx';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { AccountCircle, Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, Input, FormControl, InputLabel, InputAdornment, Box, TextField, Button } from '@mui/material';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';


const Registration = () => {
    const history = useHistory();
    const [showPassword, setShowPassword] = useState(false);
    const [registerdData, setregisterdData] = useState({
        username: "",
        phoneno: "",
        email: "",
        password: ""
    })

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const preventDefaultt = (event) => {
        event.preventDefault();
    };

    const handleInput = (e) => {
        setregisterdData({ ...registerdData, [e.target.name]: e.target.value })
    }

    const sendDataToDB = async (e) => {
        try{
            e.preventDefault();
            console.log("after sumbiting");
            const { username, phoneno, email, password } = registerdData;
            const axiosPost = await axios.post("/users/signup", { 
                username, 
                phoneno, 
                email, 
                password 
            })
            alert(axiosPost.data);
            // console.log(axiosPost.data);
            toast.success("Registration successfull")
            history.push('/login');
        }catch(err) {
            console.error(err)
        }
    }
    return (
        <>
            <h1 className="text-center mt-5 text-bnw text-4xl">Registration</h1>

            <form method="post" onSubmit={sendDataToDB}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, rowGap: 2 }}>
                    <Box sx={boxStyle}>
                        <AccountCircle sx={iconsStyle} />
                        <TextField className='inputStyle' value={registerdData.username} onChange={handleInput} label="Username" color='warning' sx={{ input: { color: 'white' } }} InputLabelProps={labelStyle} name='username' variant='standard' autoComplete="off" />
                    </Box>
                    <Box sx={boxStyle}>
                        <PhoneIphoneRoundedIcon sx={iconsStyle} />
                        <TextField className='inputStyle' value={registerdData.phoneno} onChange={handleInput} label="Phone Number" color='warning' sx={{ input: { color: 'white' } }} InputLabelProps={labelStyle} name='phoneno' variant='standard' autoComplete="off" />
                    </Box>
                    <Box sx={boxStyle}>
                        <MailRoundedIcon sx={iconsStyle} />
                        <TextField className='inputStyle' value={registerdData.email} onChange={handleInput} label="email" color='warning' sx={{ input: { color: 'white' } }} InputLabelProps={labelStyle} name='email' variant='standard' autoComplete="off" />
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
                                value={registerdData.password}
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
                        Register
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default Registration;
