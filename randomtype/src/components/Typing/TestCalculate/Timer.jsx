import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { useHistory } from 'react-router-dom';
import { updateTimer } from "../../../redux/action/Actions"

const Timer = ({ takeCountdown }) => {
    // const history = useHistory();
    const dispatch = useDispatch();
    // const secnd = useSelector((state)=>state.TypingTestReducer);
    const [seconds, setSeconds] = useState(5);  // user can select timer on how much of time they need to be type

    useEffect(()=>{dispatch(updateTimer(seconds))},[seconds])
    useEffect(() => {
        let interval;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        // if (seconds === 0) { history.push("/result") }
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (
        <div >
            {takeCountdown(seconds)}
            <h1>{seconds}</h1>
        </div>
    );
};

export default Timer;
