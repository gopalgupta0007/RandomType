// import author from "../state/author"
// const AuthorReducer = (state = JSON.parse(localStorage.getItem("authorId")), action) => {
// intially author data store in localStorage
console.log("authorReducer");
const AuthorReducer = (state=JSON.parse(atob(localStorage.getItem("DBdata"))), action) => {
    console.log(state);
    // console.log("reducer is running => ", state);
    switch (action.type) {
        case "SET_DATA":
            return {
                ...state,
                UserData: action.payloadData
            }
        default: return state;
    }
}

export default AuthorReducer;