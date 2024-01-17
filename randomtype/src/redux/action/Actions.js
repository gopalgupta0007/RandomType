console.log("action");

const updateWpm = (wpm) => {
    return {
        type: "UPDATE_WPM",
        payload: wpm
    }
}
const updateAcc = (accuracy) => {
    return {
        type: "UPDATE_ACCURACY",
        payload: accuracy
    }
}
const updateTimer = (seconds) => {
    return {
        type: "UPDATE_SECOND",
        payload: seconds
    }
}
const storeWPM = (wpm) => {
    return {
        type: "ADD_WPM",
        payload: wpm
    }
}
const storeAcc = (accuracy) => {
    return {
        type: "ADD_ACCURACY",
        payload: accuracy
    }
}
const testCounter = (num) => {
    return {
        type: "NO_OF_COUNT",
        payload: num
    }
}
const userAuthenticated = () => {
    return {
        type: "AUTHENTICATED",
    }
}
const userLogout = () => {
    return {
        type: "LOGOUT"
    }
}
const setUserData = (data) => {
    return {
        type: "SET_DATA",
        payloadData: data
    }
}

// mode Actions
const setModemode = (mode) => {
    return {
        type: "SET_MODE_MODE",
        payloadMode: mode
    }
}
const setModetext = (text) => {
    return {
        type: "SET_MODE_TEXT",
        payloadMode: text
    }
}
const setModetime = (time) => {
    return {
        type: "SET_MODE_TIME",
        payloadMode: time
    }
}
const updateMessage = (msg) => {
    return {
        type: "UPDATE_MESSAGE",
        payloadMsg: msg
    }
}

// settings Actions
const updateFontFamily = (fontfamily) => {
    return {
        type: "UPDATE_FONTFAMILY",
        payloadSetting: fontfamily
    }
}
const updateFontSize = (fontsize) => {
    return {
        type: "UPDATE_FONTSIZE",
        payloadSetting: fontsize
    }
}
const updateCaretStyle = (caret) => {
    return {
        type: "UPDATE_CARETSTYLE",
        payloadSetting: caret
    }
}
const updateCaretSmooth = (caret) => {
    return {
        type: "TOGGLE_CARET_SMOOTH",
        payloadSetting: caret
    }
}

const updateSoundVolume = (volume) => {
    return {
        type: "UPDATE_SOUNDVOLUME",
        payloadSetting: volume
    }
}
const updateSoundType = (soundtype) => {
    return {
        type: "UPDATE_SOUNDTYPE",
        payloadSetting: soundtype
    }
}
const updateTheme = (theme) => {
    return {
        type: "UPDATE_THEME",
        payloadSetting: theme
    }
}
const resetSettings = (initialSetting) => {
    return {
        type: "RESET_SETTING",
        payloadResetSetting: initialSetting
    }
}
const introAnimation = (animation) => {
    return {
        type: "TOGGLE_ANIMATION",
        payloadSetting: animation
    }
}


export {
    updateWpm,
    updateAcc,
    updateTimer,
    storeWPM,
    storeAcc,
    testCounter,
    userAuthenticated,
    userLogout,
    setUserData,
    
    setModemode,
    setModetext,
    setModetime,
    updateMessage,

    updateFontFamily,
    updateFontSize,
    updateCaretStyle,
    updateCaretSmooth,
    updateSoundVolume,
    updateSoundType,
    updateTheme,
    resetSettings,
    introAnimation
}