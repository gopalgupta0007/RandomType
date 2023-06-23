import { Box } from '@mui/material'
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import normalText from "./storedText";
import ReplayIcon from '@mui/icons-material/Replay';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React, { useState } from 'react';

const Typing = () => {
    console.log("start")
    console.log("before sentance state")
    // const [Letter, setLetter] = useState("")
    const [Sentances, setSentances] = useState("what do you want in this wonderfull life in this word and it would be like much more.")
    console.log("after sentance state")
    console.log("before indexnumber state")

    const [IndexNumber, setIndexNumber] = useState(0);
    console.log("after indexnumber state")
    
    console.log("before useEffect")
    // useEffect(() => {
    //     setSentances(normalText[Math.floor(Math.random() * 10)].toLowerCase())
    //     console.log("between useEffect")
    // }, []);
    console.log("after useEffect")


    console.log("before keypress")
    // useEffect(()=>{},[])
    document.addEventListener('keypress', (event) => {
        console.log("in keypress1")
        
        // if(event.key !== Sentances[IndexNumber]){
            //     console.log(event.key +" incorrect "+ Sentances[IndexNumber]);
            //     return;
            // }
            console.log(event.key + " correct " + Sentances[IndexNumber]);
            console.log("in keypress2")
            
            console.log(IndexNumber)
            console.log("in keypress3")
            
            setIndexNumber(IndexNumber + 1)
            console.log("in keypress4")
            
            // if (event.shiftKey && event.key == 'Enter') {
                //     //if shift + enter key down restart-typing
        //     event.preventDefault(); // Prevent default browser behavior
        //     window.location.reload();
        //     console.log("shift+enter hasbeen keydowned");
        // }
    })
    console.log("after keypress")
    
    console.log("end")
    return (
        <>
            <HelmetProvider>
                <Helmet><title>RandomType || Testing...</title></Helmet>
                <Box id="typingContainer" className="border-transparent border-2 h-[70vh] m-5 mx-14 rounded-lg bg-yellow-200 p-10 overflow-hidden">
                    <h1 id="typing" className="overflow-y-visible" data-text={Sentances}>{Sentances}</h1>
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