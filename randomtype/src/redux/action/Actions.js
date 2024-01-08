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
// const userId = (id) => {
//     return {
//         type: "SET_ID",
//         payloadID: id
//     }
// }
const setUserData = (data) => {
    return {
        type: "SET_DATA",
        payloadData: data
    }
}
export { updateWpm, updateAcc, updateTimer, storeWPM, storeAcc, testCounter, userAuthenticated, userLogout, setUserData }