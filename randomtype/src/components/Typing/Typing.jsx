import { Box } from '@mui/material'
import React, { useState, useRef, useEffect, memo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import normalText from "./storedText";
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const scrolled = () => {
    // when typing element of scroll occured then placeholder of an element scrolled according the of textarea  
    var typing = document.getElementById('typing');
    var placeholder = document.getElementById('placeholder');
    console.log("scroll => " + typing.scrollTop);
    placeholder.scrollTop = typing.scrollTop;
    typing.scrollTop = placeholder.scrollTop;
}

let noOfFirstLineCharacter = 0 
function smoothCaretMotion(backspace="",typing = document.getElementById('typing')) {
    // fully smooth movement of caret x-axis and y-axis also
    let xvalue = 1.8 * typing.selectionStart;
    const caret = document.getElementById("caret");
    if(0<Math.trunc(3 * Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))) {
        xvalue = (xvalue-((noOfFirstLineCharacter*1.8)* Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
        // console.log("xvalue => "+xvalue)    
        // console.log("noOfFirstLineCharacter*1.8 => "+noOfFirstLineCharacter*1.8)
        // console.log("y => "+Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))
    }else{
        if(0==Math.trunc(3 * Math.trunc(xvalue / Math.trunc(typing.offsetWidth / 14)))){
            noOfFirstLineCharacter=(backspace=='Backspace')?noOfFirstLineCharacter-1:noOfFirstLineCharacter+1;
            // console.log("noOfFirstLineCharacter => "+noOfFirstLineCharacter);
        }
    }
    caret.style.transform = `translate(${(xvalue)}rem,${Math.trunc(3 * Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14)))}rem)`;
    // console.log("x => "+xvalue)
    // console.log("y => "+Math.trunc(3 * Math.trunc(1.8*typing.selectionStart / Math.trunc(typing.offsetWidth / 14))));
    caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
}


const Typing = () => {
    const typingContainer = document.getElementById("typingContainer");
    const typing = document.getElementById("typing");
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
    const [IndexNumber, setIndexNumber] = useState(0);
    const [placeholderText, setplaceholderText] = useState("");

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

    // const wpm = useMemo(() => {
    //     console.log("wpm => " + Letter.split(" ").length / (10000 / 60000))
    //     return Letter.split(" ").length / (10000 / 60000);
    // }, [Letter])

    // const accuracy = useMemo((characters=0, totalChar=1)=>{
    //     return 100-((characters/totalChar)*100);
    // },[Letter])

    // function startTimer(setTimeout) {
    //     for (let i = 0; i <= setTimeout; i++) {
    //         useEffect(() => {
    //             setInterval(() => {
    //                 setTimer(Timer + 1)
    //                 console.log("Timer =>" + Timer)
    //             }, 1000)
    //         }, [Timer])
    //     }
    // }

    function compareToTyped(text1, text2 = 'Backspace') {
        if (text2[IndexNumber] == undefined && text2[IndexNumber] !== " ") {
            // remeber this if any use will be only press on Backspace it's working fine but not for ctrl + Backspace.  
            smoothCaretMotion('Backspace');
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
            smoothCaretMotion();
            setIndexNumber(IndexNumber + 1);
            // smoothCaretMotion();
            // setLatter(applyColorToCharacter(Letter+text2[IndexNumber], IndexNumber, "red"))
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("incorrect");
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
        // console.log("focus => " + elementRef.current.value);
        // console.log("style =>"+getComputedStyle(elementRef.current.style));
    }

    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing...</title></Helmet>
                {/* <Box className="flex justify-center">
                    <div id='wpm' className='text-white'>
                        {wpm}
                    </div>
                </Box> */}
                <Box id="typingContainer" className="border-transparent focus:outline-none border-2 h-[70vh] m-5 mx-10 rounded-lg" onClick={() => typingContainer.classList.remove("blur-md")} onBlur={() => typingContainer.classList.add("blur-md")}>
                    <div id='caret' className="w-[5px] h-[3.5rem] flex flex-col rounded-md absolute z-10 bg-blue-500"></div>
                    <textarea className="rounded-lg bg-blue-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent text-blue-600 text-opacity-100 bg-opacity-0 selection:bg-transparent" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea>
                    <textarea className="rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-transparent select-none placeholder:text-white relative top-[-70.4vh] overflow-hidden bg-opacity-0 opacity-40" style={{ wordBreak: 'break-all' }} onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea>
                </Box>
                <div id='re-start-logo' className='text-center'>
                    <ReplayIcon className='cursor-pointer text-white' sx={{ transform: 'scale(1.1)', "&:hover": { transform: 'scale(1.5)' }, transition: 'transform 300ms' }} onClick={(e) => { e.preventDefault(); window.location.reload(); }} />
                </div><br />
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
            </HelmetProvider>
        </>
    )
}

export default memo(Typing);