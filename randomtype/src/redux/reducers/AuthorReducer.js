
const AuthorReducer = (state = JSON.parse(localStorage.getItem("authorId")), action) => {
    // console.log("reducer is running => ", state);
    switch (action.type) {
        case "SET_ID":
            return {
                ...state,
                id: action.payloadID
            }
        default: return state;
    }
}

export default AuthorReducer;