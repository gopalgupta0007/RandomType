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

import keyboard from '../rtsetting/sounds/keyboard.mp3'
import bell from '../rtsetting/sounds/bell.mp3'
import mechanical from '../rtsetting/sounds/mechanical.mp3'
import perkins_bell from '../rtsetting/sounds/perkins_bell.mp3'
import bubble from '../rtsetting/sounds/bubble.mp3'
import carriage from '../rtsetting/sounds/carriage.mp3'
import click from '../rtsetting/sounds/click.mp3'
import ding from '../rtsetting/sounds/ding.mp3'
import kclick from '../rtsetting/sounds/kclick.mp3'
import lightbell from '../rtsetting/sounds/lightbell.mp3'
import typeErrorsound from '../rtsetting/sounds/typeError.mp3'// import bubble from '../rtsetting/sounds/bubble.mp3';

import NavConfig from '../Mode/NavConfig';
import { useSelector } from 'react-redux';
import { generateRandomNumber, generateRandomText, latter } from './textGenerator';
// import { LogarithmicScale } from 'chart.js';
// document.getElementsByClassName("letter")[0].classList.add("active")
// var totalnum = document.getElementsByClassName("letter")[0].offsetWidth;
var totalnum = 24;
// let noOfFirstLineCharacter = 0
// let scrollNum = 0;
// function nextLineStartCaret(typing = document.getElementById('typing')) {
//     console.log("nextLineStartCaret start");
//     // fully smooth movement of caret x-axis and y-axis also
//     // this 1.8 has 54% of original text
//     let xvalue = 1.8 * typing.selectionStart;
//     // const caret = document.getElementById("caret");
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
//     // caret.style.transform = `translate(${(xvalue)}rem,${Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))}rem)`;
//     // console.log(Math.trunc(Math.ceil(xvalue)) +" || "+ Math.trunc(typing.offsetWidth/14));
//     // console.log("this => "+Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
//     // console.log("nonCaret => " + Math.round(xvalue/1.8) + " || " + "Orignal Caret => " + typing.selectionStart);
//     // console.log("y => ",Math.trunc(3 * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
//     // caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
//     console.log("nextLineStartCaret end");
// }
// xvalue = (xvalue - ((noOfFirstLineCharacter * 1.8) * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
// xvalue = ((xvalue-(1.8*Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) - ((noOfFirstLineCharacter * 1.8) * Math.trunc(1.8 * typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
// console.log("xvalue => "+xvalue)    
// console.log("noOfFirstLineCharacter*1.8 => "+noOfFirstLineCharacter*1.8)
// console.log("y => "+Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))


export function getNumberOfWords(text, noOfWords) {
    console.log(text);
    const words = text?.split(' ');// Split the text into words
    return words?.slice(0, noOfWords).join(' ');// Take the first 50 words
}

// export const getParagraph =(setText, loadPara)=> {
//     return setText(loadPara());
// }
const Typing = () => {
    // document.getElementsByClassName("letter")[0].classList.add("active");
    var typingContainer = document.getElementById("typingContainer");
    const author = useSelector(state => state.AuthorReducer.UserData);
    const auth = useSelector(state => state.AuthReducer.auth);
    // var typing = document.getElementById("typing");
    // const [textsIndexNumber, settextsIndexNumber] = useState(0);
    const elementRef = useRef(null);
    const activeTypingRef = useRef(null);
    const [Letter, setLatter] = useState("");
    // const [paraHeight, setParaHeight] = useState(0);
    const [IndexNumber, setIndexNumber] = useState(0);
    const [CountDownTimer, setCountDownTimer] = useState(author.data.time); // Timer component set the time
    const [IncorrectLetter, setIncorrectLetter] = useState(0);
    const [CorrectLetter, setCorrectLetter] = useState(0);
    const [placeholderText, setplaceholderText] = useState(""); // how much character/word will it be having
    const [selectedSound, setSelectedSound] = useState(
        author.data.setting.sounds.sound == "keyboard" ? keyboard :
            author.data.setting.sounds.sound == "bell" ? bell :
                author.data.setting.sounds.sound == "mechanical" ? mechanical :
                    author.data.setting.sounds.sound == "perkins_bell" ? perkins_bell :
                        author.data.setting.sounds.sound == "bubble" ? bubble :
                            author.data.setting.sounds.sound == "carriage" ? carriage :
                                author.data.setting.sounds.sound == "click" ? click :
                                    author.data.setting.sounds.sound == "ding" ? ding :
                                        author.data.setting.sounds.sound == "kclick" ? kclick :
                                            author.data.setting.sounds.sound == "none" ? null : null
    );
    const [soundVolume, setSoundVolume] = useState(
        author.data.setting.sounds.volume === 'high' ? 5 :
            author.data.setting.sounds.volume === 'mid' ? 3 :
                author.data.setting.sounds.volume === 'low' ? 1 :
                    author.data.setting.sounds.volume === 'mute' ? 0 : 0
    ); // how much character/word will it be having

    // console.log(author);
    // console.log(soundVolume);
    const [playCorrectKeySound] = useSound(selectedSound, { volume: soundVolume });
    const [playInCorrectKeySound] = useSound(lightbell, { volume: soundVolume });
    const [playbackspaceSound] = useSound(typeErrorsound, { volume: soundVolume });
    // useEffect(() => {
    //     if (IndexNumber>0) {
    //         const caret = document.getElementsByClassName("active")[1];
    //         const caretPosition = caret.getBoundingClientRect();
    //         console.log("caretPosition => ", caretPosition);
    //     }
    // })
    useEffect(() => {
        // setplaceholderText(getNumberOfWords(loadParagraph(), 100))
        if (auth) {
            setplaceholderText(getNumberOfWords(loadParagraph(), author.data.text))
        }
    }, [author.data.mode, author.data.text])

    useEffect(() => {
        //generate random number and the according to that number of index of array of the paragram will it be selected
        // getParagraph(setplaceholderText, loadParagraph
        if (auth) {
            setplaceholderText(getNumberOfWords(loadParagraph(), author.data.text))
        }
        if (!auth) {
            setplaceholderText(getNumberOfWords(loadParagraph()))
        }
    }, []);

    useEffect(() => {
        // totalnum is add all width of typed letter

        // let example total width of the caracter(totalnum) devide by parent container of the caracters  ====> totalnum
        var line_Number = Math.ceil(totalnum / document.getElementById("typingContainer").offsetWidth);
        // setParaHeight(line_Number)
        console.log("---------------------", line_Number)
        // console.log("---------linedivisiton------------",totalnum/line_Number)
        if (IndexNumber > 1) {
            // handleScrollDown(Math.ceil(totalnum/document.getElementById("typingContainer").offsetWidth))
            handleScrollDown(line_Number)
        }
    }, [totalnum])



    const handleScrollDown = (num = 1) => {
        // these method handle the when the scroll happends according to the user typed letters

        // const container = document.getElementById("typingContainer");
        // const container = document.getElementById('typingTxt');
        const container = document.getElementById('paragraph');
        if (container && num > 2) {
            // Scroll down by 50 pixels
            // container.scrollTop += 60*1 ;                                                           
            try {
                var height_of_letter = document.getElementsByClassName("letter")[1].getBoundingClientRect().height;  // get to know the heihgt of the letters
            } catch (error) {
                console.log(error);
            }
            // 71.2 * 16/100 => 60pixel so i need to scroll 
            // container.scrollTop += Math.ceil((Math.ceil(height_of_letter))-(Math.ceil(Math.ceil(height_of_letter)*16/100)))*num; // 60
            // container.scrollBy(0, Math.ceil((Math.ceil(height_of_letter))-(Math.ceil(Math.ceil(height_of_letter)*16/100)))*1);
            container.scrollTop = Math.ceil((Math.ceil(height_of_letter)) - (Math.ceil(Math.ceil(height_of_letter) * 16 / 100))) * (num - 2); // 60
            console.log("scorll ==================> ", container.scrollTop, " |||||| ", Math.ceil((Math.ceil(height_of_letter)) - (Math.ceil(Math.ceil(height_of_letter) * 16 / 100))) * (num - 2));
        }
    };

    function restartTypingTest() {
        // every time new text give for the test

        setplaceholderText(getNumberOfWords(loadParagraph(), author.data.text))
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
        totalnum = 24;
        setCountDownTimer(author.data.time)
        setIncorrectLetter(0)
        setIndexNumber(0)
        setLatter("")
    }

    const restartTyping = () => {
        // restart typing test with focus textarea automatically at a time
        restartTypingTest()
        typingContainer.classList.remove("blur-md")
        focusTyping();
    }

    function loadParagraph() {
        // Math.floor(Math.random() * 10) ==> generate random number between 0-10

        if (auth) {
            if (author.data.mode === "number") {
                return generateRandomNumber();
            } else if (author.data.mode === "random") {
                return generateRandomText();
            } else if ((author.data.mode === "simple") || (author.data.mode === "")) {
                return normalText[Math.floor(Math.random() * 10)].toLowerCase()
            } else if (author.data.mode === "custom") {
                if (localStorage.getItem("custom_text")) {
                    return localStorage.getItem("custom_text");
                } else {
                    return normalText[Math.floor(Math.random() * 10)].toLowerCase()
                }
                //restart typing
            }
        } else {
            return normalText[Math.floor(Math.random() * 10)].toLowerCase()
        }
    }


    const handleKeyPress = (event) => {
        // this method run before the compareToTyped method
        // alert("handleKeyPress method is runned")
        if (event.shiftKey && event.key === 'Enter') {
            restartTyping();
        }
    }

    useEffect(() => {
        // Add event listener for the Shift + Enter key press
        // IndexNumber > 1 ? console.log(document.getElementById("typingContainer").offsetWidth) : console.log('');
        window.addEventListener('keydown', handleKeyPress);

        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('keydown', handleKeyPress);
        };
    });

    // const typingContainer = document.getElementById("typingContainer").offsetWidth; 
    function compareToTyped(text1, text2 = 'Backspace') {
        // alert("compareToTyped method is runned")
        var words = document.getElementsByClassName("letter");
        // console.log("beforeindexNumber => ", IndexNumber);
        // activeTypingRef.current.click();
        // activeTypingRef.current.focus();
        if (text2[IndexNumber] === undefined && text2[IndexNumber] !== " ") {
            // nextLineStartCaret()
            // if (words[0].classList.contains("incorrect")&&words[1].classList.contains("pressed")) {
            //     console.log("yes\nyes\nyes\nyes\nyes\nyes");   
            // }
            console.log("backspace");
            playbackspaceSound();
            // setIncorrectLetter(IncorrectLetter + 1)
            // setIncorrectLetter(IncorrectLetter+1)
            // remeber this if any use xwill be only press on Backspace it's working fine but not for ctrl + Backspace.  
            // smoothCaretMotion();
            // smoothCaretMotion('Backspace')
            // before smoothCaretMotion('Backspace');
            // span[IndexNumber + 3].classList.remove("active");
            words[IndexNumber].classList.remove("active")
            setIndexNumber(IndexNumber - 1)
            // with-animation-backword
            words[IndexNumber - 1].classList.add("with-animation-backword")
            words[IndexNumber - 1].classList.add("active")
            words[IndexNumber - 1].classList.remove("pressed")
            words[IndexNumber - 1].classList.remove("incorrect")
            words[IndexNumber - 1].classList.remove("correct")
            // setCorrectLetter(CorrectLetter+1)
            // span[IndexNumber + 3 - 1].classList.add("active");
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            // console.log("Backspace");
            // nextLineStartCaret()
            if (IndexNumber > 0) {
                // console.log(document.getElementsByClassName("letter")[IndexNumber - 1].offsetWidth)
                totalnum = IndexNumber > 1 ? totalnum - document.getElementsByClassName("letter")[IndexNumber - 2].offsetWidth : 24;
            }
            if (text1[IndexNumber] === text2[IndexNumber]) {
                alert(text1[IndexNumber - 1], " === ", text2[IndexNumber - 1]);
                console.log("thses latter => ", text2[IndexNumber - 1]);
                setCorrectLetter((CorrectLetter <= 0) ? 0 : CorrectLetter - 1);
            } else {
                setIncorrectLetter((IncorrectLetter <= 0) ? 0 : IncorrectLetter - 1);
            }
        } else if (text1[IndexNumber] === text2[IndexNumber]) {
            playCorrectKeySound();   // correct key pressed then sound played like typewriter
            console.log(Letter);
            console.log();
            // smoothCaretMotion()
            // correct
            // nextLineStartCaret()
            // type matched with list of texts this occur
            // const span = 
            // smoothCaretMotion();
            // span[IndexNumber + 4 - 1].classList.remove("active");
            setIndexNumber(IndexNumber + 1);
            (IndexNumber === 0) ? console.log("start") : words[IndexNumber].classList.remove("active"); words[0].classList.remove("active");
            words[IndexNumber + 1].classList.add("active");
            if (IndexNumber > 0) {
                // console.log(document.getElementsByClassName("letter")[IndexNumber - 1].offsetWidth)
                totalnum = totalnum + document.getElementsByClassName("letter")[IndexNumber - 1].offsetWidth;
                totalnum = totalnum + 1;
            }
            if (words[IndexNumber + 1].classList.contains("with-animation-backword")) {
                words[IndexNumber + 1].classList.remove("with-animation-backword")
            }
            words[IndexNumber].classList.add("correct")
            setCorrectLetter(CorrectLetter + 1)
            // console.log(words[IndexNumber - 1],"|||", text1[IndexNumber - 1])
            // span[IndexNumber + 4].classList.add("active");
            // smoothCaretMotion();
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            // typing.classList.remove("text-red-500");
            // typing.classList.add("text-blue-600");
            // span[IndexNumber+3].classList.add("active");
            // nextLineStartCaret()
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
            // nextLineStartCaret()
            words[IndexNumber].classList.remove("active");
            setIndexNumber(IndexNumber + 1);
            if (words[IndexNumber + 1].classList.contains("with-animation-backword")) {
                words[IndexNumber + 1].classList.remove("with-animation-backword")
            }
            words[IndexNumber + 1].classList.add("active");
            words[IndexNumber + 1].classList.add("pressed");
            words[IndexNumber].classList.add("incorrect")
            if (IndexNumber > 0) {
                console.log(document.getElementsByClassName("letter")[IndexNumber - 1].offsetWidth)
                totalnum = totalnum + document.getElementsByClassName("letter")[IndexNumber - 1].offsetWidth;
                totalnum = totalnum + 1;
                console.log("totalnum ==========> ", totalnum);
                console.log("totalnum ==========> ", totalnum);
                console.log("totalnum ==========> ", totalnum);
                console.log("totalnum ==========> ", totalnum);
                console.log("totalnum ==========> ", totalnum);
            }
            // nextLineStartCaret()
            // span[IndexNumber + 4].classList.add("active");
            // setLatter(applyColorToCharacter(Letter+text2[IndexNumber], IndexNumber, "red"))
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            // console.log("incorrect");
        }
        if (text2[IndexNumber - 1]) { words[IndexNumber].classList.add("pressed") }
        // console.log("afterindexNumber => ", IndexNumber);
    }

    const handleTyping = (e) => {
        // console.log("value of e => ",e.nativeEvent.data);

        const pressedKey = e.target.value[IndexNumber];
        if (
            (pressedKey >= 'a' && pressedKey <= 'z')
            || (pressedKey >= '0' && pressedKey <= '9')
            || latter
            || [" ", '<', '>', ',', '.', '?', '/', ';', ':', "'", '"', '{', '[', ']', '}', '|', '_', '-', '+', '='].includes(pressedKey)
            || pressedKey === undefined
        ) {
            compareToTyped(placeholderText, e.target.value);
            setLatter(e.target.value); // store in array pressed letter
        }
    }

    const focusTyping = () => {
        elementRef.current.focus();
        // compareToTyped()
        // console.log("elementRef => ", elementRef)
    }

    // take data from child component
    const countDownTimerMethod = (countdown) => setCountDownTimer(countdown);    // take data from child

    return (
        <>
            <HelmetProvider>
                <Helmet><title>Testing || RandomType</title></Helmet>
                {((CountDownTimer <= 0)|| (placeholderText?.length === IndexNumber + 1)) ? <Result restartTypingTest={restartTypingTest} keyData={{ Letter, IndexNumber, IncorrectLetter, CorrectLetter, placeholderText }} /> : <Container maxWidth="xl" style={{ marginTop: '2.5cm' }}>
                    {auth
                        &&
                        <div id='typing-nav-config' className='mt-[-2.5cm] mb-10'>
                            <NavConfig mode={"typing-test-mode"} restartTypingTest={restartTypingTest} />
                        </div>}
                    <Box id="testDetails" className="text-bnw flex xl:gap-x-[20vw] lg:gap-x-[15vw] md:gap-x-[10vw] sm:gap-x-[8vw] gap-x-[8vw] my-5 mt-10 xl:text-4xl md:text-3xl justify-center">
                        <div id='wpm' className='flex'>
                            <h1 className='flex'>WPM :&nbsp;{(Letter.length > 0) ? <WPM countdown={CountDownTimer} word={Letter.split(" ").length} /> : 0}</h1>
                        </div>
                        <div id='accuracy' className='flex'>
                            <h1 className='flex'>Accuracy :&nbsp;{(Letter.length > 0) ? <Accuracy countdown={CountDownTimer} incorrectLetter={IncorrectLetter} totalChar={placeholderText.split("").length} /> : 100}%</h1>
                        </div>
                        <div id='timer' className='flex'>
                            <h1 className='flex'>Timer :&nbsp;{(Letter.length > 0) ? <Timer takeCountdown={countDownTimerMethod} auth={auth} /> : auth ? author.data.time : 30}s</h1>
                        </div>
                    </Box>
                    <Box id="typingContainer" className="border-transparent focus:outline-none border-2 h-[27vh] m-5 rounded-lg overflow-auto" onClick={() => typingContainer.classList.remove("blur-md")} onBlur={() => typingContainer.classList.add("blur-md")}>
                        {/* <Box id="typingContainer" className="relative border-transparent focus:outline-none border-2 h-[27vh] m-5 rounded-lg overflow-auto"> */}
                        {/* <div id='caret' className="w-[5px] h-[3.5rem] flex flex-col rounded-md absolute z-10 bg-blue-500"></div> */}
                        <textarea id="typing" className={`${author.data.setting.font.family} word-spacing rounded-lg bg-blue-300 focus:outline-none resize-none text-${author.data.setting.font.size} w-[100%] h-[100%] caret-transparent text-transparent text-opacity-100 bg-opacity-0 selection:bg-transparent text-center relative z-[-99] transition`} style={{ wordBreak: 'break-all', textAlign: 'justify', textJustify: 'inter-word', lineHeight: '110%' }} name="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea>
                        <div id="typingTxt" className="typing-text h-[300%]">
                            <p id="paragraph" ref={activeTypingRef} className={`${author.data.setting.font.family} word-spacing pt-[20px] px-2 rounded-lg bg-orange-300 focus:outline-none resize-none text-${author.data.setting.font.size} w-[100%] h-[100%] caret-transparent select-none relative top-[-30.4vh] bg-opacity-0 pt-2 text-center overflow-y-scroll`} style={{ wordBreak: 'break-all', textAlign: 'justify', textJustify: 'inter-word', lineHeight: '110%', overflow: 'scroll', scrollBehavior: 'smooth' }} onClick={focusTyping}>
                                {
                                    (Letter === "" && IndexNumber === 0) ?
                                        <span id='initial-caret' className="relative overflow-hidden transition">
                                            <div className={`absolute ${author.data.setting.caret.style === '|' ? 'w-[.3vw] h-[100%]' : author.data.setting.caret.style === 'box' ? 'w-[2.5vw] h-[100%]' : author.data.setting.caret.style === '_' ? 'w-[2.5vw] h-[10%]' : author.data.setting.caret.style === 'off' ? 'hidden' : 'hidden'} bg-yellow-200 left-0 bottom-0 rounded-sm transition ${author.data.setting.caret.smooth ? 'withAnimation' : 'withoutAnimation'}`}></div>
                                        </span> : <span></span>
                                }
                                {
                                    // placeholderText.split("").map((char, index) => (<span key={index} className={(index === 0) ? 'letter active text-white' : 'letter text-white transition-all duration-200'} >{char}</span>))
                                    placeholderText?.split("").map((char, index) => (<span key={index} className={`letter ${author.data.setting.caret.style === '|' ? 'caretline' : author.data.setting.caret.style === 'box' ? 'caretbox' : author.data.setting.caret.style === '_' ? 'caretunderscore' : author.data.setting.caret.style === 'off' ? 'off' : 'off'} pt-[-50px] transition-all duration-200 transition ${author.data.setting.caret.smooth ? 'with-animation' : ''}`}>{char}</span>))
                                }
                            </p>
                        </div>
                        {/* <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-blue-600 text-opacity-100 bg-opacity-0 selection:bg-transparent relative z-50 overflow-y-hidden" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea> */}
                        {/* <textarea className="rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none placeholder:text-white relative top-[-30.4vh] overflow-hidden bg-opacity-0 opacity-40" style={{ wordBreak: 'break-all' }} onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea> */}
                    </Box>
                    <br />
                    <div className='flex justify-center'>
                        <button id='re-start-logo' onClick={() => { restartTyping(); }}>
                            <ReplayIcon tabIndex="0" className='cursor-pointer text-bnw rounded-none hover:rounded-md' sx={{ transform: 'scale(1.5)', "&:hover": { transform: 'scale(2)', backgroundColor: 'var(--base_color)', outline: 'none' }, "&:active": { transform: 'scale(1.5)' }, transition: 'transform 300ms' }} />
                        </button><br />
                    </div>
                    <div id='shortcutKeyBar' className='relative bottom-[-7em] font-extrabold'>
                        <div id="key" className='flex text-bnw justify-center mt-[-1.5cm]'>
                            <div>
                                <div className='flex' >
                                    <kbd>ctrl</kbd>+<kbd>?</kbd> <ArrowRightAltIcon /> <h6>To Know More</h6>
                                </div>
                                <div className='flex' >
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


// 192 => document.getElementById("typingContainer").offsetHeight
// document.getElementById("typingContainer").scrollBy(0,192/3)


// line number 227 and 296 is important




// const [Num, setNum] = useState({xVal:1,yVal:0});
// function smoothCaretMotion(motion) {
//     const caret = document.getElementById("caret");
//     const typing = document.getElementById("typing");
//     // let xvalue = 1.8 * Num.xVal; //1.8 is the with of the each word
//     // let xvalue = 1.26 * Num.xVal; //1.8 is the with of the each word
//     let xvalue = 1.77 * Num.xVal; //1.8 is the with of the each word
//     if(motion=='Backspace'){
//         setNum( preNum => ({...preNum,xVal:preNum.xVal-1 } ));
//         caret.style.transform = `translate(${xvalue-3.6}rem,${Num.yVal}rem)`;
//         if(xvalue<=1.77 && Num.yVal>0){
//             console.log("yes i am in")
//             console.log("yes i am in")
//             console.log("yes i am in")
//             console.log("yes i am in")
//             console.log("yes i am in")
//             setNum(preNum=>({...preNum, yVal: preNum.yVal-3}))
//             caret.style.transform = `translate(${xvalue+1.8*Num.x}rem,${Num.yVal}rem)`;
//         }
//     }else{
//         setNum( preNum => ({...preNum,xVal:preNum.xVal+1 } ));
//         caret.style.transform = `translate(${xvalue}rem,${Num.yVal}rem)`;
//         console.log("xvalue => "+ xvalue);
//         if((Math.round(typing.offsetWidth/16)+10) <= Math.round(xvalue)) {
//             console.log("nextline");
//             console.log("nextline");
//             console.log("nextline");
//             console.log("nextline");
//             console.log("nextline");
//             setNum( preNum => ({...preNum,xVal: 1} ));
//             setNum( preNum => ({...preNum,yVal: preNum.yVal+3 } ));
//             console.log("new line => "+ Math.round(typing.offsetWidth/16)+10)
//             caret.style.transform = `translate(${xvalue}rem,${Num.yVal}rem)`
//         }
//     }
//     caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
// }

