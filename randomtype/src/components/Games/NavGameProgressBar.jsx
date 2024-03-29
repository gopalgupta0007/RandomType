import React from 'react'
import WPM from '../Typing/TestCalculate/WPM'
import Accuracy from '../Typing/TestCalculate/Accuracy'
// import Timer from '../Typing/TestCalculate/Timer'

const NavGameProgressBar = ({ username, user, Letter, placeholderText, CountDownTimer, IncorrectLetter, StrengerData, isStrenger, FriendData }) => {
    // const countDownTimerMethod = (countdown) => setCountDownTimer(countdown);

    // useEffect(() => {
    //     // console.log(document.querySelector('#user-wpm>h1>div'))
    //     const content = document.querySelector('#userData #user-wpm > h1 > div');
    //     if (content) {
    //         console.log(content.textContent);
    //     }
    // })
    return (
        <div id='display-progress' className='w-4/5 m-auto flex justify-center items-center text-[2vw] font-extrabold'>
            <div id='userData' className='flex flex-col gap-x-14 bg-base-color text-bnw px-5 py-3 rounded-tl-xl rounded-bl-xl'>
                <div>
                    <h1 className='text-center text-background-color text-2xl pr-12'>{username}</h1>
                </div>
                <div className='flex gap-x-12 bg-base-color text-bnw px-5 rounded-tl-xl rounded-bl-xl'>
                    <div id='user-wpm' className='flex border border-0 border-r-2 pr-12'>
                    {/* CountDownTimer */}
                        <h1 className='flex'>WPM :&nbsp;{(Letter.length > 0) ? <WPM countdown={CountDownTimer} word={Letter.split(" ").length - 1} /> : user?.typingGameData.wpm?user?.typingGameData.wpm:0}</h1>
                    </div>
                    <div id='user-acc' className='flex ml-[-10px]'>
                        <h1 className='flex'>ACC :&nbsp;{(Letter.length > 0) ? <Accuracy countdown={CountDownTimer} incorrectLetter={IncorrectLetter} totalChar={placeholderText.split("").length} /> : 100}%</h1>
                    </div>
                </div>
            </div>
            <div id='Timer' className='gameTimer flex flex-col px-3 text-bg-gray-400 border border-0 border-x-2 border-white text-[2vw]'>
                {/* <h1>30s</h1> */}
                {/* <h1 className='flex justify-center hidden'>{(Letter.length > 0) ? <Timer takeCountdown={countDownTimerMethod} /> : 30}s</h1> */}
                <h1 className='flex justify-center'>{CountDownTimer===0?30:CountDownTimer}s</h1>
                <h1 className='border border-0 border-t-4 border-black'>Timer</h1>
            </div>
            <div id='StrengerData' className='flex flex-col gap-x-14 bg-base-color text-bnw px-5 py-3 rounded-tr-xl rounded-br-xl'>
                <div>
                    <h1 className='text-center text-background-color text-2xl'>{isStrenger ? StrengerData.username ? StrengerData.username == username ? "Joining" : StrengerData.username : 'Strenger' : FriendData.username ? FriendData.username == username ? "Joining" : FriendData.username : 'Friend'}</h1>
                </div>
                <div className='flex gap-x-12 bg-base-color text-bnw px-5 rounded-tl-xl rounded-bl-xl'>
                    <div id='strenger-wpm' className='flex border border-0 border-r-2 pr-12'>
                        <h1>WPM :&nbsp;{StrengerData.typingGameData.wpm ? StrengerData.typingGameData.wpm : '0'}</h1>
                        {/* <h1>40</h1> */}
                    </div>
                    <div id='strenger-acc' className='flex ml-[-10px]'>
                        <h1>ACC :&nbsp;{StrengerData.typingGameData.acc ? StrengerData.typingGameData.acc : '100'}%</h1>
                        {/* <h1>99%</h1> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavGameProgressBar;

// showing these error while user are going to type rapidaly
// Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.
//     at checkForNestedUpdates (http://localhost:3000/static/js/bundle.js:71185:15)
//     at scheduleUpdateOnFiber (http://localhost:3000/static/js/bundle.js:69621:7)
//     at dispatchSetState (http://localhost:3000/static/js/bundle.js:62776:11)
//     at countDownTimerMethod (http://localhost:3000/static/js/bundle.js:1881:45)
//     at Timer (http://localhost:3000/static/js/bundle.js:4744:16)
//     at renderWithHooks (http://localhost:3000/static/js/bundle.js:61748:22)
//     at updateFunctionComponent (http://localhost:3000/static/js/bundle.js:64630:24)
//     at beginWork (http://localhost:3000/static/js/bundle.js:66342:20)
//     at beginWork$1 (http://localhost:3000/static/js/bundle.js:71293:18)
//     at performUnitOfWork (http://localhost:3000/static/js/bundle.js:70562:16)