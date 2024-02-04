import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { btnGroup, off, on } from '../../Methods/methods';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setModemode, setModetext, setModetime } from '../../redux/action/Actions';
import { BsWindowPlus } from 'react-icons/bs';

const NavConfig = ({ mode, restartTypingTest }) => {
    const dispatch = useDispatch()
    const location = useLocation();
    const author = useSelector(state => state.AuthorReducer.UserData);
    const auth = useSelector(state => state.AuthReducer.auth);
    const [customText, setCustomText] = useState("");
    const [Mode, setMode] = useState({
        mode: author.data.mode,
        text: author.data.text,
        time: author.data.time
    });


    const updateModeState = (e) => {
        const valueOfModes = e.target.textContent.toLowerCase();
        const parentClass = e.target.parentElement.getAttribute('class').split(" ")[0]

        if (parentClass === "btn-group-1") {
            // when the state updated so that at same time useEffect will start side way to patch(update) mode data stored in the database
            setMode(prevMode => ({ ...prevMode, mode: valueOfModes }));
        } else if (parentClass === "btn-group-2") {
            setMode(prevMode => ({ ...prevMode, text: parseInt(valueOfModes) })); // Assuming text is a number
        } else if (parentClass === "btn-group-3") {
            setMode(prevMode => ({ ...prevMode, time: parseInt(valueOfModes) })); // Assuming time is a number
        }
        console.log(author);
    }

    useEffect(() => {
        // Use useEffect to perform side effects after the state is updated
        if (auth) {
            if (!(Mode.mode === "") && !(Mode.text === 0) && !(Mode.time === 0)) {
                updateModeData();
                dispatchMethod();
            }
        }
    }, [Mode]);

    const dispatchMethod = () => {
        dispatch(setModemode(Mode.mode))
        dispatch(setModetext(parseInt(Mode.text)))
        dispatch(setModetime(parseInt(Mode.time)))
        console.log(author);
    }

    const updateModeData = async () => {
        console.log(Mode);
        try {
            console.log(author);
            const updateModeTyping = await axios.patch(`/users/mode/${author._id}`,
                Mode,
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            ) // for cookie because we have to use axious method to fetch data
            console.log("updateTyping :=> ", updateModeTyping);
            console.log(Mode);
        } catch (err) {
            console.log(err);
        }
        console.log(Mode);
    }

    return (
        <>
            <div className='flex justify-center gap-1'>
                <NavLink to="/" id="typing-test-mode">
                    {/* add logo */}
                    <div className={`w-[15vw] text-bnw text-center btnNav transition font-extrabold shadow ${(mode == "typing-test-mode") ? 'activeSetting activeShadow' : ''}`} style={{ padding: '.8em', borderRight: '1px solid grey' }}>Typing-Test</div>
                </NavLink>
                <NavLink to="/game" id="typing-test-mode">
                    <div className={`w-[15vw] text-bnw text-center btnNav transition font-extrabold shadow ${(mode == "car-game-mode") ? 'activeSetting activeShadow' : ''}`} style={{ padding: '.8em' }} >Car-Game</div>
                </NavLink>
            </div>
            <div id='modes' className='flex justify-center mt-1 text-sm'>
                <div id="overlay" className='overlay-1'>
                    <div id="text" className='overlayContent text-center glassOnly p-10 shadow'>
                    <span onClick={()=>{off(1)}} className="absolute right-0 top-0 text-4xl mx-0 px-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200 duration-100 transition text-black">&times;</span>
                        <h1>Custom</h1>
                        <textarea name="custom_text" id="custom_text" placeholder='Enter Comments' onChange={(e)=>setCustomText(e.target.value)} autoFocus={true} cols="30" rows="10" className='w-[95%] h-[70%] bg-background-color rounded-lg relative top-10 text-sm p-5 text-white resize-none' value={customText}></textarea>
                        <button className='p-2 text-bnw bghoverActive hover:border-base-color shadow active:scale-95 transition relative bottom-[-80px] text-lg rounded-lg' onClick={()=>{off(1);localStorage.setItem("custom_text", customText);restartTypingTest()}}>Set Custom Text</button>
                    </div>
                </div>
                {
                    location.pathname == "/game" ? undefined
                        :
                        // if location on the page is "/"
                        <div id='test-options' className='w-[50vw] flex justify-around font-extrabold items-center bg-background-color py-2 text-bnw transition'>
                            <div id='mode-container' className='btn-group-1 mode flex gap-2 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>mode : </h1>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "simple" ? 'btnActive' : ''}`}>simple</button>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "number" ? 'btnActive' : ''}`}>number</button>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "random" ? 'btnActive' : ''}`}>random</button>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); on(1) }} className={`btn ${Mode.mode == "custom" ? 'btnActive' : ''}`}>custom</button>
                            </div>
                            <div id='text-container' className='btn-group-2 mode flex gap-2 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>text : </h1>
                                <button onClick={(e) => { btnGroup(2, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.text == 10 ? 'btnActive' : ''}`}>10</button>
                                <button onClick={(e) => { btnGroup(2, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.text == 50 ? 'btnActive' : ''}`}>50</button>
                                <button onClick={(e) => { btnGroup(2, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.text == 75 ? 'btnActive' : ''}`}>75</button>
                                <button onClick={(e) => { btnGroup(2, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.text == 100 ? 'btnActive' : ''}`}>100</button>
                            </div>
                            <div id='time-container' className='btn-group-3 mode flex gap-2 justify-center items-center' >
                                <h1 className='mode-heading'>time : </h1>
                                <button onClick={(e) => { btnGroup(3, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.time == 15 ? 'btnActive' : ''}`}>15s</button>
                                <button onClick={(e) => { btnGroup(3, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.time == 30 ? 'btnActive' : ''}`}>30s</button>
                                <button onClick={(e) => { btnGroup(3, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.time == 60 ? 'btnActive' : ''}`}>60s</button>
                                <button onClick={(e) => { btnGroup(3, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.time == 120 ? 'btnActive' : ''}`}>120s</button>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default NavConfig