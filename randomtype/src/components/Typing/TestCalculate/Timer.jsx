import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';


const Timer = ({takeCountdown}) => {
    const history = useHistory();
    const [seconds, setSeconds] = useState(30);  // user can select timer on how much of time they need to be type

    useEffect(() => {
        let interval;
        if (seconds > 0) {
            // takeCountdown(seconds);
            interval = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        }
        if(seconds===0){history.push("/result")}
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
