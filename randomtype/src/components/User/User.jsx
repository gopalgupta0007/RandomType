import React, { useEffect, useRef, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import DoughnutChart from './charts/DoughnutChart';
// import ResultGraph from '../Result/ResultCharts/ResultGraph';

const User = () => {
  const [User, setUser] = useState({});
  const [JoinDate, setJoinDate] = useState();
  const inputFile = useRef(null);

  const textStyle = {
    fontSize: '1.2em',
    textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
    color: '#fff',
    WebkitTextStroke: '2px #000', // For WebKit browsers
    textStroke: '2px #000', // For other browsers
  };

  const getUserData = async () => {
    await axios.get("/users/about", { headers: { "Content-Type": "application/json" }, withCredentials: true })
      .then(response => {
        console.log(response.data.user)
        setUser(() => response.data.user)   //if you need to store data in useState hook when the data comes form backend
      })
      .catch(error => error);
  }

  useEffect(() => {
    const image = document.getElementById("userImgDisplayed");
    const getImgUrl = localStorage.getItem("profile-img");
    if (getImgUrl) {
      image.setAttribute("src", getImgUrl)
      document.getElementById("lblImg").style.display = "none";
    }
    console.log(getUserData());
    console.log(User);
  }, [])

  useEffect(() => {
    const dateObject = new Date(User.date);

    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    const formattedDate = dateObject.toLocaleDateString('en-US', options);
    setJoinDate(formattedDate)
    // console.log("date => ", formattedDate); // Output: "21 Aug 2023"
  }, [User])

  const handleImageClick = () => inputFile.current.click();

  const fileChange = (event) => {
    const image = document.getElementById("userImgDisplayed");
    const inputFileImg = document.getElementById("file");
    const lbl_img = document.getElementById("lblImg");
    console.log("event => ", event.target.files[0]);
    console.log(URL.createObjectURL(inputFileImg.files[0]));
    lbl_img.style.display = "none";
    const reader = new FileReader(); // convert select img to url
    reader.addEventListener('load', () => {
      localStorage.setItem("profile-img", reader.result)
      image.setAttribute("src", reader.result)
    })
    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <>
      <HelmetProvider>
        <Helmet><title>Profile || RandomType</title></Helmet>
        <div className="text-white text-center text-5xl mt-[-20px]">User</div>
        <div id="profile" className='flex flex-col gap-y-5 w-4/5 m-auto'>
          <div id="profileContainer" className='flex gap-x-20 '>
            <div id="userInfo" className='inline-block shadow p-5 rounded-md'>
              <div id="userImg" className='mt-5 mb-[-10px]'>
                <div className='flex justify-center m-auto mb-10 items-center border border-dashed border-[3px] hover:border-red-500 hover:text-red-500 border-gray-300 text-gray-300 p-5 h-[150px] w-[150px] rounded-full transition-colors duration-300' onClick={handleImageClick}>
                  <img id='userImgDisplayed' src="" className='object-cover cursor-pointer rounded-full scale-150 border border-[3px] border-red-600' />
                  <label id="lblImg" className='text-center p-14 cursor-pointer'>Upload Photo</label>
                  <input type="file" name="file" id="file" ref={inputFile} onChange={fileChange} style={{ display: 'none' }} />
                </div>
              </div>
              <div id="userDetails">
                <div className='text-white text-xl transition-all duration-1000'>
                  <h1 className='my-3'> + <b className='text-red-600'>UserName</b> : {User.username}</h1>
                  <h1 className='my-3'> + <b className='text-red-600'>Email</b> : {User.email}</h1>
                  <h1 className='my-3'> + <b className='text-red-600'>Phoneno.</b> : {User.phoneno}</h1>
                  <h1 className='my-3'> + <b className='text-red-600'>Joined</b> : {JoinDate}</h1>
                </div>
              </div>
            </div>
            <div id="testData">
              <div id='container-of-typingData' className='flex gap-y-5 flex-col'>
                <div id='circular-data' className='flex gap-x-10 mt-2'>
                  <div id='avgWPM' className='text-6xl text-center border border-solid border-white border-[4px] rounded-full p-16 shadow-white'>
                    <h1 className='data-of-value border-b-4 text-white px-6' style={textStyle}>30</h1>
                    <h1 className='data-of-key text-red-600'>WPM</h1>
                  </div>
                  <div id='avgAccuracy' className='text-6xl text-center border border-solid border-white border-[4px] rounded-full p-16'>
                    <h1 className='data-of-value border-b-4 text-white px-3' style={textStyle}>99<b className='text-5xl'>%</b></h1>
                    <h1 className='data-of-key text-red-600'>Acc</h1>
                  </div>
                  <div id='noOfTime' className=' text-6xl text-center border border-solid border-white border-[4px] rounded-full p-16'>
                    <h1 className='data-of-value border-b-4 text-white' style={textStyle}>22</h1>
                    <h1 className='data-of-key text-red-600'>Test</h1>
                  </div>
                </div>
                <div id='tabular-data' className='text-white text-center border border-2 border-white text-5xl items-center rounded-xl'>
                  <h1><span className='text-red-600 text-[1em] uppercase'>Time Typing </span> : <span style={textStyle}>1234s</span></h1>
                </div>
              </div>
            </div>
          </div>
          <div id='charts-data' className='flex gap-x-10 w-[98%] m-auto'>
            <div id='car-result' className='justify-start'>
              <DoughnutChart />
            </div>
            <div id='all-typing-data-chart' className='w-screen h-52 text-black bg-yellow-300 text-center flex items-center justify-center relative bottom-10'>
              {/* <ResultGraph/> */}
              graph chart of the user status of the typing test
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  )
}

export default User;









