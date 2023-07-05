import React, { useEffect, useState } from 'react'

let time = 0;
const WPM = ({countdown, word}) => {
  const [wpm, setwpm] = useState(0);
  useEffect(()=>{
    // mathmetical calculation to find wpm(word per minute) => typed word/(10second(durationOfTime)/60second)
    setwpm(word/(time++/60))  // from countdown place forword countdown
  },[countdown])
  return (
    <div>{parseInt(wpm.toFixed(1))}</div>
  )
}

export default WPM