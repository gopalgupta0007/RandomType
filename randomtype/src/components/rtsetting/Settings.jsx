import React from 'react'

const Settings = () => {
  return (
    <>
      <div className="text-white text-center text-5xl">Setting</div>
      {/* give width 80% */}
      <div id="settings" className='bg-yellow-200 text-black w-4/5 m-auto'>
        <div id="setting-navigation"></div>
        <div id='setting-options'>
          <div id='fontfamily-setting'></div>
          <div id='fontsize-setting'></div>
          <div id='caret-setting'></div>
          <div id='sounds-setting'></div>
          <div id='theme-setting'></div>
          <div id='reset-setting'></div>
        </div>
      </div>
    </>
  )
}

export default Settings;