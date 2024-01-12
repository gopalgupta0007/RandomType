import author from "../state/author"
// const AuthorReducer = (state = JSON.parse(localStorage.getItem("authorId")), action) => {
// intially author data store in localStorage
console.log("authorReducer");
// const AuthorReducer = (state=JSON.parse(atob(localStorage.getItem("DBdata"))), action) => {
const AuthorReducer = (state = author, action) => {
    console.log(state);
    // console.log("reducer is running => ", state);
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                UserData: action.payloadData
            }
        case "SET_MODE_MODE":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        mode: action.payloadMode
                    }
                }
            }
        case "SET_MODE_TEXT":
            return {
                ...state,
                UserData: {
                    ...state.UserData,
                    data: {
                        ...state.UserData.data,
                        text: action.payloadMode
                    }
                }
            }
        case "SET_MODE_TIME":
            return {
                ...state,
                UserData:{
                    ...state.UserData,
                    data:{
                        ...state.UserData.data,
                        time:action.payloadMode
                    }
                }
            }
        default: return state;
    }
}

export default AuthorReducer;