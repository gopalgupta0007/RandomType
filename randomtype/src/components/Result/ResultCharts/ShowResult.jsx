// import React from 'react'

// const ShowResult = () => {
//   return (
//     <div className='flex flex-col gap-y-10 text-5xl mt-10'>
//         <div className='flex flex-col'><h1 className='text-gray-500'>WPM</h1><h1 className='text-red-600'>40</h1></div>
//         <div className='flex flex-col'><h1 className='text-gray-500 '>Acc</h1><h1 className='text-white'>100%</h1></div>
//         <div className='flex flex-col'><h1 className='text-gray-500 '>Time</h1><h1 className='text-red-600'>60s</h1></div>
//     </div>
//   )
// }

// export default ShowResult;

import React from 'react';
// const {wpm, accuracy, countdown} = 

const ShowResult = () => {
  return (
    <div style={{marginTop:'60px'}} className='flex flex-col gap-y-10 xl:text-5xl md:text-5xl sm:text-4xl text-4xl xl:mt-10 md:mt-10 sm:mt-20'>
      <div className='flex flex-col'>
        <h1 className='text-red-600'>40</h1>
        <h1 className='text-gray-500 border-t-4 w-min rounded-md'>WPM</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-white'>100%</h1>
        <h1 className='text-gray-500 border-t-4 w-min rounded-md'>Acc</h1>
      </div>
      <div className='flex flex-col'>
        <h1 className='text-red-600'>60s</h1>
        <h1 className='text-gray-500 border-t-4 w-min rounded-md'>Time</h1>
      </div>
    </div>
  );
};

export default ShowResult;
