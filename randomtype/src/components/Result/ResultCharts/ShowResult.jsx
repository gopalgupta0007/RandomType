import React from 'react';
import { useSelector } from 'react-redux';


const ShowResult = ({keyData}) => {
  console.log(keyData);
  const {Letter, IndexNumber, IncorrectLetter, CorrectLetter, placeholderText} = keyData;
  // console.log(CorrectLetter);
  const typingData = useSelector((state) => state.TypingTestReducer)

  return (
    <div style={{ marginTop: '60px' }} className='flex flex-col gap-y-10 xl:text-5xl md:text-5xl sm:text-4xl text-4xl xl:mt-10 md:mt-10 sm:mt-20'>
      <div className='flex flex-col'>
        <h1 className='text-base-color text-center'>{Math.round(typingData.word_per_minute)}</h1>
        <h1 className='text-gray-500 text-center'>WPM</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-white text-center'>{Math.round(typingData.typing_accuracy)}%</h1>
        <h1 className='text-gray-500 text-center'>Acc</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-base-color text-center'>30s</h1> {/*selected time show over here*/}
        <h1 className='text-gray-500 text-center'>Time</h1>
      </div>
      <div className='flex gap-x-28 mt-5 mx-5 absolute bottom-24'>
        <div>
          <h1 className='text-base-color text-center'>{IncorrectLetter}/{CorrectLetter}/{placeholderText.length}</h1> {/*selected time show over here*/}
          <h1 className='text-gray-500 text-xl'>Incorrect/Correct/Total</h1>
        </div>
        <div>
          <h1 className='text-base-color text-center'>{placeholderText.length-IndexNumber}/{IndexNumber}</h1> {/*selected time show over here*/}
          <h1 className='text-gray-500 text-xl'>NotTyped/Typed</h1>
        </div>
      </div>
    </div>
  );
};

export default ShowResult;
