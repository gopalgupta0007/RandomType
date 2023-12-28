import React from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

const NavConfig = ({ mode }) => {
    const location = useLocation();
    return (
        <>
            <div className='flex justify-center'>
                <NavLink to="/" id="typing-test-mode">
                    {/* add logo */}
                    <div className={`w-[15vw] text-white text-center btnSetting transition ${(mode == "typing-test-mode") ? 'activeSetting' : ''}`} style={{ padding: '.8em', borderRight: '1px solid grey' }}>Typing-Test</div>
                </NavLink>
                <NavLink to="/game" id="typing-test-mode">
                    <div className={`w-[15vw] text-white text-center btnSetting transition ${(mode == "car-game-mode") ? 'activeSetting' : ''}`} style={{ padding: '.8em' }} >Car-Game</div>
                </NavLink>
            </div>
            <div id='modes' className='flex justify-center mt-1'>
                {
                    location.pathname == "/game"
                        ?
                        // if location on the page is "/"
                        // add play with streng and play with friends button
                        <h1 className='text-white bg-yellow-400'>game</h1>
                        :
                        // if location on the page is "/"
                        <div id='test-options' className='w-[50vw] flex justify-around items-center bg-red-950 py-2 text-white transition'>
                            <div id='mode-container' className='mode flex gap-1 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>mode : </h1>
                                <button>simple</button>
                                <button>number</button>
                                <button>random</button>
                                <button>custom</button>
                            </div>
                            <div id='letter-container' className='mode flex gap-1 justify-center items-center border border-0 border-r-2 pr-5'>
                                <h1 className='mode-heading'>letter : </h1>
                                <button>10</button>
                                <button>25</button>
                                <button>50</button>
                                <button>100</button>
                            </div>
                            <div id='time-container' className='mode flex gap-1 justify-center items-center' >
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