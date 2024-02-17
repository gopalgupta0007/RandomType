import React, { useEffect } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { setFavicons, setThemeOnBody, togglRTIntroAnimation } from '../../Methods/methods'
import { useDispatch, useSelector } from 'react-redux'
import { updateTheme } from '../../redux/action/Actions'

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
    </HelmetProvider>
  )
}

export default About