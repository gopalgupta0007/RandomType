import { NavLink } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import ResultGraph from "./ResultCharts/ResultGraph";
import ReplayIcon from '@mui/icons-material/Replay';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { setUserData, storeAcc, storeWPM, testCounter } from "../../redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import html2canvas from 'html2canvas';
import axios from "axios";
import { useHistory } from "react-router-dom";
(localStorage.getItem("typingData") === null) && window.location.reload(); //if the localstoage is null to that automaticlly reload page once

const Result = ({ restartTypingTest, keyData }) => {
  const history = useHistory();
  const auth = useSelector(state => state.AuthReducer.auth)
  const author = useSelector(state => state.AuthorReducer)
  const typing_data = useSelector((state) => state.TypingTestReducer)
  // const [AuthorData, setAuthorData] = useState({})
  const [testData, setTestData] = useState({
    wpm: Math.round(typing_data.word_per_minute),
    acc: Math.round(typing_data.typing_accuracy)
  })
  // let AuthorData ;
  console.log("Result");
  console.log(author.UserData._id);
  console.log(author.UserData);
  // console.log(author.data.data);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      await axios.get("/users/about",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }).then(res => {
          console.log(res.data.user)
          // dispatch(userId(res.data.user._id))
          dispatch(setUserData(res.data.user))
        }).catch(err => console.error(err))
      // return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };


  const updateTypingData = async () => {
    try {
      console.log(author);
      const updateTyping = await axios.patch(`/users/updatetyping/${author.UserData._id}`, testData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      ) // for cookie because we have to use axious method to fetch data
      console.log("updateTyping :=> ", updateTyping);
      // AuthorData = updateTyping.data.updatedUser.data;
      // console.log(AuthorData);
      // setAuthorData(()=>AuthorData);
      // console.log(AuthorData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // console.log(auth2);
    setTestData({ wpm: typing_data.word_per_minute, acc: typing_data.typing_accuracy })
    // console.log("testData : ", testData);
    if (auth) {
      updateTypingData()
      fetchData()
      // getFetchData()
      // console.log(AuthorData);
    } else {
      dispatch(storeWPM(typing_data.word_per_minute))  // use to store all wpm data into the array
      dispatch(storeAcc(typing_data.typing_accuracy))  // use to store all accuracy data into the array
      dispatch(testCounter(typing_data.typing_data.total_wpm.length))  // use to store data into the array
    }
  }, [])
  localStorage.setItem("typingData", JSON.stringify(typing_data)); //set all dispatched/change value to store in localstorage 

  const captureImage = () => {
    html2canvas(document.body).then(function (canvas) {
      var a = document.createElement('a');
      a.href = canvas.toDataURL("..assets/image/jpeg").replace("image/jpeg", "image/octet-stream");
      a.download = "RandomType.jpg";
      a.click();
    })
  }

  return (
    <>
      <HelmetProvider>
        <Helmet><title>Result || RandomType</title></Helmet>
        {/* {console.log(AuthorData)} */}
        {/* {!auth && <ResultGraph typingData={typing_data} />}
        {auth&&<ResultGraph typingData={author.data.data} />} */}
        <ResultGraph typingData={auth ? author.UserData.data : typing_data} keyData={keyData} />
        {(!auth) && <div className="text-bnw text-center absolute left-[42.5%] bottom-10" >
          <a href="/login" className="font-bold underline" >Sign in</a> to save your result
        </div>}
        <br />
        <div className="flex justify-end relative z-50">
          <div id="result-icons" className="w-1/2 flex justify-around mx-20" >
            <button tabIndex="1" onClick={restartTypingTest}>
              <div id='re-start-logo2' className='text-center mt-5'>
                <ReplayIcon
                  className='cursor-pointer text-bnw rounded-none hover:rounded-md'
                  sx={{
                    transform: 'scale(1.5)',
                    "&:hover": { transform: 'scale(2)', backgroundColor: 'var(--base_color)' },
                    "&:active": { transform: 'scale(1.5)', backgroundColor: 'var(--background_color)' },
                    transition: 'transform 300ms'
                  }}
                />
              </div>
            </button>
            <button onClick={captureImage}>
              <div id='re-start-logo2' className='text-center mt-5'>

                <PhotoSizeSelectActualOutlinedIcon
                  className='cursor-pointer text-bnw rounded-none hover:rounded-md'
                  sx={{
                    transform: 'scale(1.3)',
                    "&:hover": { transform: 'scale(2)', backgroundColor: 'var(--base_color)', outline: 'none' },
                    "&:active": { transform: 'scale(1.5)', backgroundColor: 'var(--background_color)' },
                    transition: 'transform 300ms'
                  }}
                  tabIndex="2"
                  onClick={captureImage}
                />
              </div>
            </button>
            {auth && <div id='play-cargame' className='text-center mt-5'>
              <button tabIndex="3" onClick={() => history.push("/game")}>
                <DirectionsCarFilledOutlinedIcon
                  className='cursor-pointer text-bnw rounded-none hover:rounded-md'
                  sx={{
                    transform: 'scale(1.5)',
                    "&:hover": { transform: 'scale(2)', backgroundColor: 'var(--base_color)' },
                    "&:active": { transform: 'scale(1.5)', backgroundColor: 'var(--background_color)' },
                    transition: 'transform 300ms'
                  }}
                // onClick={restartTypingTest}
                />
              </button>
            </div>}
          </div>

        </div>
      </HelmetProvider >
    </>
  );
}

export default memo(Result);
