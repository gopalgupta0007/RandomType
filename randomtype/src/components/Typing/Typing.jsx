import { Box } from '@mui/material'
import React, { useState, useRef, useEffect, memo } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import normalText from "./storedText";
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import KeyShortcut from '../keyboradShortcut/KeyShortcut';
// import { Translate } from '@mui/icons-material';

const Typing = () => {
    // const [Num, setNum] = useState({ xVal: 1, yVal: 0 });
    const typingContainer = document.getElementById("typingContainer");
    const typing = document.getElementById("typing");
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
    // const [Timer, setTimer] = useState(0);
    const [IndexNumber, setIndexNumber] = useState(0);
    const [placeholderText, setplaceholderText] = useState("");

    useEffect(() => {
        //generate random number and the according to that number of index of array of the paragram will it be selected
        console.log("random num => " + Math.floor(Math.random() * 10));
        setplaceholderText(normalText[Math.floor(Math.random() * 10)].toLowerCase());
    }, [])

    document.addEventListener('keydown', (event) => {
        if (event.shiftKey && event.key == 'Enter') {
            //if shift + enter key down restart-typing
            event.preventDefault(); // Prevent default browser behavior
            window.location.reload();
            console.log("shift+enter hasbeen keydowned");
        }
        if (event.ctrlKey && event.key == '?') {
            //if shift + enter key down restart-typing
            event.preventDefault(); // Prevent default browser behavior
            console.log("ctrl + ? hasbeen keydowned");
        }
    })

    const scrolled = () => {
        // when typing element of scroll occured then placeholder of an element scrolled according the of textarea  
        var typing = document.getElementById('typing');
        var placeholder = document.getElementById('placeholder');
        console.log("scroll => " + typing.scrollTop);
        placeholder.scrollTop = typing.scrollTop;
        typing.scrollTop = placeholder.scrollTop;
    }

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

    // function smoothCaretMotion(motion) {
    //     const caret = document.getElementById("caret");
    //     let xvalue = 1.8 * Num.xVal;
    //     if (motion == 'Backspace') {
    //         setNum(preNum => ({ ...preNum, xVal: preNum.xVal - 1 }));
    //         caret.style.transform = `translate(${xvalue - 3.6}rem,${Num.yVal}rem)`;
    //         if (xvalue <= 3.6 && Num.yVal > 0) {
    //             // after keydown backspace caret comes back to previous line
    //             setNum(preNum => ({ ...preNum, xVal: (preNum.xVal + (typing.offsetWidth / 16)) - 29.6, yVal: preNum.yVal - 3 }))
    //             // typing.offsetWidth/16
    //             caret.style.transform = `translate(${xvalue - 3.6}rem,${Num.yVal}rem)`;
    //             console.log(`${Num.xVal + (typing.offsetWidth / 16) - 29.6}rem`)
    //         }
    //     } else {
    //         setNum(preNum => ({ ...preNum, xVal: preNum.xVal + 1 }));
    //         caret.style.transform = `translate(${xvalue}rem,${Num.yVal}rem)`;
    //         console.log("xvalue => " + xvalue);
    //         if ((Math.round(typing.offsetWidth / 16) + 10) <= Math.round(xvalue)) {
    //             // caret comes into the next line
    //             setNum(preNum => ({ ...preNum, xVal: 1 }));
    //             setNum(preNum => ({ ...preNum, yVal: preNum.yVal + 3 }));
    //             // console.log("new line => " + (Math.round(typing.offsetWidth/16)) + 10)
    //             console.log("new line => " + typing.offsetWidth/16+"rem")
    //             caret.style.transform = `translate(${xvalue}rem,${Num.yVal}rem)`
    //         }
    //     }
    //     caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
    //}

    function smoothCaretMotion(motion) {
        const caret = document.getElementById("caret");
        // let xvalue = 1.8 * Num.xVal;
        let xvalue = 1.8 * typing.selectionStart;
        console.log(typing.offsetWidth / 16 + " || " + 1.8 * typing.selectionStart)
        // if(typing.offsetWidth/16 < 1.8 * typing.selectionStart){
        //     xvalue = xvalue - xvalue
        // }else{
        // }
        caret.style.transform = `translate(${xvalue}rem,${0}rem)`;
        console.log("xvalue => " + xvalue);
        caret.style.transition = "transform 0.2s"; // The caret is moving smoothly due to its transition duration being set to 200ms.7
    }

    function compareToTyped(text1, text2 = 'Backspace') {
        if (text2[IndexNumber] == undefined && text2[IndexNumber] !== " ") {
            smoothCaretMotion('Backspace');
            setIndexNumber(IndexNumber - 1)
            // remeber this if any use will be only press on Backspace it's working fine but not for ctrl + Backspace.  
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("Backspace");
            typing.classList.add("text-red-500");
        } else if (text1[IndexNumber] === text2[IndexNumber]) {
            smoothCaretMotion();
            setIndexNumber(IndexNumber + 1);
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            typing.classList.remove("text-red-500");
            typing.classList.add("text-blue-500");
            if (placeholderText.length - 1 == IndexNumber) { window.location.reload() }  // next text are going to show when the user type completely / user typed all given sentances.
        } else {
            smoothCaretMotion();
            setIndexNumber(IndexNumber + 1);
            // setLatter(applyColorToCharacter(Letter+text2[IndexNumber], IndexNumber, "red"))
            // console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("incorrect");
            typing.classList.add("text-red-500");
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
                <Box id="typingContainer" className="border-transparent focus:outline-none border-2 h-[70vh] m-5 mx-14 rounded-lg" onClick={() => typingContainer.classList.remove("blur-md")} onBlur={() => typingContainer.classList.add("blur-md")}>
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