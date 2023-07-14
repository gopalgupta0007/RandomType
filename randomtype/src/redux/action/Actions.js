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

export { updateWpm, updateAcc, updateTimer }