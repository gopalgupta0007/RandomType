import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { updateAcc } from '../../../redux/action/Actions';

const Accuracy = ({countdown, incorrectLetter, totalChar}) => {
  const dispatch = useDispatch();
  const [accuracy, setaccuracy] = useState(0);
  
  useEffect(()=>{dispatch(updateAcc(accuracy))},[accuracy])
  useEffect(()=>{
    setaccuracy(((totalChar - incorrectLetter)/totalChar)*100)
  },[countdown])

  return (
    <div>{parseInt(accuracy)}</div>
  )
}

export default Accuracy;