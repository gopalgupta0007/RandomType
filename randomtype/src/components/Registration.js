import React, { useState } from 'react';
import { iconsStyle } from '../muiStyles/sx';
import {AccountCircle, PhoneIphoneRoundedIcon, MailRoundedIcon, KeyRoundedIcon, Visibility, VisibilityOff} from '@mui/icons-material';
import { IconButton, Input, FormControl, InputLabel, InputAdornment, Box, TextField } from '@mui/material'
const Registration = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
            <h1 className="text-center mt-5">Registration</h1>

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, rowGap: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <AccountCircle sx={iconsStyle} />
                    <TextField className='inputStyle' label="Username" name='username' variant='standard' />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <PhoneIphoneRoundedIcon sx={iconsStyle} />
                    <TextField className='inputStyle' label="Phone Number" name='phoneno' variant='standard' />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <MailRoundedIcon sx={iconsStyle} />
                    <TextField className='inputStyle' label="email" name='email' variant='standard' />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                    <KeyRoundedIcon sx={iconsStyle} />
                    <FormControl variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            className='inputStyle'
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
            </Box>
        </>
    )
}

export default Registration;

// https://mui.com/material-ui/react-text-field/#InputWithIcon.js