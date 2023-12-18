import React, { useEffect, useState } from 'react'
import axios from 'axios';

const User = () => {
  const [User, setUser] = useState({});
  const getUserData = async () => {
    await axios.get("/users/about", { headers: { "Content-Type": "application/json" }, withCredentials: true })
      .then(response => {
        console.log(response.data.user)
        setUser(() => response.data.user)   //if you need to store data in useState hook when the data comes form backend
      })
      .catch(error => error);
  }
  useEffect(() => {
    console.log(getUserData());
    console.log(User);
  }, [])
  return (
    <>
      <div className="text-white text-center text-5xl">User</div>
      <div className='text-white transition-all duration-1000'>
        <h1>UserName : {User.username}</h1>
        <h1>Email : {User.email}</h1>
        <h1>Phoneno. : {User.phoneno}</h1>
        <h1>Date : {User.date}</h1>
      </div>
    </>
  )
}

export default User;