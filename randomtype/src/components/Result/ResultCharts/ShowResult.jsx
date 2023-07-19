import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storeWPM, storeAcc, testCounter } from "../../../redux/action/Actions"


const ShowResult = () => {
  const dispatch = useDispatch();
  const typingData = useSelector((state) => state.TypingTestReducer)

  useEffect(() => {
    dispatch(storeWPM(typingData.word_per_minute))  // use to store data into the array
    dispatch(storeAcc(typingData.typing_accuracy))  // use to store data into the array
    dispatch(testCounter())  // use to store data into the array
  }, [])
  localStorage.setItem("typingData", JSON.stringify(typingData))   // this function is used to store the state into the localstorage
  console.log("typing data reterive from localStorage => ", JSON.parse(localStorage.getItem("typingData")));
  return (
    <div style={{ marginTop: '60px' }} className='flex flex-col gap-y-10 xl:text-5xl md:text-5xl sm:text-4xl text-4xl xl:mt-10 md:mt-10 sm:mt-20'>
      <div className='flex flex-col'>
        <h1 className='text-red-600'>{Math.round(typingData.word_per_minute)}</h1>
        <h1 className='text-gray-500'>WPM</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-white'>{Math.round(typingData.typing_accuracy)}%</h1>
        <h1 className='text-gray-500'>Acc</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-red-600'>30s</h1> {/*selected time show over here*/}
        <h1 className='text-gray-500'>Time</h1>
      </div>
    </div>
  );
};

export default ShowResult;
