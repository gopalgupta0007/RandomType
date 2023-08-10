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
    console.log("action");
    return {
        type: "AUTHENTICATED"
    }
}
const userLogout = () => {
    console.log("action");
    return {
        type: "LOGOUT"
    }
}
export { updateWpm, updateAcc, updateTimer, storeWPM, storeAcc, testCounter, userAuthenticated, userLogout }