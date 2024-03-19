import React from 'react'
import { NavLink } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import { useSelector } from 'react-redux';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import { openShortcutList } from '../../Methods/methods';

const Footer = () => {
  const auth = useSelector(state => state.AuthReducer.auth)
  function gotoGithub() {
    window.open("https://github.com/gopalgupta0007/randomtype","_blank")
  }
  return (
    <div className='flex justify-between px-20 text-bnw fixed w-screen bottom-0 font-extrabold'>
      <div className='flex gap-x-10'>
        <div style={{cursor:'pointer'}} className="scale-100 hover:scale-110 active:scale-95 duration-300" onClick={gotoGithub}><GitHubIcon className="scale-75 text-base-color"/>Github</div>
        <NavLink to="/about" className="scale-100 hover:scale-110 active:scale-95 duration-300"><InfoIcon className="scale-75 text-base-color "/>AboutUs</NavLink>
        {auth&&<NavLink to="/contact" className="scale-100 hover:scale-110 active:scale-95 duration-300"><AlternateEmailIcon className="scale-75 text-base-color"/>ContactUs</NavLink>}
      </div>
      <div className='flex gap-x-5'>
        <div className='hover:scale-110 active:scale-95 transition' onClick={openShortcutList}><ShortcutIcon className="scale-75 text-base-color"/>shortcut Keys</div>
        <div className='hover:scale-110 active:scale-95 transition'><SwapCallsIcon className="scale-75 text-base-color"/>version : 1.1.1</div>
      </div>
    </div>
  )
}

export default Footer