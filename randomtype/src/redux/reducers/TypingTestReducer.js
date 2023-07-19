const TypingTestReducer = (state = JSON.parse(localStorage.getItem("typingData")), action) => {
    console.log("reducer is running => ", state);
    switch (action.type) {
        case "UPDATE_SECOND":
            return {
                ...state,
                typing_test_timer: action.payload,
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
        case "ADD_WPM":
            return {
                ...state,
                typing_test_data:{
                    ...state.typing_test_data,
                    total_wpm:[...state.typing_test_data.total_wpm, action.payload]
                }
            }
        case "ADD_ACCURACY":
            return {
                ...state,
                typing_test_data:{
                    ...state.typing_test_data,
                    total_accuracy:[...state.typing_test_data.total_accuracy, action.payload]
                }
            }
        case "NO_OF_COUNT":
            return {
                ...state,
                typing_test_data:{
                    ...state.typing_test_data,
                    no_of_test:[...state.typing_test_data.no_of_test, action.payload]
                }
             }
        default: return state;
    }
}

export default TypingTestReducer;