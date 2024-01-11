import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { btnGroup } from '../../Methods/methods';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setModemode, setModetext, setModetime } from '../../redux/action/Actions';
// setModemode
// setModetext
// setModetime


const NavConfig = ({ mode }) => {
    const dispatch = useDispatch()
    const location = useLocation();
    const author = useSelector(state => state.AuthorReducer.UserData);
    const [Mode, setMode] = useState({
        mode: "simple",
        text: 50,
        time: 30
    });

    useEffect(() => {
        console.log(author);
        setMode(prevMode => ({ ...prevMode, mode: author.data.mode }));
        setMode(prevMode => ({ ...prevMode, text: author.data.text }));
        setMode(prevMode => ({ ...prevMode, time: author.data.time }));
        console.log(author);
    }, [author.data.mode, author.data.text, author.data.time])

    // console.log(Mode);
    const updateModeState = (e) => {
        const valueOfModes = e.target.textContent.toLowerCase();
        const parentClass = e.target.parentElement.getAttribute('class').split(" ")[0]

        if (parentClass === "btn-group-1") {
            // when the state updated so that at same time useEffect will start side way to patch(update) mode data stored in the database
            setMode(prevMode => ({ ...prevMode, mode: valueOfModes }));
            dispatch(setModemode(valueOfModes))
        } else if (parentClass === "btn-group-2") {
            setMode(prevMode => ({ ...prevMode, text: parseInt(valueOfModes) })); // Assuming text is a number
            dispatch(setModetext(parseInt(valueOfModes)))
        } else if (parentClass === "btn-group-3") {
            setMode(prevMode => ({ ...prevMode, time: parseInt(valueOfModes) })); // Assuming time is a number
            dispatch(setModetime(parseInt(valueOfModes)))
        }
        console.log(author);
    }

    useEffect(() => {
        // Use useEffect to perform side effects after the state is updated
        if (!(Mode.mode==="") && !(Mode.text===0) && !(Mode.time===0)) {
            updateModeData();
        }
    }, [Mode]);

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
                    <div className={`w-[15vw] text-white text-center btnSetting transition shadow ${(mode == "typing-test-mode") ? 'activeSetting activeShadow' : ''}`} style={{ padding: '.8em', borderRight: '1px solid grey' }}>Typing-Test</div>
                </NavLink>
                <NavLink to="/game" id="typing-test-mode">
                    <div className={`w-[15vw] text-white text-center btnSetting transition shadow ${(mode == "car-game-mode") ? 'activeSetting activeShadow' : ''}`} style={{ padding: '.8em' }} >Car-Game</div>
                </NavLink>
            </div>
            <div id='modes' className='flex justify-center mt-1 text-sm'>
                {
                    location.pathname == "/game" ? undefined
                        :
                        // if location on the page is "/"
                        <div id='test-options' className='w-[50vw] flex justify-around items-center bg-red-950 py-2 text-white transition'>
                            <div id='mode-container' className='btn-group-1 mode flex gap-2 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>mode : </h1>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "simple" ? 'btnActive' : ''}`}>simple</button>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "number" ? 'btnActive' : ''}`}>number</button>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "random" ? 'btnActive' : ''}`}>random</button>
                                <button onClick={(e) => { btnGroup(1, 'btnActive', e.target); updateModeState(e); }} className={`btn ${Mode.mode == "custom" ? 'btnActive' : ''}`}>custom</button>
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