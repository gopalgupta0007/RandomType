import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { setFavicons, setThemeOnBody, togglRTIntroAnimation } from '../../Methods/methods'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '../../redux/action/Actions'
import TripChart from '../User/charts/TripChart'

const About = () => {
  const author = useSelector(state => state.AuthorReducer.UserData)
  const dispatch = useDispatch()
  useEffect(() => {
    if (!author.data.setting.theme || author.data.setting.theme === "") {
      dispatch(updateTheme('tomato'))
    } else {
      togglRTIntroAnimation(author.data.setting.intro_animation)
      setThemeOnBody(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
      setFavicons(author.data.setting.theme.replace(/ /g, "_").toLowerCase());
    }
  }, [])
  return (
    <HelmetProvider>
      <Helmet><title>About || RandomType</title></Helmet>
      <div className="text-bnw text-center text-5xl stroke_colorNwidth">About</div>
      <div id='about-container' className='w-4/5 h-[75vh] text-justify mx-auto text-lg text-bnw overflow-y-scroll p-5'>
        <TripChart />
        <p>
          &nbsp;&nbsp;A simple and customisable typing test is called Randomtype. Numerous test scenarios, an account system for storing typing speed data, and customisable features like themes, music, a smooth caret, and more are all included. By subtly delivering text prompts and displaying written characters in-place, Monkeytype aims to simulate the feel of natural keyboard typing during a typing test. It also offers clear, instantaneous feedback on mistakes, speed, and accuracy.
          <br />&nbsp;&nbsp;The random mode, which is the most challenging option, allows users to input characters, numbers, and special characters (such as!.@,#,$,%) to learn about more characters at each location without constantly looking at the board.
          <br />&nbsp;&nbsp;Try yourself in different modes, monitor your development, and quicken your pace.
        </p>
        <h1>states</h1>
        <p>
          <br/><b className='underline'>wpm</b> - total number of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.
          <br/><b className='underline'>acc</b> - percentage of correctly pressed keys.
          <br/><b className='underline'>char</b> - correct characters / incorrect characters. Calculated after the test has ended.
          <br/><b className='underline'>seconds</b> - The user is able to customize the countdown timer to their desired length, which includes options of 15s, 30s, 60s, and 120s.
          <br/><b className='underline'>consistency</b> - based on the variance of your raw wpm. Closer to 100% is better. Calculated using the coefficient of variation of raw wpm and mapped onto a scale from 0 to 100.
          </p>
      </div>
    </HelmetProvider>
  )
}

export default About