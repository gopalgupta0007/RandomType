import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const NavConfig = ({ mode }) => {

    const btnGroup = () =>{
        return 0
    }

    const location = useLocation();
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
                    location.pathname == "/game"?undefined
                        :
                        // if location on the page is "/"
                        <div id='test-options' className='w-[50vw] flex justify-around items-center bg-red-950 py-2 text-white transition'>
                            <div id='mode-container' className='btn-group mode flex gap-2 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>mode : </h1>
                                <button onClick={()=>btnGroup(1,this)}>simple</button>
                                <button onClick={()=>btnGroup(2,this)}>number</button>
                                <button onClick={()=>btnGroup(3,this)}>random</button>
                                <button onClick={()=>btnGroup(4,this)}>custom</button>
                            </div>
                            <div id='text-container' className='mode flex gap-2 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>text : </h1>
                                <button>10</button>
                                <button>50</button>
                                <button>100</button>
                                <button>200</button>
                            </div>
                            <div id='time-container' className='mode flex gap-2 justify-center items-center' >
                                <h1 className='mode-heading'>time : </h1>
                                <button>30</button>
                                <button>60</button>
                                <button>90</button>
                                <button>120</button>
                            </div>
                        </div>
                }
            </div>
        </>
    )
}

export default NavConfig