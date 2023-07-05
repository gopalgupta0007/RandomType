import React, { useEffect, useState } from 'react'

const Accuracy = ({countdown, incorrectLetter, totalChar}) => {
  const [accuracy, setaccuracy] = useState(0);

  useEffect(()=>{
    setaccuracy(((totalChar - incorrectLetter)/totalChar)*100)
  },[countdown])

  return (
    <div>{parseInt(accuracy)}</div>
  )
}

export default Accuracy;