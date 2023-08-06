import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Logout = () => {
    const history = useHistory();
    useEffect(()=>{
        try {
            axios.get("/users/logout",{headers:{"Content-Type":"application/json"},withCredentials:true})
            alert("logout")
            history.push('/'); // now redirect the page on "/"
        } catch (err) {
            console.log(err);            
        } 
    },[])
    return (
        <>
            <h1>Logout</h1>
        </>
    )
}

export default Logout;
