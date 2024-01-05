import { NavLink } from "react-router-dom";
import { memo, useEffect, useState } from "react";
import ResultGraph from "./ResultCharts/ResultGraph";
import ReplayIcon from '@mui/icons-material/Replay';
import DirectionsCarFilledOutlinedIcon from '@mui/icons-material/DirectionsCarFilledOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { storeAcc, storeWPM, testCounter } from "../../redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
import html2canvas from 'html2canvas';
import axios from "axios";
(localStorage.getItem("typingData") === null) && window.location.reload(); //if the localstoage is null to that automaticlly reload page once

const Result = ({ restartTypingTest }) => {
  const auth = useSelector(state => state.AuthReducer)
  const author = useSelector(state => state.AuthorReducer.id)
  const typing_data = useSelector((state) => state.TypingTestReducer)
  const [testData, setTestData] = useState({
    wpm: Math.round(typing_data.word_per_minute),
    acc: Math.round(typing_data.typing_accuracy)
  })
  console.log("Result");
  const dispatch = useDispatch();

  const updateTypingData = async () => {
    try {
      console.log(author);
      const updateTyping = await axios.patch(`/users/updatetyping/${author}`, testData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      ) // for cookie because we have to use axious method to fetch data
      console.log("updateTyping :=> ", updateTyping);
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
      // console.log(typing_data.word_per_minute)
      // console.log(typing_data.typing_accuracy)
    } else {
      dispatch(storeWPM(typing_data.word_per_minute))  // use to store all wpm data into the array
      dispatch(storeAcc(typing_data.typing_accuracy))  // use to store all accuracy data into the array
      dispatch(testCounter(typing_data.typing_test_data.total_wpm.length))  // use to store data into the array
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
        <ResultGraph typingData={typing_data} />
        {(!auth) && <div className="text-white text-center mt-10" >
          <a href="/login" className="font-bold underline" >Sign in</a> to save your result
        </div>}
        <br />
        <div className="flex justify-center relative z-50 left-28">
          <div id="result-icons" className="w-3/4 flex justify-around" >
            <div id='re-start-logo2' className='text-center mt-5'>
              <NavLink to="/" tabIndex="2">
                <ReplayIcon
                  className='cursor-pointer text-white rounded-none hover:rounded-md'
                  sx={{
                    transform: 'scale(1.5)',
                    "&:hover": { transform: 'scale(2)', backgroundColor: 'red' },
                    "&:active": { transform: 'scale(1.5)', backgroundColor: 'rgba(255,0,0,.3)' },
                    transition: 'transform 300ms'
                  }}
                  onClick={restartTypingTest}
                />
              </NavLink>
            </div>
            <div id='re-start-logo2' className='text-center mt-5'>
              <PhotoSizeSelectActualOutlinedIcon
                className='cursor-pointer text-white rounded-none hover:rounded-md'
                sx={{
                  transform: 'scale(1.3)',
                  "&:hover": { transform: 'scale(2)', backgroundColor: 'red', outline: 'none' },
                  "&:active": { transform: 'scale(1.5)', backgroundColor: 'rgba(255,0,0,.3)' },
                  transition: 'transform 300ms'
                }}
                tabIndex="2"
                onClick={captureImage}
              />
            </div>
            <div id='play-cargame' className='text-center mt-5'>
              <NavLink to="/game" tabIndex="3">
                <DirectionsCarFilledOutlinedIcon
                  className='cursor-pointer text-white rounded-none hover:rounded-md'
                  sx={{
                    transform: 'scale(1.5)',
                    "&:hover": { transform: 'scale(2)', backgroundColor: 'red' },
                    "&:active": { transform: 'scale(1.5)', backgroundColor: 'rgba(255,0,0,.3)' },
                    transition: 'transform 300ms'
                  }}
                // onClick={restartTypingTest}
                />
              </NavLink>
            </div>
          </div>

        </div>
      </HelmetProvider>
    </>
  );
}

export default memo(Result);
