import React, { useEffect, useState } from 'react'
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { BsCursorText } from "react-icons/bs";
import { Helmet, HelmetProvider } from 'react-helmet-async';
// import { alertTitleClasses } from '@mui/material';

const Settings = () => {
  const [visible, setVisible] = useState(false);

  const toggleHeight = (num) => {
    var slide_setting_option = document.querySelectorAll(".toggle-open")[num];
    slide_setting_option.classList.toggle("toggle-close");
  }

  const mouseEnterStyle = (e) => e.target.childNodes[0].classList.add("bg-red-500");
  const mouseLeaveStyle = (e) => e.target.childNodes[0].classList.remove("bg-red-500");

  useEffect(() => {
    var setting_options = document.getElementById("setting-options");
    setting_options.addEventListener("scroll", listenToScroll)
  })

  const buttonValues = [
    'Roboto',
    'Roboto Condensed',
    'Roboto Mono',
    'Poppins',
    'Open sans',
    'Noto sans',
    'Montserrat',
    'Lato',
    'Inter',
    'Oswald',
    'Mukta',
    'Ubuntu',
  ];

  const scrollToTop = () => {
    const setting_options = document.getElementById("setting-options");
    setting_options.scrollTo(0, 0)
  }


  const listenToScroll = () => {
    const setting_options = document.getElementById("setting-options");
    if (setting_options.scrollTop > 0) {
      setVisible(true)
    } else {
      setVisible(false)
    }

  }

  return (
    <>
      <HelmetProvider>
        <Helmet><title>Setting || RandomType</title></Helmet>
        <div className="text-white text-center text-5xl">Setting</div>
        <div id="settings" className='text-black w-4/5 m-auto'>
          <div id="setting-navigation" className='flex justify-center gap-x-14 text-3xl my-5 border border-x-0 border-y-2'>
            <a href="#font-setting" className='text-red-500 scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><HdrAutoIcon sx={{ fontSize: '1.2em' }} />Font</a>
            <a href="#caret-setting" className='text-red-500 scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><BsCursorText style={{ display: 'inline', border: '2px solid red', borderRadius: '50%', backgroundColor: 'red', color: 'white', fontWeight: 'bolder' }} />Caret</a>
            <a href="#sounds-setting" className='text-red-500 scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><VolumeUpIcon sx={{ fontSize: '1.2em' }} />Sounds</a>
            <a href="#theme-setting" className='text-red-500 scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><ColorLensIcon sx={{ fontSize: '1.2em' }} />Theme</a>
            <a href="#reset-setting" className='text-red-500 scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center' ><RestartAltIcon sx={{ fontSize: '1.2em' }} />Reset</a>
            <a href="#rtintro-animation-setting" className='text-red-500 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><div id='rt-icon' className='w-6 h-6 bg-red-500 text-white overflow-hidden text-[15px] flex items-center justify-center font-extrabold rounded-full scale-110'>RT</div>Intro-Animation</a>
          </div>
          <div id='setting-options' className='flex flex-col gap-y-5' style={{ height: '60vh', overflow: 'scroll', scrollBehavior: 'smooth' }}>
            <div id='font-setting' className='m-2'>
              <h1 id='font-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(0)}><HdrAutoIcon sx={{ fontSize: '30px' }} />Fonts</h1>
              <div id='font-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div>
                  <p className='text-xl my-2'>font family : </p>
                </div>
                <div id='font-familys' className='grid grid-cols-4 gap-3 text-center'>
                  <button className='btnSetting transition'>Roboto</button>
                  <button className='btnSetting transition'>Roboto Condensed</button>
                  <button className='btnSetting transition'>Roboto Mono</button>
                  <button className='btnSetting transition'>Poppins</button>
                  <button className='btnSetting transition'>Open sans</button>
                  <button className='btnSetting transition'>Noto sans</button>
                  <button className='btnSetting transition'>Montserrat</button>
                  <button className='btnSetting transition'>Lato</button>
                  <button className='btnSetting transition'>Inter</button>
                  <button className='btnSetting transition'>Oswald</button>
                  <button className='btnSetting transition'>Mukta</button>
                  <button className='btnSetting transition'>Ubuntu</button>
                </div>
                <br />
                <hr />
                <div id='font-size' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>font size : </p></div>
                  <div><p id='demo' className='h-16 flex justify-center align-middle items-center text-5xl text-center w-20 transition'>Aa</p></div>
                  <div id='font-size-options' className='grid grid-cols-5 gap-5 text-center'>
                    <button className='w-[7vw] btnSetting transition'>xl</button>
                    <button className='w-[7vw] btnSetting transition'>2xl</button>
                    <button className='w-[7vw] btnSetting transition'>3xl</button>
                    <button className='w-[7vw] btnSetting transition'>4xl</button>
                    <button className='w-[7vw] btnSetting transition'>5xl</button>
                  </div>
                </div>
              </div>
            </div>
            <div id='caret-setting' className='m-2'>
              <h1 id='caret-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(1)}><BsCursorText style={{ display: 'inline', border: '2px solid red', borderRadius: '50%', backgroundColor: 'red', color: 'white', fontWeight: 'bolder' }} />Caret</h1>
              <div id='caret-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='caret-style' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>caret style : </p></div>
                  {/* <div><p id='demo' className='h-16 flex justify-center align-middle items-center text-5xl text-center w-20 transition'>Aa</p></div> */}
                  <div id='caret-style-options' className='grid grid-cols-4 gap-5 text-center'>
                    <button className='w-[7vw] btnSetting transition'>|</button>
                    <button className='w-[7vw] btnSetting transition flex justify-center items-center hover:bg-white' onMouseEnter={mouseEnterStyle} onMouseLeave={mouseLeaveStyle}><div className='w-3 h-5 transition hover:bg-white'></div></button>
                    <button className='w-[7vw] btnSetting transition text-3xl'>_</button>
                    <button className='w-[7vw] btnSetting transition'>off</button>
                  </div>
                </div>
                <hr />
                <div>
                  <p className='text-xl my-2'>caret smooth : </p>
                </div>
                <div id='caret-smooth' className='grid grid-cols-4 gap-3 text-center'>
                  <button className='btnSetting transition'>Roboto</button>
                  <button className='btnSetting transition'>Roboto Condensed</button>
                  <button className='btnSetting transition'>Roboto Mono</button>
                  <button className='btnSetting transition'>Poppins</button>
                  <button className='btnSetting transition'>Open sans</button>
                  <button className='btnSetting transition'>Noto sans</button>
                  <button className='btnSetting transition'>Montserrat</button>
                  <button className='btnSetting transition'>Lato</button>
                  <button className='btnSetting transition'>Inter</button>
                  <button className='btnSetting transition'>Oswald</button>
                  <button className='btnSetting transition'>Mukta</button>
                  <button className='btnSetting transition'>Ubuntu</button>
                </div>
                <br />
              </div>
            </div>
            <div id='sounds-setting' className='m-2'>
              <h1 id='sounds-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(2)}><VolumeUpIcon sx={{ fontSize: '28px' }} />Sound</h1>
              <div id='sounds-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='sound-volume' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>sound volume : </p></div>
                  <div id='sound-volume-options' className='grid grid-cols-4 gap-5 text-center'>
                    <button className='w-[7vw] btnSetting transition'>mute</button>
                    <button className='w-[7vw] btnSetting transition'>low</button>
                    <button className='w-[7vw] btnSetting transition'>mid</button>
                    <button className='w-[7vw] btnSetting transition'>high</button>
                  </div>
                </div>
                <hr />
                <div>
                  <p className='text-xl my-2'>select sounds : </p>
                </div>
                <div id='sounds' className='grid grid-cols-4 gap-3 text-center'>
                  <button className='btnSetting transition'>keybord</button>
                  <button className='btnSetting transition'>bell</button>
                  <button className='btnSetting transition'>light bell</button>
                  <button className='btnSetting transition'>mechanical</button>
                  <button className='btnSetting transition'>perkins bell</button>
                  <button className='btnSetting transition'>bubble</button>
                  <button className='btnSetting transition'>carriage</button>
                  <button className='btnSetting transition'>click</button>
                  <button className='btnSetting transition'>ding</button>
                  <button className='btnSetting transition'>Kclick</button>
                  <button className='btnSetting transition'>none</button>
                </div>
                <br />
              </div>
            </div>
            <div id='theme-setting' className='m-2'>
              <h1 id='theme-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(3)}><ColorLensIcon sx={{ fontSize: '28px' }} />Themes</h1>
              <div id='theme-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div>
                  <p className='text-xl my-2'>Themes : </p>
                </div>
                <div id='themes' className='grid grid-cols-4 gap-3 text-center'>

                  {buttonValues.map((buttonValue, index) => (
                    <button
                      key={index}
                      className='btnSetting transition'
                    // onClick={() => this.handleClick(buttonValue)}
                    >
                      {buttonValue}
                    </button>
                  ))}
                </div>
                <br />
              </div>
            </div>
            <div id='reset-setting' className='m-2'>
              <h1 id='reset-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(4)}><RestartAltIcon sx={{ fontSize: '28px' }} />Reset Setting</h1>
              <div id='reset-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='reset' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>reset setting : </p></div>
                  <div id='reset-size-options' className=''>
                    <button className='w-[20vw] h-10 bg-red-500 hover:bg-white hover:text-red-500 rounded-lg transition'>Reset setting</button>
                  </div>
                </div>
              </div>
            </div>
            <div id='rtintro-animation-setting' className='m-2'>
              <h1 id='rtintro-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3 flex justify-start items-center' onClick={() => toggleHeight(5)}> <div id='rt-icon' className='w-6 h-6 bg-red-500 text-white overflow-hidden text-[15px] flex items-center justify-center font-extrabold'>RT</div> rtintro Setting</h1>
              <div id='rtintro-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='rtintro' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>RT Intro Animation : </p></div>
                  <div id='rtintro-size-options' className='grid grid-cols-2 gap-3 text-center'>
                    <button className='w-[10vw] btnSetting transition'>Disable</button>
                    <button className='w-[10vw] btnSetting transition'>Enable</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div onClick={scrollToTop} className={`fixed right-56 bottom-28 z-10 inline-block text-white bg-red-900 hover:bg-red-600 rounded-full shadow transition active:scale-90 ${(visible) ? 'default' : 'hidden'}`}><KeyboardDoubleArrowUpIcon sx={{ fontSize: '70px' }} className='scrollAnimation' /></div>
        </div >
      </HelmetProvider>
    </>
  )
}

export default Settings;

// https://www.youtube.com/watch?v=dvtDGyftss0