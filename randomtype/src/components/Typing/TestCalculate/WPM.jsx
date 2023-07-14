import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateWpm } from '../../../redux/action/Actions';


let time = 0;
const WPM = ({countdown, word}) => {
  const dispatch = useDispatch();
  const [wpm, setwpm] = useState(0);
  // const a = useSelector((state)=>state.TypingTestReducer.word_per_minute)
  
  useEffect(()=>{dispatch(updateWpm(wpm))},[wpm])
  useEffect(()=>{
    // mathmetical calculation to find wpm(word per minute) => typed word/(10second(durationOfTime)/60second)
    setwpm(word/(time++/60))  // from countdown place forword countdown
  },[countdown])
  return (
    <div>{parseInt(wpm.toFixed(1))}</div>
  )
}

export default WPM;