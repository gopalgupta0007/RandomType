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
import useSound from 'use-sound';
import keyboardSound from './keyboardSound/Bubble.mp3';
import bellSound from './keyboardSound/lightBell.mp3';
import typeError from './keyboardSound/TypeError2.mp3';

// import { LogarithmicScale } from 'chart.js';
// document.getElementsByClassName("letter")[0].classList.add("active")
// const scrolled = () => {
//     // when typing element of scroll occured then placeholder of an element scrolled according the of textarea  
//     var typing = document.getElementById('typing');
//     var placeholder = document.getElementById('placeholder');
//     console.log("scroll => " + typing.scrollTop);
//     placeholder.scrollTop = typing.scrollTop;
//     typing.scrollTop = placeholder.scrollTop;
// }

// let noOfFirstLineCharacter = 0
// let scrollNum = 0;
// function nextLineStartCaret(typing = document.getElementById('typing')) {
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
//             console.log("scrollNum => ", scrollNum);
//             console.log("now => ", Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
//         }
//     } else {
//         if (0 <= Math.trunc(3 * Math.trunc(typing.selectionStart / Math.trunc(typing.offsetWidth / 14))) && 0 === Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) {
//             noOfFirstLineCharacter = typing.selectionStart;
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
const loadParagraph = () => {
    const index = Math.floor(Math.random() * 10);
    console.log("random num => " + index);
    return normalText[index].toLowerCase()
}


// export const getParagraph =(setText, loadPara)=> {
//     return setText(loadPara());
// }
const Typing = () => {
    // document.getElementsByClassName("letter")[0].classList.add("active");
    // const history = useHistory();
    const typingContainer = document.getElementById("typingContainer");
    // var typing = document.getElementById("typing");
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
    const [IndexNumber, setIndexNumber] = useState(0);
    const [CountDownTimer, setCountDownTimer] = useState(1); // test countdown
    const [IncorrectLetter, setIncorrectLetter] = useState(0);
    const [placeholderText, setplaceholderText] = useState(""); // how much character/word will it be having

    // sounds
    const [playCorrectKeySound] = useSound(keyboardSound,{volume:1});
    const [playInCorrectKeySound] = useSound(bellSound,{volume:2});
    const [playbackspaceSound] = useSound(typeError,{volume:5});
    
    const handleKeyPress = (event) => {
        // this method run before the compareToTyped method
        // alert("handleKeyPress method is runned")
        if (event.shiftKey && event.key === 'Enter') {
            setplaceholderText(loadParagraph())
            const activedCaret = document.querySelectorAll(".active")
            activedCaret.forEach(function (caret) {
                caret.classList.remove("active");
            })
            const pressedKey = document.querySelectorAll(".pressed");
            console.log(Letter);
            pressedKey.forEach(function (element) {
                // clear all caret after again restart typing
                element.removeAttribute("style");
                element.classList.remove("pressed");
                element.classList.remove("correct");
                element.classList.remove("incorrect");
                // compareToTyped("Backspace")
                console.log(element);
            });

            // activeCls
            // setLatter("")
            // setIncorrectLetter(0)
            // setIndexNumber(0)
            // setLatter("")
            // setLatter("")
            setIncorrectLetter(0)
            setIndexNumber(0)
            setLatter("")
            compareToTyped('a','Backspace', true)
            // setplaceholderText(loadParagraph())
            // pressedKey[1].classList.remove("pressed")
            // compareToTyped("a","a")
            // compareToTyped("Backspace","Backspace")
            // compareToTyped("Backspace","Backspace")
        }
    }

    useEffect(() => {
        // Add event listener for the Shift + Enter key press
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    useEffect(() => {
        //generate random number and the according to that number of index of array of the paragram will it be selected
        // getParagraph(setplaceholderText, loadParagraph
        setplaceholderText(loadParagraph())
    }, []);

    function compareToTyped(text1 , text2 = 'Backspace', exception = false) {
        // alert("compareToTyped method is runned")
        var words = document.getElementsByClassName("letter");
        // var span = document.getElementsByTagName('span');
        // compareToTyped("Backspace","Backspace")
        // debugger
        console.log("comapreTotyped method");
        console.log(text1[IndexNumber], "|||||", text2[IndexNumber]);
        console.log(`text2[IndexNumber] =>  "${text2[IndexNumber]}"`);
        console.log(`letter => ${Letter} \n IndexNumber => ${IndexNumber} \n CountDownTimer => ${CountDownTimer} \n IncorrectLetter => ${IncorrectLetter}`);
        // if(words[0].classList.contains('incorrect')&&words[1].classList.contains('active pressed')){
        //     alert("yes")
        //     console.log("yes");
        // }
        // if (words[0].classList.contains('incorrect')&&(words[0]!==text1[0]&&IndexNumber===1)) {
        //     compareToTyped("Backspace")
        //     setIndexNumber(IndexNumber - 1)
        // }
        if (exception) {
            // var element = document.getElementById("active-pressed-correct");

            // // Check if the element exists
            // if (element) {
            //     // Get the current id attribute
            //     var currentId = element.getAttribute("id");
            
            //     // Check if the id contains "active" (case-sensitive) and replace it with an empty string
            //     if (currentId && currentId.includes("active")) {
            //         var newId = currentId.replace("active", "").trim();
            
            //         // Set the new id attribute
            //         element.setAttribute("id", newId);
            //     }
            // }
            
            // var currentId = words[0].getAttribute("class");

            // console.log(currentId);

            // words[IndexNumber].classList.remove("incorrect")
            // console.log(words[IndexNumber]);
            words[0].style.backgroundColor = "transparent";
            words[0].style.color = "white";
            words[0].style.border = "none";
            words[0].classList.add("active")
            words[1].classList.remove("active")
        } else {

            if (text2[IndexNumber] === undefined && text2[IndexNumber] !== " ") {
                // nextLineStartCaret()
                // if (words[0].classList.contains("incorrect")&&words[1].classList.contains("pressed")) {
                //     console.log("yes\nyes\nyes\nyes\nyes\nyes");   
                // }
                console.log("backspace");
                playbackspaceSound();
                setIncorrectLetter(IncorrectLetter + 1)
                // setIncorrectLetter(IncorrectLetter+1)
                // remeber this if any use xwill be only press on Backspace it's working fine but not for ctrl + Backspace.  
                // smoothCaretMotion();
                // before smoothCaretMotion('Backspace');
                // span[IndexNumber + 3].classList.remove("active");
                words[IndexNumber].classList.remove("active")
                setIndexNumber(IndexNumber - 1)
                words[IndexNumber - 1].classList.add("active")
                words[IndexNumber - 1].classList.remove("pressed")
                words[IndexNumber - 1].classList.remove("incorrect")
                words[IndexNumber - 1].classList.remove("correct")
                // span[IndexNumber + 3 - 1].classList.add("active");
                // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
                // console.log("Backspace");
            } else if (text1[IndexNumber] === text2[IndexNumber]) {
                playCorrectKeySound();   // correct key pressed then sound played like typewriter
                console.log(Letter);
                // correct
                // nextLineStartCaret()
                // type matched with list of texts this occur
                // const span = 
                // smoothCaretMotion();
                // span[IndexNumber + 4 - 1].classList.remove("active");
                setIndexNumber(IndexNumber + 1);
                (IndexNumber === 0) ? console.log("start") : words[IndexNumber].classList.remove("active"); words[0].classList.remove("active");
                words[IndexNumber + 1].classList.add("active");
                words[IndexNumber].classList.add("correct")
                // console.log(words[IndexNumber - 1],"|||", text1[IndexNumber - 1])
                // span[IndexNumber + 4].classList.add("active");
                // smoothCaretMotion();
                // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
                // typing.classList.remove("text-red-500");
                // typing.classList.add("text-blue-600");
                // span[IndexNumber+3].classList.add("active");
                // typing.classList.add("correct");
                // try {
                // } catch (error) {
                //     console.log(error);               
                // }
                if (text1[0] === text2[IndexNumber]) { words[IndexNumber].classList.add("pressed") }
                if (placeholderText.length - 1 === IndexNumber) { window.location.reload() }  // next text are going to show when the user type completely / user typed all given sentances.
            } else {
                // incorrect
                playInCorrectKeySound();
                setIncorrectLetter(IncorrectLetter + 1)
                // smoothCaretMotion();
                // span[IndexNumber + 4 - 1].classList.remove("active");
                words[IndexNumber].classList.remove("active");
                setIndexNumber(IndexNumber + 1);
                words[IndexNumber + 1].classList.add("active");
                words[IndexNumber + 1].classList.add("pressed");
                words[IndexNumber].classList.add("incorrect")
                // span[IndexNumber + 4].classList.add("active");
                // setLatter(applyColorToCharacter(Letter+text2[IndexNumber], IndexNumber, "red"))
                // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
                // console.log("incorrect");
            }
            if (text2[IndexNumber - 1]) { words[IndexNumber].classList.add("pressed") }
            console.log("indexNumber => ", IndexNumber);
        }
    }

    const handleTyping = (e) => {
        // console.log("value of e => ",e.nativeEvent.data);
        // console.log("value of e => ",e);
        compareToTyped(placeholderText, e.target.value);
        setLatter(e.target.value); // store in array pressed letter
    }

    const focusTyping = () => {
        elementRef.current.focus();
        // compareToTyped()
        console.log("elementRef => ", elementRef)
    }

    const countDownTimerMethod = (countdown) => setCountDownTimer(countdown);    // take data from child

    function restartTyping(event) {
        event.preventDefault();
        window.location.reload()
    }
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
                        {/* <div id ='caret' className="w-[25px] h-[.5rem] flex flex-col rounded-md absolute z-10 bg-blue-500"></div> */}
                        <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-transparent text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-[-99] overflow-y-hidden" style={{ wordBreak: 'break-all' }} /*onScroll={scrolled}*/ name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea>
                        <div className="typing-text">
                            <p id="paragraph" className='rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none relative top-[-30.4vh] overflow-hidden bg-opacity-0 opacity-40' style={{ wordBreak: 'break-all' }} onClick={focusTyping}>
                                {(Letter === "" && IndexNumber === 0) ? <span id='initial-caret' className="relative"><div className="caret absolute w-7 h-[5px] bg-yellow-200 left-0 bottom-0 rounded-sm"></div></span> : <span></span>}
                                {
                                    // placeholderText.split("").map((char, index) => (<span key={index} className={(index === 0) ? 'letter active text-white' : 'letter text-white transition-all duration-200'} >{char}</span>))
                                    placeholderText.split("").map((char, index) => (<span key={index} className='letter text-white transition-all duration-200'>{char}</span>))
                                }
                            </p>
                        </div>
                        {/* <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-blue-600 text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-50 overflow-y-hidden" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea> */}
                        {/* <textarea className="rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none placeholder:text-white relative top-[-30.4vh] overflow-hidden bg-opacity-0 opacity-40" style={{ wordBreak: 'break-all' }} onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea> */}
                    </Box>
                    <br />
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