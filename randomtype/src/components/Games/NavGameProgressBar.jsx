import React from 'react'
import WPM from '../Typing/TestCalculate/WPM'
import Accuracy from '../Typing/TestCalculate/Accuracy'
import Timer from '../Typing/TestCalculate/Timer'

const NavGameProgressBar = ({ Letter, placeholderText, CountDownTimer, setCountDownTimer, IncorrectLetter }) => {

    const countDownTimerMethod = (countdown) => setCountDownTimer(countdown);

    return (
        <div id='display-progress' className='w-4/5 m-auto flex justify-center items-center text-[2vw] font-extrabold'>
            <div id='userData' className='flex flex-col gap-x-14 bg-base-color text-bnw px-5 py-3 rounded-tl-xl rounded-bl-xl'>
                <div>
                    <h1 className='text-center text-background-color text-2xl pr-12'>User</h1>
                </div>
                <div className='flex gap-x-12 bg-base-color text-bnw px-5 rounded-tl-xl rounded-bl-xl'>
                    <div id='user-wpm' className='flex border border-0 border-r-2 pr-12'>
                        {/* <h1>WPM : </h1>&nbsp;
                        <h1>40</h1> */}
                        <h1 className='flex'>WPM :&nbsp;{(Letter.length > 0) ? <WPM countdown={CountDownTimer} word={Letter.split(" ").length - 1} /> : 0}</h1>
                    </div>
                    <div id='user-acc' className='flex ml-[-10px]'>
                        {/* <h1>ACC : </h1>&nbsp;
                        <h1>99%</h1> */}
                        <h1 className='flex'>ACC :&nbsp;{(Letter.length > 0) ? <Accuracy countdown={CountDownTimer} incorrectLetter={IncorrectLetter} totalChar={placeholderText.split("").length} /> : 100}%</h1>
                    </div>
                </div>
            </div>
            <div id='Timer' className='gameTimer flex flex-col px-3 text-bg-gray-400 border border-0 border-x-2 border-white text-[2vw]'>
                {/* <h1>30s</h1> */}
                <h1 className='flex justify-center'>{(Letter.length > 0) ? <Timer takeCountdown={countDownTimerMethod} /> : 30}s</h1>
                <h1 className='border border-0 border-t-4 border-black'>Timer</h1>
            </div>
            <div id='StrengerData' className='flex flex-col gap-x-14 bg-base-color text-bnw px-5 py-3 rounded-tr-xl rounded-br-xl'>
                <div>
                    <h1 className='text-center text-background-color text-2xl'>Strenger</h1>
                </div>
                <div className='flex gap-x-12 bg-base-color text-bnw px-5 rounded-tl-xl rounded-bl-xl'>
                    <div id='strenger-wpm' className='flex border border-0 border-r-2 pr-12'>
                        <h1>WPM : </h1>&nbsp;
                        <h1>40</h1>
                    </div>
                    <div id='strenger-acc' className='flex ml-[-10px]'>
                        <h1>ACC : </h1>&nbsp;
                        <h1>99%</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavGameProgressBar