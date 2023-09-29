import { Box, Container } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import normalText from "./storedText";
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Timer from './TestCalculate/Timer';
import WPM from './TestCalculate/WPM';
import Accuracy from './TestCalculate/Accuracy';
import Result from '../Result/Result';

const scrolled = () => {
    // when typing element of scroll occured then placeholder of an element scrolled according the of textarea  
    var typing = document.getElementById('typing');
    var placeholder = document.getElementById('placeholder');
    console.log("scroll => " + typing.scrollTop);
    placeholder.scrollTop = typing.scrollTop;
    typing.scrollTop = placeholder.scrollTop;
}

let noOfFirstLineCharacter = 0
let scrollNum = 0;
// function smoothCaretMotion(typing = document.getElementById('typing')) {
//     // fully smooth movement of caret x-axis and y-axis also
//     // this 1.8 has 54% of original text
//     let xvalue = 1.8 * typing.selectionStart;
//     const caret = document.getElementById("caret");
//     if (Math.trunc(Math.ceil(xvalue)) >= Math.trunc(typing.offsetWidth / 14)) {
//         xvalue = (xvalue - noOfFirstLineCharacter * 1.8 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
//         // xvalue = (xvalue-(1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))))-(noOfFirstLineCharacter*1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
//     }
//     if (0 < Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) {
//         if (Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))) > 6 + scrollNum) {  // 6(2nd line from top 3rem means 6/3=2 ) when user tried to go on 2rd line so scroll the Textarea
//             // when user come in 3rd line while typing
//             scrollNum += 3;
//             // typing.scrollTop+=42.4; // scrolling is not happends
//         }
//         console.log("scrollNum => ", scrollNum);
//         console.log("now => ", Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
//         // this only run when the caret position does not haveing on first line of the text
//         // xvalue = xvalue-1.8;
//         // console.log(Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
//     } else {
//         if (0 <= Math.trunc(3 * Math.trunc(typing.selectionStart / Math.trunc(typing.offsetWidth / 14))) && 0 === Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) {
//             noOfFirstLineCharacter = typing.selectionStart;
//             // noOfFirstLineCharacter = (backspace == 'Backspace') ? noOfFirstLineCharacter - 1 : noOfFirstLineCharacter + 1;
//             // console.log("noOfFirstLineCharacter => " + noOfFirstLineCharacter);
//         }
//     }
//     caret.style.transform = `translate(${(xvalue)}rem,${Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))}rem)`;
//     // console.log(Math.trunc(Math.ceil(xvalue)) +" || "+ Math.trunc(typing.offsetWidth/14));
//     // console.log("this => "+Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
//     // console.log("nonCaret => " + Math.round(xvalue/1.8) + " || " + "Orignal Caret => " + typing.selectionStart);
//     // console.log("y => ",Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
//     caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
// }
// xvalue = (xvalue - ((noOfFirstLineCharacter * 1.8) * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
// xvalue = ((xvalue-(1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) - ((noOfFirstLineCharacter * 1.8) * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
// console.log("xvalue => "+xvalue)    
// console.log("noOfFirstLineCharacter*1.8 => "+noOfFirstLineCharacter*1.8)
// console.log("y => "+Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))

const Typing = () => {
    // const history = useHistory();
    const typingContainer = document.getElementById("typingContainer");
    const typing = document.getElementById("typing");
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
    const [IndexNumber, setIndexNumber] = useState(0);
    const [CountDownTimer, setCountDownTimer] = useState(1); // test countdown
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
    
    // function typingTestContext() {
        
        // }
        
    function compareToTyped(text1, text2 = 'Backspace') {
        var span = document.getElementsByTagName('span');
        if (text2[IndexNumber] == undefined && text2[IndexNumber] !== " ") {
            setIncorrectLetter(IncorrectLetter + 1)
            // setIncorrectLetter(IncorrectLetter+1)
            // remeber this if any use will be only press on Backspace it's working fine but not for ctrl + Backspace.  
            // smoothCaretMotion();
            // before smoothCaretMotion('Backspace');
            span[IndexNumber+3].classList.remove("active");
            setIndexNumber(IndexNumber - 1)
            span[IndexNumber+3-1].classList.add("active");
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            // console.log("Backspace");
            typing.classList.add("text-red-500");
        } else if (text1[IndexNumber] === text2[IndexNumber]) {
            // type matched with list of texts this occur
            // const span = 
            // smoothCaretMotion();
            span[IndexNumber+4-1].classList.remove("active");
            setIndexNumber(IndexNumber + 1);
            span[IndexNumber+4].classList.add("active");
            // smoothCaretMotion();
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            // typing.classList.remove("text-red-500");
            // typing.classList.add("text-blue-600");
            // span[IndexNumber+3].classList.add("active");
            // typing.classList.add("correct");
            if (placeholderText.length - 1 == IndexNumber) { window.location.reload() }  // next text are going to show when the user type completely / user typed all given sentances.
        } else {
            setIncorrectLetter(IncorrectLetter + 1)
            // smoothCaretMotion();
            span[IndexNumber+4-1].classList.remove("active");
            setIndexNumber(IndexNumber + 1);
            span[IndexNumber+4].classList.add("active");
            // setLatter(applyColorToCharacter(Letter+text2[IndexNumber], IndexNumber, "red"))
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            // console.log("incorrect");
            typing.classList.remove("text-red-500");
            typing.classList.add("text-blue-600");
        }
    }

    const handleTyping = (e) => {
        compareToTyped(placeholderText, e.target.value);
        setLatter(e.target.value);
        //while key down then sound occur
        // const audio = new Audio("../../");
        // audio.play();
    }

    const focusTyping = () => {
        elementRef.current.focus();
        console.log("elementRef => " + elementRef)
    }

    const countDownTimerMethod = (countdown) => setCountDownTimer(countdown);    // take data from child

    function restartTyping(event) { event.preventDefault(); window.location.reload() }

    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing...</title></Helmet>
                {(CountDownTimer <= 0) ? <Result /> : <Container maxWidth="xl" style={{ marginTop: '2cm' }}>
                    <Box id="testDetails" className="text-white flex xl:gap-x-[20vw] lg:gap-x-[15vw] md:gap-x-[10vw] sm:gap-x-[8vw] gap-x-[8vw] my-5 mt-10 xl:text-4xl md:text-3xl justify-center">
                        <div id='wpm' className='flex'>
                            <h1 className='flex'>WPM : {(Letter.length > 0) ? <WPM countdown={CountDownTimer} word={Letter.split(" ").length - 1} /> : 0}</h1>
                        </div>
                        <div id='accuracy' className='flex'>
                            <h1 className='flex'>Accuracy :  {(Letter.length > 0) ? <Accuracy countdown={CountDownTimer} incorrectLetter={IncorrectLetter} totalChar={placeholderText.split("").length} /> : 100}%</h1>
                        </div>
                        <div id='timer' className='flex'>
                            <h1 className='flex'>Timer : {(Letter.length > 0) ? <Timer takeCountdown={countDownTimerMethod} /> : 30}s</h1>
                        </div>
                    </Box>
                    <Box id="typingContainer" className="border-transparent focus:outline-none border-2 h-[30vh] m-5 mt-10 mx-10 rounded-lg overflow-hidden" onClick={() => typingContainer.classList.remove("blur-md")} onBlur={() => typingContainer.classList.add("blur-md")}>
                        {/* <div id='caret' className="w-[5px] h-[3.5rem] flex flex-col rounded-md absolute z-10 bg-blue-500"></div> */}
                        <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-blue-600 text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-[-99] overflow-y-hidden" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea>
                        <div className="typing-text">
                            <p id="paragraph" className='rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none placeholder:text-white relative top-[-30.4vh] overflow-hidden bg-opacity-0 opacity-40' style={{ wordBreak: 'break-all', color:'white' }} onClick={focusTyping}>
                                {
                                    placeholderText.split("").map((char, index) => (<span key={index} >{char}</span>))
                                }
                            </p>
                        </div>
                        {/* <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-blue-600 text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-50 overflow-y-hidden" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea> */}
                        {/* <textarea className="rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none placeholder:text-white relative top-[-30.4vh] overflow-hidden bg-opacity-0 opacity-40" style={{ wordBreak: 'break-all' }} onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea> */}
                    </Box>
                    <div id='re-start-logo' className='text-center'>
                        <ReplayIcon className='cursor-pointer text-white rounded-none hover:rounded-md' sx={{ transform: 'scale(1.5)', "&:hover": { transform: 'scale(2)', backgroundColor: 'red' }, transition: 'transform 300ms' }} onClick={(e) => restartTyping(e)} />
                    </div><br />
                    <div className='relative bottom-[-10rem]'>
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
                </Container>}
            </HelmetProvider>
        </>
    )
}

export default Typing;

// z index has to be changed of input tag