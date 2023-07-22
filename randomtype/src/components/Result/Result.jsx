import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import ResultGraph from "./ResultCharts/ResultGraph";
import ReplayIcon from '@mui/icons-material/Replay';
import { storeAcc, storeWPM, testCounter } from "../../redux/action/Actions";
import { useDispatch, useSelector } from "react-redux";

const Result = () => {
  console.log("Result");
  const dispatch = useDispatch();
  const typing_data = useSelector((state)=>state.TypingTestReducer)

  useEffect(() => {
		dispatch(storeWPM(typing_data.word_per_minute))  // use to store all wpm data into the array
		dispatch(storeAcc(typing_data.typing_accuracy))  // use to store all accuracy data into the array
		dispatch(testCounter(typing_data.typing_test_data.total_wpm.length))  // use to store data into the array
	}, [])
	localStorage.setItem("typingData", JSON.stringify(typing_data)); //set all dispatched/change value to store in localstorage 

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "Enter") {
        event.preventDefault(); 
        window.location.reload()
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ResultGraph typingData={typing_data}/>
      <br />
      <div id='re-start-logo2' className='text-center mt-5'>
        <NavLink to="/typing">
          <ReplayIcon
            className='cursor-pointer text-white rounded-none hover:rounded-md'
            sx={{
              transform: 'scale(1.5)',
              "&:hover": { transform: 'scale(2)', backgroundColor: 'red' },
              transition: 'transform 300ms'
            }}
            onClick={(e) => restartTyping(e)}
          />
        </NavLink>
      </div>
    </>
  );
}

export default Result;
