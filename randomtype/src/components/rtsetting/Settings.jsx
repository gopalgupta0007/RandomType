import React, { useEffect, useState } from 'react'
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { BsCursorText } from "react-icons/bs";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { btnGroup } from '../../Methods/methods';
import { useDispatch, useSelector } from 'react-redux';
import { introAnimation, resetSettings, updateCaretSmooth, updateCaretStyle, updateFontFamily, updateFontSize, updateSoundType, updateSoundVolume, updateTheme } from '../../redux/action/Actions';
import axios from 'axios';
import intialSettingData from '../../redux/state/author'
// import { alertTitleClasses } from '@mui/material';

const Settings = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const author = useSelector(state => state.AuthorReducer.UserData);
  const [setting, setSetting] = useState(author.data.setting);
  console.log(setting);
  const toggleHeight = (num) => {
    var slide_setting_option = document.querySelectorAll(".toggle-open")[num];
    slide_setting_option.classList.toggle("toggle-close");
  }

  useEffect(() => {
    var setting_options = document.getElementById("setting-options");
    setting_options.addEventListener("scroll", listenToScroll)
  })

  const themeBtn = [
    'BW Shadow',
    'tomato',
    'Magenta',
    'Blush Pink',
    'Brandy Rose',
    'Kidman',
    'Tangelo',
    'Dutch',
    'Yellow',
    'Lime',
    'Chartreuse',
    'vegetable',
    'Jungle',
    'Slate',
    'Blueberry',
    'Indigo Blue',
    'Aqua',
    'Violet',
    'Orchid',
    'Phlox',
    'Mahogany',
    'Gold Dust'
  ];
  const soundsBtn = [
    'keyboard',
    'bell',
    'mechanical',
    'perkins_bell',
    'bubble',
    'carriage',
    'click',
    'ding',
    'kclick',
    'none'
  ];
  const fontfamilyBtn = [
    "Roboto",
    "Playpen Sans",
    "Poppins",
    "Openn sans",
    "DynaPuff",
    "Oswald",
    "Mukta",
    "Ubuntu",
    "Lemon",
    "Instrument Serif",
    "Tektur",
    "Caveat",
    "Orbitron",
    "Kalnia",
    "Merienda",
    "Gluten"
  ];
  const fontSizes = ['xl', '2xl', '4xl', '6xl', '8xl']

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

  useEffect(() => {
    (setting.intro_animation) ?
      document.getElementById("rtSVG").classList.remove("hidden")
      :
      document.getElementById("rtSVG").classList.add("hidden")
  }, [setting.intro_animation])

  useEffect(() => {
    updateSettingDataInDB()
  }, [
    setting.font.family,
    setting.font.size,
    setting.caret.style,
    setting.caret.smooth,
    setting.sounds.volume,
    setting.sounds.sound,
    setting.intro_animation,
    setting.theme,
  ])

  console.log(setting.font.family);
  const updateSettingDataInDB = async () => {
    console.log(setting);
    try {
      console.log(author);
      const updateSettingTyping = await axios.patch(`/users/settings/${author._id}`,
        setting,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true
        }
      ) // for cookie because we have to use axious method to fetch data
      console.log("updateTyping :=> ", updateSettingTyping);
      console.log(setting);
    } catch (err) {
      console.log(err);
    }
    console.log(setting);
  }

  const resetSetting = () => {
    console.log("don1");
    let { font, caret, sounds, theme, intro_animation } = intialSettingData.UserData.data.setting;
    setSetting(prevsetting => (
      {
        ...prevsetting,
        font: font,
        caret: caret,
        sounds: sounds,
        theme: theme,
        intro_animation: intro_animation,
      }))
    dispatch(resetSettings(intialSettingData.UserData.data.setting))
    console.log("don2");
    console.log(setting);
  }

  const updateSetting = (btn) => {
    // console.log(btn.textContent);
    // console.log(btn2);
    const valueOfSettingBtn = btn.target.textContent.toLowerCase();
    const parentClass = btn.target.parentElement.getAttribute('class').split(" ")[0]

    if (parentClass === "btn-group-4") {
      // when the reducer stored data updated so that at same time useEffect will start side way to patch(update) setting data stored in the database
      // font-Family
      setSetting(prevsetting => ({ ...prevsetting, font: { ...prevsetting.font, family: valueOfSettingBtn } }))
      dispatch(updateFontFamily(valueOfSettingBtn))
      console.log(setting);
    } else if (parentClass === "btn-group-5") {
      // font-size
      setSetting(prevsetting => ({ ...prevsetting, font: { ...prevsetting.font, size: valueOfSettingBtn } }))
      dispatch(updateFontSize(valueOfSettingBtn))
    } else if (parentClass === "btn-group-6") {
      // caret-style
      console.log(valueOfSettingBtn);
      if (!(valueOfSettingBtn === "|") && !(valueOfSettingBtn === "_") && !(valueOfSettingBtn === "off") && (valueOfSettingBtn === ".")) {
        setSetting(prevsetting => ({ ...prevsetting, caret: { ...prevsetting.caret, style: 'box' } }))
        dispatch(updateCaretStyle('box'))
      } else {
        setSetting(prevsetting => ({ ...prevsetting, caret: { ...prevsetting.caret, style: valueOfSettingBtn } }))
        dispatch(updateCaretStyle(valueOfSettingBtn))
      }
    } else if (parentClass === "btn-group-66") {
      // caret-smooth
      console.log(valueOfSettingBtn);
      if (valueOfSettingBtn === "smooth") {
        setSetting(prevsetting => ({ ...prevsetting, caret: { ...prevsetting.caret, smooth: true } }))
        dispatch(updateCaretSmooth(true))
      } else if (valueOfSettingBtn === "normal") {
        setSetting(prevsetting => ({ ...prevsetting, caret: { ...prevsetting.caret, smooth: false } }))
        dispatch(updateCaretSmooth(false))
      } else {
        setSetting(prevsetting => ({ ...prevsetting, caret: { ...prevsetting.caret, smooth: false } }))
        dispatch(updateCaretSmooth(false))
      }
      // setSetting(prevsetting => ({ ...prevsetting, caret: { ...prevsetting.caret, style: valueOfSettingBtn } }))
      // dispatch(updateCaretSmooth(valueOfSettingBtn))
    } else if (parentClass === "btn-group-7") {
      // sound-volume
      setSetting(prevsetting => ({ ...prevsetting, sounds: { ...prevsetting.sounds, volume: valueOfSettingBtn } }))
      dispatch(updateSoundVolume(valueOfSettingBtn))
    } else if (parentClass === "btn-group-8") {
      // sound-type
      // playsound
      setSetting(prevsetting => ({ ...prevsetting, sounds: { ...prevsetting.sounds, sound: valueOfSettingBtn } }))
      dispatch(updateSoundType(valueOfSettingBtn))
    } else if (parentClass === "btn-group-9") {
      // theme
      console.log(valueOfSettingBtn);
      setSetting(prevsetting => ({ ...prevsetting, theme: valueOfSettingBtn }))
      dispatch(updateTheme(valueOfSettingBtn))
    } else if (parentClass === "btn-group-10") {
      // intro-animation
      console.log(valueOfSettingBtn);
      if (valueOfSettingBtn === "enable") {
        setSetting(prevsetting => ({ ...prevsetting, intro_animation: true }))
        dispatch(introAnimation(true))
      } else if (valueOfSettingBtn === "disable") {
        setSetting(prevsetting => ({ ...prevsetting, intro_animation: false }))
        dispatch(introAnimation(false))
      } else {
        setSetting(prevsetting => ({ ...prevsetting, intro_animation: false }))
        dispatch(introAnimation(false))
      }
    }
    console.log(author);
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
          <div id='setting-options' className='flex flex-col gap-y-3' style={{ height: '65vh', overflow: 'scroll', scrollBehavior: 'smooth' }}>
            <div id='font-setting' className='m-2'>
              <h1 id='font-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(0)}><HdrAutoIcon sx={{ fontSize: '30px' }} />Fonts</h1>
              <div id='font-options' className='toggle-open flex flex-col text-white px-5 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div>
                  <p className='text-xl my-2'>font family : </p>
                </div>
                <div id='font-familys' className='btn-group-4 grid grid-cols-4 gap-3 text-center'>
                  {fontfamilyBtn.map((buttonValue, index) => (
                    <button
                      key={index}
                      className={`btnSetting transition btn ${setting.font.family.toLowerCase() === buttonValue.toLowerCase() ? 'activeSetting' : ''}`}
                      onClick={(e) => { btnGroup(4, 'activeSetting', e.target); updateSetting(e) }}
                    >
                      {buttonValue}
                    </button>
                  ))}
                </div>
                <br />
                <hr />
                <div id='font-size' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>font size : </p></div>
                  <div><p id='demo' className={`h-16 flex justify-center align-middle items-center text-${author.data.setting.font.size} text-center w-20 transition`}>Aa</p></div>
                  <div id='font-size-options' className='btn-group-5 grid grid-cols-5 gap-5 text-center'>
                    {fontSizes.map((buttonValue, index) => (
                      <button
                        key={index}
                        style={{ padding: '5px 30px' }}
                        className={`btnSetting transition btn ${setting.font.size.toLowerCase() === buttonValue.toLowerCase() ? 'activeSetting' : ''}`}
                        onClick={(e) => { btnGroup(5, 'activeSetting', e.target); updateSetting(e) }}
                      >
                        {buttonValue}
                      </button>
                    ))}
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
                  <div id='caret-style-options' className='btn-group-6 grid grid-cols-4 gap-5 text-center'>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.caret.style === "|" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }}>|</button>
                    <button className={`w-[7vw] btnSetting transition btn flex justify-center items-center group ${setting.caret.style === "box" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }} ><div className={`w-3 h-5 transition group-hover:bg-red-500 ${setting.caret.style === "box" ? 'bg-red-500' : 'bg-white'}`}>.</div></button>
                    <button className={`w-[7vw] btnSetting transition btn text-3xl ${setting.caret.style === "_" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }}>_</button>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.caret.style === "off" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }}>off</button>
                  </div>
                </div>
                <hr />
                {/* <div>
                  <p className='text-xl my-2'>caret smooth : </p>
                </div> */}
                <div id='rtintro' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl my-2'>caret smooth : </p></div>
                  <div id='rtintro-size-options' className='btn-group-66 grid grid-cols-2 gap-3 text-center'>
                    <button className={`w-[10vw] btnSetting transition btn ${!setting.caret.smooth ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(66, 'activeSetting', e.target); updateSetting(e) }}>Normal</button>
                    <button className={`w-[10vw] btnSetting transition btn ${setting.caret.smooth ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(66, 'activeSetting', e.target); updateSetting(e) }}>Smooth</button>
                  </div>
                </div>
                {/* <div id='rtintro-size-options' className='btn-group-10 grid grid-cols-2 gap-3 text-center'>
                  <button className={`w-[10vw] btnSetting transition btn ${!setting.intro_animation ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(10, 'activeSetting', e.target); updateSetting(e) }}>Disable</button>
                  <button className={`w-[10vw] btnSetting transition btn ${setting.intro_animation ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(10, 'activeSetting', e.target); updateSetting(e) }}>Enable</button>
                </div> */}
                {/* <div id='caret-smooth' className='grid grid-cols-4 gap-3 text-center'>
                  <button className='btnSetting transition'>Roboto</button>
                  <button className='btnSetting transition'>Roboto Condensed</button>
                  <button className='btnSetting transition'>Roboto Mono</button>
                  <button className='btnSetting transition'>Poppins</button>
                </div> */}
                <br />
              </div>
            </div>
            <div id='sounds-setting' className='m-2'>
              <h1 id='sounds-heading' className='text-red-500 text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative z-10 px-3' onClick={() => toggleHeight(2)}><VolumeUpIcon sx={{ fontSize: '28px' }} />Sound</h1>
              <div id='sounds-options' className='toggle-open flex flex-col text-white px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='sound-volume' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>sound volume : </p></div>
                  <div id='sound-volume-options' className='btn-group-7 grid grid-cols-4 gap-5 text-center'>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.sounds.volume === "mute" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(7, 'activeSetting', e.target); updateSetting(e) }}>mute</button>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.sounds.volume === "low" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(7, 'activeSetting', e.target); updateSetting(e) }}>low</button>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.sounds.volume === "mid" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(7, 'activeSetting', e.target); updateSetting(e) }}>mid</button>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.sounds.volume === "high" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(7, 'activeSetting', e.target); updateSetting(e) }}>high</button>
                  </div>
                </div>
                <hr />
                <div>
                  <p className='text-xl my-2'>select sounds : </p>
                </div>
                <div id='sounds' className='btn-group-8 grid grid-cols-4 gap-3 text-center'>
                  {soundsBtn.map((buttonValue, index) => (
                    <button
                      key={index}
                      className={`btnSetting transition btn ${setting.sounds.sound === buttonValue.toLowerCase() ? 'activeSetting' : ''}`}
                      onClick={(e) => { btnGroup(8, 'activeSetting', e.target); updateSetting(e) }}
                    >
                      {buttonValue}
                    </button>
                  ))}
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
                <div id='themes' className='btn-group-9 grid grid-cols-4 gap-3 text-center'>
                  {themeBtn.map((buttonValue, index) => (
                    <button
                      key={index}
                      className={`flex justify-around btnSetting transition btn group ${setting.theme.toLowerCase() === buttonValue.toLowerCase() ? 'activeSetting' : ''}`}
                      onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }}
                    >
                      <div>
                        {buttonValue}
                      </div>
                      <div id='color' className='flex gap-x-3 hidden group-hover:visible'>
                        <div className='circul bg-white w-5 h-5 rounded-full'></div>
                        <div className='circul bg-white w-5 h-5 rounded-full'></div>
                        <div className='circul bg-white w-5 h-5 rounded-full'></div>
                      </div>
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
                    <button className='w-[20vw] h-10 bg-red-500 hover:bg-white hover:text-red-500 rounded-lg transition' onClick={resetSetting}>Reset setting</button>
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
                  <div id='rtintro-size-options' className='btn-group-10 grid grid-cols-2 gap-3 text-center'>
                    <button className={`w-[10vw] btnSetting transition btn ${!setting.intro_animation ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(10, 'activeSetting', e.target); updateSetting(e) }}>Disable</button>
                    <button className={`w-[10vw] btnSetting transition btn ${setting.intro_animation ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(10, 'activeSetting', e.target); updateSetting(e) }}>Enable</button>
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
/* <button className='w-[7vw] btnSetting transition btn flex justify-center items-center hover:bg-red-500' onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }} onMouseEnter={mouseEnterStyle} onMouseLeave={mouseLeaveStyle}><div className='w-3 h-5 transition bg-white group-hover:bg-red-500'></div></button> */