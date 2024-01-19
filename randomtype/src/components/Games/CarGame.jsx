import React, { useEffect, useRef, useState } from 'react'
import NavConfig from '../Mode/NavConfig'
import { Box, Container } from '@mui/material'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import NavGameProgressBar from './NavGameProgressBar';
// import car from "../Games/svg Images/carSVG.svg"
import { ReactComponent as Car } from "../Games/svg Images/carSVG.svg"
// import flag from "../Games/svg Images/flag.svg"
import { ReactComponent as Flag } from "../Games/svg Images/flag.svg"
import useSound from 'use-sound';
import bubble from '../rtsetting/sounds/bubble.mp3';
import lightbell from '../rtsetting/sounds/lightbell.mp3';
import typeErrorsound from '../rtsetting/sounds/typeError.mp3';
import { getNumberOfWords } from '../Typing/Typing';
import normalText from '../Typing/storedText';
import { useSelector } from 'react-redux';

function compareTo(text1, text2) {
    console.log(`\'${text1}\' == \'${text2}\'`);
    if ((text1.length === text2.length) && (text1 === text2)) { return true }
    else { return false }
}

const CarGame = () => {
    const author = useSelector(state => state.AuthorReducer.UserData)
    const cargametypingContainer = document.getElementById("cargametypingContainer");
    const elemtRef = useRef(null);
    const [CarLetter, setCarLatter] = useState("");
    const [CarMoveingPoint, setCarMoveingPoint] = useState(0);
    const [CargameIncorrectLetter, setCargameIncorrectLetter] = useState(0);
    const [CarCharIndexNumber, setCarCharIndexNumber] = useState(0);
    const [CargameCountDownTimer, setCargameCountDownTimer] = useState(30);
    const [CarTextplaceholderText, setCarTextPlaceholderText] = useState("");

    const [playCorrectKeySound] = useSound(bubble, { volume: 1 });
    const [playInCorrectKeySound] = useSound(lightbell, { volume: 1 });
    const [playbackspaceSound] = useSound(typeErrorsound, { volume: 1 });

    useEffect(() => {
        //generate random number and the according to that number of index of array of the paragram will it be selected

        // getParagraph(setplaceholderText, loadParagraph
        // setCarTextPlaceholderText(getNumberOfWords(loadParagraph(), 50))
        setCarTextPlaceholderText(getNumberOfWords(normalText[Math.floor(Math.random() * 10)].toLowerCase(), 50))
    }, []);

    function compareToTypedLetter(text1, text2 = 'Backspace') {
        // alert("compareToTyped method is runned")
        var words = document.getElementsByClassName("gameletter");
        const car = document.getElementById("user-car");
        if (text2[CarCharIndexNumber] === undefined && text2[CarCharIndexNumber] !== " ") {
            // backspace
            playbackspaceSound();
            words[CarCharIndexNumber].classList.remove("active")
            setCarCharIndexNumber(CarCharIndexNumber - 1)
            words[CarCharIndexNumber - 1].classList.add("with-animation-backword")
            words[CarCharIndexNumber - 1].classList.add("active")
            words[CarCharIndexNumber - 1].classList.remove("pressed")
            words[CarCharIndexNumber - 1].classList.remove("incorrect")
            words[CarCharIndexNumber - 1].classList.remove("correct")
            // console.log(`\'${text1[CarCharIndexNumber - 1]}\'`)
            console.log(compareTo(text1.slice(0, CarCharIndexNumber - 1), text2.slice(0, CarCharIndexNumber + 1)))
            if ((text1[CarCharIndexNumber - 1] === " ") && (compareTo(text1.slice(0, CarCharIndexNumber - 1), text2.slice(0, CarCharIndexNumber + 1)))) {
                setCarMoveingPoint(CarMoveingPoint - 1)
                car.style.transform = `translateX(${1.32 * CarMoveingPoint}vw) scale(.7,.6)`;
            }
        } else if (text1[CarCharIndexNumber] === text2[CarCharIndexNumber]) {
            // correct
            playCorrectKeySound();   // correct key pressed then sound played like typewriter
            // console.log(Letter);
            setCarCharIndexNumber(CarCharIndexNumber + 1);
            (CarCharIndexNumber === 0) ? console.log("start") : words[CarCharIndexNumber].classList.remove("active"); words[0].classList.remove("active");
            if(words[CarCharIndexNumber + 1].classList.contains("with-animation-backword")){
                words[CarCharIndexNumber +1].classList.remove("with-animation-backword")
            }
            words[CarCharIndexNumber + 1].classList.add("active");
            words[CarCharIndexNumber].classList.add("correct")
            // only for car move
            if ((text1[CarCharIndexNumber] === " ") && (text2[CarCharIndexNumber] === " ") && (compareTo(text1.slice(0, CarCharIndexNumber + 1), text2.slice(0, CarCharIndexNumber + 1)))) {
                if ((text1[CarCharIndexNumber - 1] !== " ") && (text1[CarCharIndexNumber + 1] !== " ")) {
                    setCarMoveingPoint(CarMoveingPoint + 1)
                    car.style.transform = `translateX(${1.32 * CarMoveingPoint}vw) scale(.7,.6)`;
                }
            }
            if (text1[0] === text2[CarCharIndexNumber]) { words[CarCharIndexNumber].classList.add("pressed") }
            if (CarTextplaceholderText.length - 1 === CarCharIndexNumber) { window.location.reload() }  // next text are going to show when the user type completely / user typed all given sentances.
        } else {
            // incorrect
            playInCorrectKeySound();
            setCargameIncorrectLetter(CargameIncorrectLetter + 1)
            words[CarCharIndexNumber].classList.remove("active");
            setCarCharIndexNumber(CarCharIndexNumber + 1);
            if(words[CarCharIndexNumber + 1].classList.contains("with-animation-backword")){
                words[CarCharIndexNumber +1].classList.remove("with-animation-backword")
            }
            words[CarCharIndexNumber + 1].classList.add("active");
            words[CarCharIndexNumber + 1].classList.add("pressed");
            words[CarCharIndexNumber].classList.add("incorrect")
        }
        if (text2[CarCharIndexNumber - 1]) { words[CarCharIndexNumber].classList.add("pressed") }
    }

    const handleCarGameTyping = (e) => {
        const pressedKey = e.target.value[CarCharIndexNumber];
        if (
            (pressedKey >= 'a' && pressedKey <= 'z')
            || (pressedKey >= 'A' && pressedKey <= 'Z')
            || (pressedKey >= '0' && pressedKey <= '9')
            || [" ", '<', '>', ',', '.', '?', '/', ';', ':', "'", '"', '{', '[', ']', '}', '|', '_', '-', '+', '='].includes(pressedKey)
            || pressedKey == undefined
        ) {
            compareToTypedLetter(CarTextplaceholderText, e.target.value);
            setCarLatter(e.target.value); // store in array pressed letter
        }
    }


    const focusCargameTyping = () => elemtRef.current.focus();

    return (
        <>
            <HelmetProvider>
                <Helmet><title>Car Game || RandomType</title></Helmet>
                <Container maxWidth="xl">
                    <NavConfig mode={"car-game-mode"} />
                    <Box id="display-car-progress" className="mt-2">
                        <NavGameProgressBar Letter={CarLetter} placeholderText={CarTextplaceholderText} CountDownTimer={CargameCountDownTimer} setCountDownTimer={setCargameCountDownTimer} IncorrectLetter={CargameIncorrectLetter} />
                        <div id='view-carProgress' className='w-11/12 h-52 grid grid-rows-2 gap-0 p-3 bg-white bg-opacity-30 mx-auto mt-1 rounded-xl pl-5'>
                            <div className='flex justify-between pb-3'>
                                <div className='w-full flex items-center border border-0 border-b-2 border-black'>
                                    <div className='w-28 text-xl border border-r-2 border-r-white border-0 py-5'>strenger</div>
                                    {/* <img src={car} id='strenger-car' className='carMove' alt="car" /> */}
                                    <div style={{ width: '200px', height: '200px', fill: 'var(--base_color)' }} id='strenger-car' className='carMove'>
                                        <Car />
                                    </div>
                                </div>
                                <div className='flag' style={{ width: '100px', height: '100px', position:'relative', bottom:'10px', fill: 'var(--base_color)' }}><Flag /></div>
                                {/* <img src={flag} className='flag' alt="flag" /> */}
                            </div>
                            <div className='flex justify-between border border-0 border-t-2 border-white pt-3'>
                                <div className='w-full flex items-center border border-0 border-b-2 border-black'>
                                    <div className='w-28 text-xl border border-r-2 border-r-white border-0 py-5'>{author.username}</div>
                                    {/* <img src={car} id='user-car' className='carMove' alt="car" /> */}
                                    <div style={{ width: '200px', height: '200px', fill: 'var(--base_color)' }} id='user-car' className='carMove'>
                                        <Car />
                                    </div>
                                </div>
                                <div className='flag' style={{ width: '100px', height: '100px', position:'relative', bottom:'10px', fill: 'var(--base_color)' }}><Flag /></div>
                                {/* <img src={flag} className='flag' alt="flag" /> */}
                            </div>
                        </div>
                    </Box>
                    <Box id="cargametypingContainer" className="w-11/12 mx-auto mt-1 focus:outline-none h-[22vh] rounded-xl overflow-hidden bg-opacity-40" onClick={() => cargametypingContainer.classList.remove("blur-md")} onBlur={() => cargametypingContainer.classList.add("blur-md")}>
                        <textarea id="cargame-typing" className="rounded-lg bg-blue-300 focus:outline-none resize-none text-3xl w-[100%] h-[100%] caret-transparent text-transparent text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-[-99] transition" style={{ wordBreak: 'break-all', textAlign: 'justify', textJustify: 'inter-word' }} ref={elemtRef} name="cargame-typing" spellCheck="false" onChange={handleCarGameTyping} autoFocus={true} value={CarLetter}></textarea>
                        <div className="cargame-typing-text">
                            <p id="cargame-paragraph" className='rounded-lg bg-orange-300 focus:outline-none resize-none text-3xl w-[100%] h-[100%] caret-transparent select-none relative top-[-30.4vh] bg-opacity-0 pt-16 px-3' style={{ wordBreak: 'break-all', textAlign: 'justify', textJustify: 'inter-word' }} onClick={focusCargameTyping}>
                                {(CarLetter === "" && CarCharIndexNumber === 0) ? <span id='initial-caret2' className="relative overflow-hidden transition"><div className="caret absolute w-[.1em] h-[30px] bg-yellow-200 left-0 bottom-0 rounded-sm transition"></div></span> : <span></span>}
                                {
                                    CarTextplaceholderText.split("").map((char, index) => (<span key={index} className='gameletter caretline with-animation pt-[-50px] transition-all duration-200 transition'>{char}</span>))
                                }
                            </p>
                        </div>
                    </Box>
                    <div id='btnGame' className='w-11/12 mx-auto mt-4 flex justify-start gap-x-3'>
                        <button className='btnSetting transition shadow text-white scale-100 active:scale-95' style={{ padding: '10px 20px' }}>Play With Friend</button>
                        <button className='btnSetting transition shadow text-white scale-100 active:scale-95' style={{ padding: '10px 20px' }}>Play with Stranger</button>
                    </div>
                </Container>
            </HelmetProvider>
        </>
    )
}

export default CarGame;