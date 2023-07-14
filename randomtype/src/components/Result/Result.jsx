import { NavLink, useHistory } from "react-router-dom";
import { useEffect } from "react";
import ResultGraph from "./ResultCharts/ResultGraph";
import ReplayIcon from '@mui/icons-material/Replay';

const Result = () => {
  const history = useHistory();

  function restartTyping(event) { event.preventDefault(); history.push("/typing"); }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.shiftKey && event.key === "Enter") {
        event.preventDefault();
        window.location.href = "/typing";
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <ResultGraph />
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
