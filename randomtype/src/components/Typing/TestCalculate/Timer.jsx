import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTimer } from "../../../redux/action/Actions"

const Timer = ({ takeCountdown }) => {
    const dispatch = useDispatch();
    const [seconds, setSeconds] = useState(3);  // user can select timer on how much of time they need to be type

    useEffect(()=>{dispatch(updateTimer(seconds))},[seconds])
    useEffect(() => {
        let interval;
        if (seconds > 0) {
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
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
