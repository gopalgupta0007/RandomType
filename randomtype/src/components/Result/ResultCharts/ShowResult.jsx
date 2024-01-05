import React from 'react';
import { useSelector } from 'react-redux';


const ShowResult = () => {
  const typingData = useSelector((state) => state.TypingTestReducer)

  return (
    <div style={{ marginTop: '60px' }} className='flex flex-col gap-y-10 xl:text-5xl md:text-5xl sm:text-4xl text-4xl xl:mt-10 md:mt-10 sm:mt-20'>
      <div className='flex flex-col'>
        <h1 className='text-red-600 text-center'>{Math.round(typingData.word_per_minute)}</h1>
        <h1 className='text-gray-500 text-center'>WPM</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-white text-center'>{Math.round(typingData.typing_accuracy)}%</h1>
        <h1 className='text-gray-500 text-center'>Acc</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-red-600 text-center'>30s</h1> {/*selected time show over here*/}
        <h1 className='text-gray-500 text-center'>Time</h1>
      </div>
      <div className='flex flex-col mt-5 absolute bottom-24'>
        <h1 className='text-red-600 text-center'>5/76/100</h1> {/*selected time show over here*/}
        <h1 className='text-gray-500 text-xl'>Incorrect/Correct/Total</h1>
      </div>
    </div>
  );
};

export default ShowResult;
