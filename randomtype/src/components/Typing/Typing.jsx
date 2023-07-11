import { Box, Container } from '@mui/material'
import React, { useState, useRef, useEffect, memo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import normalText from "./storedText";
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Timer from './TestCalculate/Timer';
import WPM from './TestCalculate/WPM';
import Accuracy from './TestCalculate/Accuracy';

const scrolled = () => {
    // when typing element of scroll occured then placeholder of an element scrolled according the of textarea  
    var typing = document.getElementById('typing');
    var placeholder = document.getElementById('placeholder');
    console.log("scroll => " + typing.scrollTop);
    placeholder.scrollTop = typing.scrollTop;
    typing.scrollTop = placeholder.scrollTop;
}

let noOfFirstLineCharacter = 0
function smoothCaretMotion(typing = document.getElementById('typing')) {
    // fully smooth movement of caret x-axis and y-axis also
    let xvalue = 1.8 * typing.selectionStart;
    const caret = document.getElementById("caret");
    if (Math.trunc(Math.ceil(xvalue)) >= Math.trunc(typing.offsetWidth / 14)) {
        xvalue = (xvalue - noOfFirstLineCharacter * 1.8 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
        // xvalue = (xvalue-(1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))))-(noOfFirstLineCharacter*1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
    }
    if (0 < Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) {
        // this only run when the caret position does not haveing on first line of the text
        console.log("working");
    } else {
        if (0 <= Math.trunc(3 * Math.trunc(typing.selectionStart / Math.trunc(typing.offsetWidth / 14))) && 0 === Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) {
            noOfFirstLineCharacter = typing.selectionStart;
            // noOfFirstLineCharacter = (backspace == 'Backspace') ? noOfFirstLineCharacter - 1 : noOfFirstLineCharacter + 1;
            console.log("noOfFirstLineCharacter => " + noOfFirstLineCharacter);
        }
    }
    caret.style.transform = `translate(${(xvalue)}rem,${Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))}rem)`;
    // console.log(Math.trunc(Math.ceil(xvalue)) +" || "+ Math.trunc(typing.offsetWidth/14));
    // console.log("nonCaret => "+1.8*typing.selectionStart +" || "+ "Caret => "+xvalue);
    caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
}
// xvalue = (xvalue - ((noOfFirstLineCharacter * 1.8) * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
// xvalue = ((xvalue-(1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) - ((noOfFirstLineCharacter * 1.8) * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
// console.log("xvalue => "+xvalue)    
// console.log("noOfFirstLineCharacter*1.8 => "+noOfFirstLineCharacter*1.8)
// console.log("y => "+Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))

const Typing = () => {
    const typingContainer = document.getElementById("typingContainer");
    const typing = document.getElementById("typing");
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
    const [IndexNumber, setIndexNumber] = useState(0);
    const [CountDownTimer, setCountDownTimer] = useState(0); // test countdown
    const [IncorrectLetter, setIncorrectLetter] = useState(0);
    const [placeholderText, setplaceholderText] = useState(""); // how much character/word will it be having

    useEffect(() => {
        //generate random number and the according to that number of index of array of the paragram will it be selected
        const index = Math.floor(Math.random() * 10);
        console.log("random num => " + index);
        setplaceholderText(normalText[index].toLowerCase());
    }, [])

    // function applyColorToCharacter(text, index, color) {
    //     const chars = text.split("");
    //     chars[index] = `<span style={{color: ${color}}}>${chars[index]}</span>`;
    //     console.log("changeval " + chars.join(""))
    //     return chars.join("");
    // }

    function typingTestContext() {

    }

    function compareToTyped(text1, text2 = 'Backspace') {
        if (text2[IndexNumber] == undefined && text2[IndexNumber] !== " ") {
            setIncorrectLetter(IncorrectLetter + 1)
            // setIncorrectLetter(IncorrectLetter+1)
            // remeber this if any use will be only press on Backspace it's working fine but not for ctrl + Backspace.  
            smoothCaretMotion();
            // before smoothCaretMotion('Backspace');
            setIndexNumber(IndexNumber - 1)
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("Backspace");
            typing.classList.add("text-red-500");
        } else if (text1[IndexNumber] === text2[IndexNumber]) {
            // type matched with list of texts this occur
            smoothCaretMotion();
            setIndexNumber(IndexNumber + 1);
            // smoothCaretMotion();
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            typing.classList.remove("text-red-500");
            typing.classList.add("text-blue-500");
            if (placeholderText.length - 1 == IndexNumber) { window.location.reload() }  // next text are going to show when the user type completely / user typed all given sentances.
        } else {
            setIncorrectLetter(IncorrectLetter + 1)
            smoothCaretMotion();
            setIndexNumber(IndexNumber + 1);
            // setLatter(applyColorToCharacter(Letter+text2[IndexNumber], IndexNumber, "red"))
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("incorrect");
            typing.classList.remove("text-red-500");
            typing.classList.add("text-blue-500");
        }
    }

    const handleTyping = (e) => {
        compareToTyped(placeholderText, e.target.value);
        setLatter(e.target.value);
        //while key down then sound occur
        // const audio = new Audio('mech-keyboard.mp3');
        // audio.play();
    }

    const focusTyping = () => {
        elementRef.current.focus();
        console.log("elementRef => " + elementRef)
    }

    const countDownTimerMethod = (countdown) => setCountDownTimer(countdown);    // take data from child

    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing...</title></Helmet>
                <Container maxWidth="xl" style={{marginTop:'2cm'}}>
                    <Box id="testDetails" className="text-white flex xl:gap-x-[20vw] lg:gap-x-[15vw] md:gap-x-[10vw] sm:gap-x-[8vw] gap-x-[8vw] my-5 mt-10 xl:text-4xl md:text-3xl justify-center">
                        <div id='wpm' className='flex'>
                            <h1 className='flex'>WPM : <WPM countdown={CountDownTimer} word={Letter.split(" ").length - 1} /></h1>
                        </div>
                        <div id='accuracy' className='flex'>
                            <h1 className='flex'>Accuracy : <Accuracy countdown={CountDownTimer} incorrectLetter={IncorrectLetter} totalChar={placeholderText.split("").length} />%</h1>
                        </div>
                        <div id='timer' className='flex'>
                            <h1 className='flex'>Timer : {(Letter.length > 0) ? <Timer takeCountdown={countDownTimerMethod} /> : 0}s</h1>
                        </div>
                    </Box>
                    <Box id="typingContainer" className="border-transparent focus:outline-none border-2 h-[30vh] m-5 mt-10 mx-10 rounded-lg" onClick={() => typingContainer.classList.remove("blur-md")} onBlur={() => typingContainer.classList.add("blur-md")}>
                        <div id='caret' className="w-[5px] h-[3.5rem] flex flex-col rounded-md absolute z-10 bg-blue-500"></div>
                        <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-blue-200 text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-50 overflow-y-hidden" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea>
                        <textarea className="rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none placeholder:text-white relative top-[-30.4vh] overflow-hidden bg-opacity-0 opacity-40" style={{ wordBreak: 'break-all' }} onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea>
                    </Box>
                    <div id='re-start-logo' className='text-center'>
                        <ReplayIcon className='cursor-pointer text-white rounded-none hover:rounded-md' sx={{ transform: 'scale(1.5)', "&:hover": { transform: 'scale(2)', backgroundColor:'red' }, transition: 'transform 300ms' }} onClick={(e) => { e.preventDefault(); window.location.reload(); }} />
                    </div><br />
                    <div className='relative bottom-[-12rem]'>
                        <div id="key" className='flex text-white justify-center mt-[-20px]'>
                            <div>
                                <div className='flex'>
                                    <kbd>ctrl</kbd>+<kbd>?</kbd> <ArrowRightAltIcon /> <h6>To Know More</h6>
                                </div>
                                <div className='flex'>
                                    <kbd>shift</kbd>+<kbd>enter</kbd> <ArrowRightAltIcon /> <h6>Restart Typing</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </HelmetProvider>
        </>
    )
}

export default memo(Typing);        