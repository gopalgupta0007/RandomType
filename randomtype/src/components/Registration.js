import React, { useState } from 'react';
import { iconsStyle, boxStyle } from '../muiStyles/sx';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import MailRoundedIcon from '@mui/icons-material/MailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';
import { IconButton, Input, FormControl, InputLabel, InputAdornment, Box, TextField, Button } from '@mui/material'
const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <h1 className="text-center mt-5 text-light">Registration</h1>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, rowGap: 2 }}>
                <Box sx={boxStyle}>
                    <AccountCircle sx={iconsStyle} />
                    <TextField className='inputStyle' label="Username" color='warning' name='username' variant='standard' />
                </Box>
                <Box sx={boxStyle}>
                    <PhoneIphoneRoundedIcon sx={iconsStyle} />
                    <TextField className='inputStyle' label="Phone Number" color='warning' name='phoneno' variant='standard' />
                </Box>
                <Box sx={boxStyle}>
                    <MailRoundedIcon sx={iconsStyle} />
                    <TextField className='inputStyle' label="email" color='warning' name='email' variant='standard' />
                </Box>
                <Box sx={boxStyle}>
                    <KeyRoundedIcon sx={iconsStyle} />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password" color='warning'>Password</InputLabel>
                        <Input
                            className='inputStyle'
                            color='warning'
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
                <Button variant="contained" sx={{mt:4, backgroundColor:'white',color:'black', fontWeight:'bold'}} size="large">
                    Large
                </Button>
            </Box>
        </>
    )
}

export default Registration;
