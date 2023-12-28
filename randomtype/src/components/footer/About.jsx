import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

const About = () => {
  return (
    <HelmetProvider>
      <Helmet><title>About || RandomType</title></Helmet>
      <div className="text-white text-center text-5xl">About</div>
    </HelmetProvider>
  )
}

export default About