import { Box } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import normalText from "./storedText";

const Typing = () => {
    const elementRef = useRef(null);
    const [Letter, setLatter] = useState("");
    const [IndexNumber, setIndexNumber] = useState(0);
    const [placeholderText, setplaceholderText] = useState("");

    const scrolled = () => {
        var typing = document.getElementById('typing');
        var placeholder = document.getElementById('placeholder');
        // typing.addEventListener('scroll', function () {
        console.log("scroll => "+typing.scrollTop+48);
        placeholder.scrollTop = typing.scrollTop+48;
        // });
    }

    useEffect(() => {
        console.log("random num => " + Math.floor(Math.random() * 10));
        setplaceholderText(normalText[Math.floor(Math.random() * 10)].toLowerCase());
    }, [])

    function compareToTyped(text1, text2 = 'Backspace') {
        if (text2[IndexNumber] == undefined && text2[IndexNumber] !== " ") {
            console.log("Backspace");
            setIndexNumber(IndexNumber - 1)
            console.log(IndexNumber)
            // remeber this if any use will be only press on Backspace it's working fine but not for ctrl + Backspace.  
        } else if (text1[IndexNumber] === text2[IndexNumber]) {
            console.log(text1[IndexNumber] + "||" + text2[IndexNumber]);
            console.log(IndexNumber);
            setIndexNumber(IndexNumber + 1);
        } else {
            console.log("incorrect");
        }
    }

    const handleTyping = (e) => {
        // const audio = new Audio('./keyboardSound/mech-keyboard.mp3');
        // audio.play();
        compareToTyped(placeholderText, e.target.value);
        setLatter(e.target.value);
        //while key down then sound occur

        // var playPromise = document.querySelector('audio').play();
        // if (playPromise !== undefined) {
        //     playPromise.then(function () {
        //         console.log(e.target.value);
        //         playPromise.play();
        //         console.log(e.target.value);
        //         // Automatic playback started!
        //     }).catch(function (error) {
        //         console.log("not played"+error)
        //         // Automatic playback failed.
        //         // Show a UI element to let the user manually start playback.
        //     });
        // };
    }

    const focusTyping = () => {
        elementRef.current.focus();
    }

    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing...</title></Helmet>
                <Box className="border-transparent border-2 h-[70vh] m-10 mx-14 rounded-lg">
                    <textarea className="rounded-lg bg-red-200 text-red-500 focus:outline-none text-5xl p-10 w-[100%] h-[100%] resize-none caret-red-600 transition-all text-opacity-100 selection:bg-transparent break-words" onScroll={scrolled} name="typing" id="typing" spellCheck="false" ref={elementRef} onChange={handleTyping} value={Letter} placeholder={placeholderText} autoFocus={true}></textarea>
                    <textarea className="rounded-lg bg-red-200 focus:outline-none text-5xl p-10 w-[100%] h-[100%] resize-none select-none placeholder:text-black relative top-[-70vh] overflow-hidden bg-opacity-0 opacity-40 caret-transparent break-words" onClick={focusTyping} name="placeholder" id="placeholder" spellCheck="false" placeholder={placeholderText} ></textarea>
                </Box>
            </HelmetProvider>
        </>
    )
}

export default Typing;
















// const scrollableElement = document.getElementById('scrollable-element');
// const otherElement = document.getElementById('other-element');

// // Add scroll event listener to the scrollable element
// scrollableElement.addEventListener('scroll', function() {
//   // Code to be executed when scrolling occurs
//   // For example, you can check the scroll position and apply changes to the other element
//   if (scrollableElement.scrollTop > 100) {
//     otherElement.style.backgroundColor = 'red';
//   } else {
//     otherElement.style.backgroundColor = 'blue';
//   }
// });