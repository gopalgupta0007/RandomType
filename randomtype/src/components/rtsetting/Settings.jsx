import React, { useEffect, useState } from 'react'
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { BsCursorText } from "react-icons/bs";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { btnGroup, copyInClipboard, setFavicons, setThemeOnBody, togglRTIntroAnimation } from '../../Methods/methods';
import { useDispatch, useSelector } from 'react-redux';
import { introAnimation, resetSettings, updateCaretSmooth, updateCaretStyle, updateFontFamily, updateFontSize, updateSoundType, updateSoundVolume, updateTheme } from '../../redux/action/Actions';
import axios from 'axios';
import intialSettingData from '../../redux/state/author'
// import { alertTitleClasses } from '@mui/material';

import keyboard from './sounds/keyboard.mp3'
import bell from './sounds/bell.mp3'
import mechanical from './sounds/mechanical.mp3'
import perkins_bell from './sounds/perkins_bell.mp3'
import bubble from './sounds/bubble.mp3'
import carriage from './sounds/carriage.mp3'
import click from './sounds/click.mp3'
import ding from './sounds/ding.mp3'
import kclick from './sounds/kclick.mp3'
import useSound from 'use-sound';
import { toast } from 'react-toastify';
import { fontSizes, fontfamilyBtn, soundsBtn } from './lists/SettingLists';

const Settings = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const author = useSelector(state => state.AuthorReducer.UserData);
  const [setting, setSetting] = useState(author.data.setting);
  const [keyboardSound] = useSound(keyboard, { volume: 2 });
  const [bellSound] = useSound(bell, { volume: 2 });
  const [mechanicalSound] = useSound(mechanical, { volume: 2 });
  const [perkins_bellSound] = useSound(perkins_bell, { volume: 2 });
  const [bubbleSound] = useSound(bubble, { volume: 2 });
  const [carriageSound] = useSound(carriage, { volume: 2 });
  const [clickSound] = useSound(click, { volume: 2 });
  const [dingSound] = useSound(ding, { volume: 2 });
  const [kclickSound] = useSound(kclick, { volume: 2 });
  console.log(setting);
  const toggleHeight = (num) => {
    var slide_setting_option = document.querySelectorAll(".toggle-open")[num];
    slide_setting_option.classList.toggle("toggle-close");
  }

  useEffect(() => {
    if (!author.data.setting.theme || author.data.setting.theme==="") {
      dispatch(updateTheme('tomato'))
    }else{
      togglRTIntroAnimation(author.data.setting.intro_animation);
      setFavicons(setting.theme.replace(/ /g, "_").toLowerCase())
    }
  }, [])

  useEffect(() => {
    var setting_options = document.getElementById("setting-options");
    setting_options.addEventListener("scroll", listenToScroll)
  })

  const playSound = [
    keyboardSound,
    bellSound,
    mechanicalSound,
    perkins_bellSound,
    bubbleSound,
    carriageSound,
    clickSound,
    dingSound,
    kclickSound
  ]

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
    // append theme class to the body
    const themeCls = setting.theme.replace(/ /g, "_").toLowerCase(); 
    setThemeOnBody(themeCls)
    setFavicons(themeCls)
  }, [setting.theme])

  // useEffect(()=>{
  //   updateSettingDataInDB()
  // },[])

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
    setting.theme
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
    dispatch(resetSettings(intialSettingData.UserData.data.setting));
    toast.success("Reset Setting Successfull")
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
        <div className="text-bnw text-center text-5xl stroke_colorNwidth">Setting</div>
        <div id="settings" className='text-black w-4/5 m-auto font-extrabold'>
          <div id="setting-navigation" className='flex justify-center gap-x-14 text-3xl my-5 border border-x-0 border-y-2' style={{borderColor:'var(--BnW)'}}>
            <a href="#font-setting" className='text-base-color scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><HdrAutoIcon sx={{ fontSize: '1.2em' }} />Font</a>
            <a href="#caret-setting" className='text-base-color scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><BsCursorText style={{ display: 'inline', border: '2px solid var(--base_color)', borderRadius: '50%', backgroundColor: 'var(--base_color)', color: 'white', fontWeight: 'bolder' }} />Caret</a>
            <a href="#sounds-setting" className='text-base-color scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><VolumeUpIcon sx={{ fontSize: '1.2em' }} />Sounds</a>
            <a href="#theme-setting" className='text-base-color scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><ColorLensIcon sx={{ fontSize: '1.2em' }} />Theme</a>
            <a href="#reset-setting" className='text-base-color scale-100 hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center' ><RestartAltIcon sx={{ fontSize: '1.2em' }} />Reset</a>
            <a href="#rtintro-animation-setting" className='text-base-color hover:text-white hover:scale-105 transition-all duration-200 ease-in-out flex items-center'><div id='rt-icon' className='w-6 h-6 bg-base-color text-white overflow-hidden text-[15px] flex items-center justify-center font-extrabold rounded-full scale-110'>RT</div>Intro-Animation</a>
          </div>
          <div id='setting-options' className='flex flex-col gap-y-3 font-extrabold' style={{ height: '65vh', overflow: 'scroll', scrollBehavior: 'smooth' }}>
            <div id='font-setting' className='m-2'>
              <h1 id='font-heading' className='text-base-color text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative px-3' onClick={() => toggleHeight(0)}><HdrAutoIcon sx={{ fontSize: '30px' }} />Fonts</h1>
              <div id='font-options' className='toggle-open flex flex-col text-bnw px-5 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
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
              <h1 id='caret-heading' className='text-base-color text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative px-3' onClick={() => toggleHeight(1)}><BsCursorText style={{ display: 'inline', border: '2px solid var(--base_color)', borderRadius: '50%', backgroundColor: 'var(--base_color)', color: 'white', fontWeight: 'bolder' }} />Caret</h1>
              <div id='caret-options' className='toggle-open flex flex-col text-bnw px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='caret-style' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>caret style : </p></div>
                  {/* <div><p id='demo' className='h-16 flex justify-center align-middle items-center text-5xl text-center w-20 transition'>Aa</p></div> */}
                  <div id='caret-style-options' className='btn-group-6 grid grid-cols-4 gap-5 text-center'>
                    <button className={`w-[7vw] btnSetting transition btn ${setting.caret.style === "|" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }}>|</button>
                    <button className={`w-[7vw] btnSetting transition btn flex justify-center items-center group ${setting.caret.style === "box" ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }} ><div className={`w-3 h-5 transition group-hover:bg-base-color ${setting.caret.style === "box" ? 'bg-base-color' : 'bg-white'}`}>.</div></button>
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
                <br />
              </div>
            </div>
            <div id='sounds-setting' className='m-2'>
              <h1 id='sounds-heading' className='text-base-color text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative px-3' onClick={() => toggleHeight(2)}><VolumeUpIcon sx={{ fontSize: '28px' }} />Sound</h1>
              <div id='sounds-options' className='toggle-open flex flex-col text-bnw px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
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
                      onClick={(e) => { btnGroup(8, 'activeSetting', e.target); updateSetting(e); playSound[index](); }}
                    >
                      {buttonValue}
                    </button>
                  ))}
                </div>
                <br />
              </div>
            </div>
            <div id='theme-setting' className='m-2'>
              <h1 id='theme-heading' className='text-base-color text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative px-3' onClick={() => toggleHeight(3)}><ColorLensIcon sx={{ fontSize: '28px' }} />Themes</h1>
              <div id='theme-options' className='toggle-open flex flex-col text-bnw px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div>
                  <p className='text-xl my-2'>Themes : </p>
                </div>
                <div id='themes' className='btn-group-9 grid grid-cols-4 gap-3 text-center'>
                  {/* in database store theme name in lowercase only (In database) */}
                  {/* in Redux store theme name in lowercase and as well as place of space added underscore(' '==='_') (In Redux Store) */}
                  <button className={`flex justify-around btnSetting transition btn yellow ${setting.theme.toLowerCase() === "Yellow".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--background_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--base_color)'}}>Yellow</button>
                  <button className={`flex justify-around btnSetting transition btn cherry_red ${setting.theme.toLowerCase() === "Cherry Red".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--background_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--base_color)'}}>Cherry Red</button>
                  <button className={`flex justify-around btnSetting transition btn jungle ${setting.theme.toLowerCase() === "Jungle".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--background_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--base_color)'}}>Jungle</button>
                  <button className={`flex justify-around btnSetting transition btn ibm ${setting.theme.toLowerCase() === "IBM".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--background_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--base_color)'}}>IBM</button>
                  <button className={`flex justify-around btnSetting transition btn indigo_blue ${setting.theme.toLowerCase() === "Indigo Blue".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--background_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--base_color)'}}>Indigo Blue</button>
                  <button className={`flex justify-around btnSetting transition btn bw_shadow ${setting.theme.toLowerCase() === "BW Shadow".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid #aaa'}}>BW Shadow</button>
                  <button className={`flex justify-around btnSetting transition btn tomato ${setting.theme.toLowerCase() === "tomato".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>tomato</button>
                  <button className={`flex justify-around btnSetting transition btn magenta ${setting.theme.toLowerCase() === "Magenta".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Magenta</button>
                  <button className={`flex justify-around btnSetting transition btn blush_pink ${setting.theme.toLowerCase() === "Blush Pink".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Blush Pink</button>
                  <button className={`flex justify-around btnSetting transition btn fuchsia ${setting.theme.toLowerCase() === "Fuchsia".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Fuchsia</button>
                  <button className={`flex justify-around btnSetting transition btn kidman ${setting.theme.toLowerCase() === "Kidman".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Kidman</button>
                  <button className={`flex justify-around btnSetting transition btn tangelo ${setting.theme.toLowerCase() === "Tangelo".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Tangelo</button>
                  <button className={`flex justify-around btnSetting transition btn lavender_gray ${setting.theme.toLowerCase() === "Lavender Gray".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Lavender Gray</button>
                  <button className={`flex justify-around btnSetting transition btn lime ${setting.theme.toLowerCase() === "Lime".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Lime</button>
                  <button className={`flex justify-around btnSetting transition btn vegetable ${setting.theme.toLowerCase() === "vegetable".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>vegetable</button>
                  <button className={`flex justify-around btnSetting transition btn aqua ${setting.theme.toLowerCase() === "Aqua".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Aqua</button>
                  <button className={`flex justify-around btnSetting transition btn violet ${setting.theme.toLowerCase() === "Violet".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Violet</button>
                  <button className={`flex justify-around btnSetting transition btn turquoise ${setting.theme.toLowerCase() === "Turquoise".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Turquoise</button>
                  <button className={`flex justify-around btnSetting transition btn blue ${setting.theme.toLowerCase() === "Blue".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Blue</button>
                  <button className={`flex justify-around btnSetting transition btn mahogany ${setting.theme.toLowerCase() === "Mahogany".toLowerCase() ? 'activeSetting' : ''}`} onClick={(e) => { btnGroup(9, 'activeSetting', e.target); updateSetting(e) }} style={{color:'var(--base_color)', backgroundColor:'var(--root_background_color)', border:'3px solid var(--background_color)'}}>Mahogany</button>
                </div>
                <br />
              </div>
            </div>
            <div id='reset-setting' className='m-2'>
              <h1 id='reset-heading' className='text-base-color text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative px-3' onClick={() => toggleHeight(4)}><RestartAltIcon sx={{ fontSize: '28px' }} />Reset Setting</h1>
              <div id='reset-options' className='toggle-open flex flex-col text-bnw px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
                <br />
                <div id='copy-data' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>copy setting data(In JSON) : </p></div>
                  <div id='copy-data-size-options' className=''>
                    <button className='w-[20vw] h-10 bg-base-color hover:bg-white textHover rounded-lg transition' onClick={()=>copyInClipboard(author.data, toast.success, toast.error)}>copy data</button>
                  </div>
                </div>
                <div id='reset' className='h-30 flex justify-between items-center p-2' >
                  <div><p className='text-xl'>reset setting : </p></div>
                  <div id='reset-size-options' className=''>
                    <button className='w-[20vw] h-10 bg-base-color hover:bg-white textHover rounded-lg transition' onClick={resetSetting}>Reset setting</button>
                  </div>
                </div>
              </div>
            </div>
            <div id='rtintro-animation-setting' className='m-2'>
              <h1 id='rtintro-heading' className='text-base-color text-3xl bg-slate-300 bg-opacity-90 border-gray-700 rounded-lg py-3 relative px-3 flex justify-start items-center' onClick={() => toggleHeight(5)}> <div id='rt-icon' className='w-6 h-6 bg-base-color overflow-hidden text-[15px] flex items-center justify-center font-extrabold text-white'>RT</div> rtintro Setting</h1>
              <div id='rtintro-options' className='toggle-open flex flex-col text-bnw px-5 gap-y-2 bg-slate-200 bg-opacity-10 rounded-lg mt-[-10px]'>
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
          <div onClick={scrollToTop} className={`fixed right-56 bottom-28 inline-block text-bnw bghoverActive hover:bg-base-color rounded-full shadow transition active:scale-90 ${(visible) ? 'default' : 'hidden'}`}><KeyboardDoubleArrowUpIcon sx={{ fontSize: '70px' }} className='scrollAnimation' /></div>
        </div >
      </HelmetProvider>
    </>
  )
}


export default Settings;

// https://www.youtube.com/watch?v=dvtDGyftss0
/* <button className='w-[7vw] btnSetting transition btn flex justify-center items-center hover:bg-base-color' onClick={(e) => { btnGroup(6, 'activeSetting', e.target); updateSetting(e) }} onMouseEnter={mouseEnterStyle} onMouseLeave={mouseLeaveStyle}><div className='w-3 h-5 transition bg-white group-hover:bg-base-color'></div></button> */