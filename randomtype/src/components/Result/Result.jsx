import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import ResultGraph from "./ResultCharts/ResultGraph";
import ReplayIcon from '@mui/icons-material/Replay';
import { storeAcc, storeWPM, testCounter } from "../../redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";
import { Helmet, HelmetProvider } from "react-helmet-async";
(localStorage.getItem("typingData") === null) && window.location.reload(); //if the localstoage is null to that automaticlly reload page once

const Result = ({ restartTypingTest }) => {
  const auth = useSelector(state => state.AuthReducer)
  console.log("Result");
  const dispatch = useDispatch();
  const typing_data = useSelector((state) => state.TypingTestReducer)

  useEffect(() => {
    // if (auth) {

    // }
    dispatch(storeWPM(typing_data.word_per_minute))  // use to store all wpm data into the array
    dispatch(storeAcc(typing_data.typing_accuracy))  // use to store all accuracy data into the array
    dispatch(testCounter(typing_data.typing_test_data.total_wpm.length))  // use to store data into the array
  }, [])
  localStorage.setItem("typingData", JSON.stringify(typing_data)); //set all dispatched/change value to store in localstorage 

  const handleKeyDown = (event) => {
    if (event.shiftKey && event.key == "Enter") {
      restartTypingTest();
    }
  };

  useEffect(() => {

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });


  return (
    <>
      <HelmetProvider>
        <Helmet><title>Result || RandomType</title></Helmet>
        <ResultGraph typingData={typing_data} />
        {(!auth) && <div className="text-white text-center mt-10" >
          <a href="/login" className="font-bold underline" >Sign in</a> to save your result
        </div>}
        <br />
        <div id="result-icons" className="flex justify-center" >
          <div id='re-start-logo2' className='text-center mt-5'>
            <NavLink to="/">
              <ReplayIcon
                className='cursor-pointer text-white rounded-none hover:rounded-md'
                sx={{
                  transform: 'scale(1.5)',
                  "&:hover": { transform: 'scale(2)', backgroundColor: 'red' },
                  transition: 'transform 300ms'
                }}
                onClick={restartTypingTest}
              />
            </NavLink>
          </div>
        </div>
      </HelmetProvider>
    </>
  );
}

export default Result;
