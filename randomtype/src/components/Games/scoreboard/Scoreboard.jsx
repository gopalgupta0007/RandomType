import React from 'react'
import { off } from '../../../Methods/methods';

const Scoreboard = ({ user, opponentData, totalLetters }) => {
    return (
        <div id="overlay5" className='overlay-5 bg-base-color'>
            <div id="text5" className='overlayContent text-center bg-base-color pt-5 shadow brightness-125' style={{ width: '50vw', height: '80vh' }}>
                <div id='scoreboard-head'>
                    <span onClick={() => { off(5) }} className="absolute right-0 top-0 text-5xl mx-0 px-2 rounded-lg hover:bg-slate-100 hover:cursor-pointer active:bg-slate-200 duration-100 transition text-black">&times;</span>
                    <h1 className='text-background-color font-extrabold'>Scoreboard</h1>
                </div>
                <div id='scoreboard-body' className='flex justify-around text-background-color'>
                    <div id='user-result' className='grid grid-cols-1 w-1/2 h-40'>
                        <img id='userImg' src={user.img} className='w-1/2 m-auto rounded-full border-bg-color' style={{ borderWidth: '5px' }} alt='userImg' />
                        <p className='text-4xl font-extrabold'>{user.username}</p>
                        <div id='user-typing-game-data' className='flex flex-col mt-3 justify-center items-center align-middle'>
                            <div id='wpmNacc' className='flex gap-x-5'>
                                <div className='wpm grid grid-cols-1 text-4xl px-8 py-2 rounded-xl bg-white'><p className='font-extrabold'>{user.typingGameData.wpm}</p><p className='w-full h-2 bg-blue-500 rounded-md'></p><p>WPM</p></div>
                                <div className='acc grid grid-cols-1 text-4xl px-8 py-2 rounded-xl bg-white'><p className='font-extrabold'>{user.typingGameData.acc}%</p><p className='w-full h-2 bg-blue-500 rounded-md'></p><p>ACC</p></div>
                            </div>
                            <div id='typing-indexes' className='flex text-lg font-extrabold mt-2 px-5 py-2 rounded-xl bg-white'>
                                <div className='incorrectChar'><div className='font-extrabold text-2xl'>{user.indexes.incorrectLetter}</div><div className='w-[6vw] h-1 bg-blue-500 rounded-md'></div><div>incorrect</div></div>
                                <span className='text-2xl font-extrabold flex justify-center items-center'>/</span>
                                <div className='correctChar'><div className='font-extrabold text-2xl'>{user.indexes.indexNumber-user.indexes.incorrectLetter}</div><div className='w-[5vw] h-1 bg-blue-500 rounded-md'></div><div>correct</div></div>
                                <span className='text-2xl font-extrabold flex justify-center items-center'>/</span>
                                <div className='totalChar'><div className='font-extrabold text-2xl'>{totalLetters.length}</div><div className='w-[5vw] h-1 bg-blue-500 rounded-md'></div><div>total</div></div>
                            </div>
                        </div>
                    </div>

                    <div id='h-line' className='bg-background-color rounded-xl' style={{ width: '0.25rem', height: '30rem' }}></div>
                    
                    <div id='strenger-result' className='grid grid-cols-1 w-1/2 h-40'>
                        <img id='oppImg' src={opponentData.img} className='w-1/2 m-auto rounded-full border-bg-color' style={{ borderWidth: '5px' }} alt='oppImg' />
                        <p className='text-4xl font-extrabold'>{opponentData.username}</p>
                        <div id='opponent-typing-game-data' className='flex flex-col mt-3 justify-center items-center align-middle'>
                            <div id='opp-wpmNacc' className='flex gap-x-5'>
                                <div className='wpm grid grid-cols-1 text-4xl px-8 py-2 rounded-xl bg-white'><p className='font-extrabold'>{opponentData.typingGameData.wpm}</p><p className='w-full h-2 bg-blue-500 rounded-md'></p><p>WPM</p></div>
                                <div className='acc grid grid-cols-1 text-4xl px-8 py-2 rounded-xl bg-white'><p className='font-extrabold'>{opponentData.typingGameData.acc}%</p><p className='w-full h-2 bg-blue-500 rounded-md'></p><p>ACC</p></div>
                            </div>
                            <div id='opp-typing-indexes' className='flex text-lg font-extrabold mt-2 px-5 py-2 rounded-xl bg-white'>
                                <div className='incorrectChar'><div className='font-extrabold text-2xl'>{opponentData.indexes.incorrectLetter}</div><div className='w-[6vw] h-1 bg-blue-500 rounded-md'></div><div>incorrect</div></div>
                                <span className='text-2xl font-extrabold flex justify-center items-center'>/</span>
                                <div className='correctChar'><div className='font-extrabold text-2xl'>{opponentData.indexes.indexNumber-opponentData.indexes.incorrectLetter}</div><div className='w-[5vw] h-1 bg-blue-500 rounded-md'></div><div>correct</div></div>
                                <span className='text-2xl font-extrabold flex justify-center items-center'>/</span>
                                <div className='totalChar'><div className='font-extrabold text-2xl'>{totalLetters.length}</div><div className='w-[5vw] h-1 bg-blue-500 rounded-md'></div><div>total</div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard;

