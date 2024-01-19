import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { togglRTIntroAnimation } from '../../Methods/methods'
import { useSelector } from 'react-redux'

const About = () => {
  const author = useSelector(state => state.AuthorReducer.UserData)

  useEffect(() => {
    togglRTIntroAnimation(author.data.setting.intro_animation)
  }, [])
  return (
    <HelmetProvider>
      <Helmet><title>About || RandomType</title></Helmet>
      <div className="text-white text-center text-5xl stroke_colorNwidth">About</div>
    </HelmetProvider>
  )
}

export default About