import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import normalText from "./storedText";
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Typing = () => {
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
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
    })

    const scrolled = () => {
        // when typing element of scroll occured then placeholder of an element scrolled according the of textarea  
        var typing = document.getElementById('typing');
        var placeholder = document.getElementById('placeholder');
        console.log("scroll => " + typing.scrollTop);
        placeholder.scrollTop = typing.scrollTop;
        typing.scrollTop = placeholder.scrollTop;
    }


    function compareToTyped(text1, text2 = 'Backspace') {
        if (text2[IndexNumber] == undefined && text2[IndexNumber] !== " ") {
            // remeber this if any use will be only press on Backspace it's working fine but not for ctrl + Backspace.  
            console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("Backspace");
            setIndexNumber(IndexNumber - 1)
        } else if (text1[IndexNumber] === text2[IndexNumber]) {
            console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            setIndexNumber(IndexNumber + 1);
        } else {
            console.log(text1[IndexNumber] + "||" + text2[IndexNumber] + " index => " + IndexNumber);
            console.log("incorrect");
            setIndexNumber(IndexNumber + 1);
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
    }

    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing...</title></Helmet>
                <Box className="border-transparent border-2 h-[70vh] m-5 mx-14 rounded-lg">
                    <textarea className="rounded-lg bg-blue-300 text-white-500 focus:outline-none text-5xl w-[100%] h-[100%] resize-none caret-black transition-all text-opacity-200 selection:bg-transparent" style={{ wordBreak: 'break-all' }} onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} autoFocus={true} value={Letter}></textarea>
                    <textarea className="rounded-lg bg-orange-300 focus:outline-none text-5xl w-[100%] h-[100%] resize-none select-none placeholder:text-white relative top-[-70.2vh] overflow-hidden bg-opacity-0 opacity-40 caret-transparent" style={{ wordBreak: 'break-all' }} onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea>
                </Box>
                <div id='re-start-logo' className='text-center'>
                    <ReplayIcon className='cursor-pointer text-white' sx={{ transform: 'scale(1.1)', "&:hover": { transform: 'scale(1.5)' }, transition: 'transform 300ms' }} onClick={(e) => { e.preventDefault(); window.location.reload(); }} />
                </div><br />
                <div id="key" className='flex text-white justify-center'>
                    <kbd>shift</kbd>+<kbd>enter</kbd> <ArrowRightAltIcon /> <h6>Restart Typing</h6>
                </div>
            </HelmetProvider>
        </>
    )
}

export default Typing;