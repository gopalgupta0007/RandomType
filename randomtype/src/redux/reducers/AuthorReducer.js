import author from "../state/author"
// const AuthorReducer = (state = JSON.parse(localStorage.getItem("authorId")), action) => {
const AuthorReducer = (state=author, action) => {
    // console.log("reducer is running => ", state);
    switch (action.type) {
        case "SET_ID":
            return {
                ...state,
                id: action.payloadID
            }
        case "SET_DATA":
            return {
                ...state,
                data: action.payloadData
            }
        default: return state;
    }
}

export default AuthorReducer;