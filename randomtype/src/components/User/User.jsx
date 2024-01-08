import React, { useEffect, useReducer, useRef, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import DoughnutChart from './charts/DoughnutChart';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../../redux/action/Actions';
// import ResultGraph from '../Result/ResultCharts/ResultGraph';
import LineChart from './charts/LineChart';
// import { useHistory } from 'react-router-dom';
const User = () => {
  // window.location.reload(false)
  // const history = useHistory();
  const auth = useSelector(state => state.AuthReducer)
  const dispatch = useDispatch();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const author = useSelector(state => state.AuthorReducer)
  const [User, setUser] = useState({});
  const [JoinDate, setJoinDate] = useState();
  const inputFile = useRef(null);
  let testData = author.UserData.data.typing_data;

  const textStyle = {
    fontSize: '1.2em',
    textShadow: '0 0 5px rgba(255, 255, 255, 0.7)',
    color: '#fff',
    WebkitTextStroke: '2px #000', // For WebKit browsers
    textStroke: '2px #000', // For other browsers
  };
  useEffect(() => {
    if (!author.UserData) {
      forceUpdate();
    }
  })
  // console.log("reducer author =>",author.UserData.data);
  console.log("user state=>", User);

  useEffect(() => {
    if (auth) {
      const fetchData = async () => {
        try {
          await axios.get("/users/about",
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true
            }).then(res => {
              console.log(res.data.user)
              setUser(() => res.data.user)   //if you need to store data in useState hook when the data comes form backend
              // dispatch(userId(res.data.user._id))
              dispatch(setUserData(res.data.user))
              localStorage.setItem("DBdata", btoa(JSON.stringify(res.data.user.data)))
              // console.log(Data);
            }).catch(err => console.error(err))
          // return response.data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      };
      fetchData();
      // forceUpdate();
      console.log(author);
    }
  }, [])

  useEffect(() => {
    // const getUserData = async () => {
    //   await axios.get("/users/about", { headers: { "Content-Type": "application/json" }, withCredentials: true })
    //     .then(response => {
    //       console.log(response.data.user)
    //       setUser(() => response.data.user)   //if you need to store data in useState hook when the data comes form backend
    //       console.log("user state=>", User);
    //       dispatch(setUserData(response.data.user))
    //     })
    //     .catch(error => error);
    // }



    const image = document.getElementById("userImgDisplayed");
    const getImgUrl = localStorage.getItem("profile-img");
    if (getImgUrl) {
      image.setAttribute("src", getImgUrl)
      document.getElementById("lblImg").style.display = "none";
    }
    // alert("data showing")
    // console.log(getUserData());
    // setUser(() => response.data.user)
    console.log("User useState =>", User);
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
    // console.log("event => ", event.target.files[0]);
    console.log(URL.createObjectURL(inputFileImg.files[0]));
    lbl_img.style.display = "none";
    const reader = new FileReader(); // convert select img to url
    reader.addEventListener('load', () => {
      localStorage.setItem("profile-img", reader.result)
      image.setAttribute("src", reader.result)
    })
    reader.readAsDataURL(event.target.files[0])
  }

  const getAvg = (arr) => {
    const sum = arr.reduce((acc, num) => acc + num, 0);;
    const arrCount = arr.length;
    console.log(sum / arrCount);
    return sum / arrCount;
  }
  return (
    <>
      <HelmetProvider>
        <Helmet><title>Profile || RandomType</title></Helmet>
        <div className="text-white text-center text-5xl mt-[-20px]">User</div>
        <div id="profile" className='h-[90vh] flex flex-col gap-y-5 w-4/5 m-auto overflow-hidden'>
          <div id="profileContainer" className='flex gap-x-10'>
            <div id="userInfo" className='inline-block shadow p-5 rounded-md m-5'>
              <div id="userImg" className='mt-5 mb-[-10px]'>
                <div className='flex justify-center m-auto mb-10 items-center border border-dashed border-[3px] hover:border-red-500 hover:text-red-500 border-gray-300 text-gray-300 p-5 h-[150px] w-[150px] rounded-full transition-colors duration-300' onClick={handleImageClick}>
                  <img id='userImgDisplayed' src="" className='object-cover cursor-pointer rounded-full scale-150 border border-[3px] border-red-600' alt='userImg' />
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
                <div id='circular-data1' className='flex gap-x-10 mt-2 mr-2'>
                  <div id='avgWPM' className='text-6xl text-center border border-solid border-white border-[4px] rounded-full p-14 shadow-white'>
                    <h1 className='data-of-value border-b-4 text-white px-6' style={textStyle}>{Math.round(getAvg(testData.total_wpm))}</h1>
                    <h1 className='data-of-key text-red-600 flex flex-col justify-center'><div>WPM</div><div className='text-gray-400 text-3xl mt-[-10px]'>avg</div></h1>
                  </div>
                  <div id='avgAccuracy' className='text-6xl text-center border border-solid border-white border-[4px] rounded-full p-14'>
                    <h1 className='data-of-value border-b-4 text-white px-3' style={textStyle}>{Math.round(getAvg(testData.total_accuracy))}<b className='text-5xl'>%</b></h1>
                    <h1 className='data-of-key text-red-600 flex flex-col justify-center'><div>ACC</div><div className='text-gray-400 text-3xl mt-[-10px]'>avg</div></h1>
                  </div>
                  <div id='noOfTime' className=' text-6xl text-center border border-solid border-white border-[4px] rounded-full p-14'>
                    <h1 className='data-of-value border-b-4 text-white' style={textStyle}>{testData.total_wpm.length - 1}</h1>
                    <h1 className='data-of-key text-red-600 flex flex-col justify-center'><div>Test</div><div className='text-gray-400 text-3xl mt-[-10px]'>Total</div></h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div id='charts-data' className='flex gap-x-10 w-[95%] m-auto mt-[-28px]'>
            <div id='car-result' className='justify-start'>
              <DoughnutChart />
            </div>
            <div id='all-typing-data-chart' className='h-1/2 w-[200%] text-black text-center relative bottom-36'>
              <LineChart typingData={author.UserData.data} />
            </div>
          </div>
        </div>
      </HelmetProvider>
    </>
  )
}

export default User;









