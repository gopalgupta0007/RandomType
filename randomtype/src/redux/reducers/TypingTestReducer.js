import data from "../state/state";

const TypingTestReducer = (state = data, action) => {
    console.log("reducer is running => ", state);
    switch (action.type) {
        case "UPDATE_SECOND":
            return {
                ...state,
                typing_test_timer: action.payload
            }
        case "UPDATE_WPM":
            return {
                ...state,
                word_per_minute: action.payload
            }
        case "UPDATE_ACCURACY":
            return {
                ...state,
                typing_accuracy: action.payload
            }
        default:
            return state;
    }
}

export default TypingTestReducer;