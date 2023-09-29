const AuthReducer = (state=JSON.parse(atob(localStorage.getItem("auth"))), action) => {
    // console.log("reducer is running => ", state);
    switch (action.type) {
        case "AUTHENTICATED":
            return {
                ...state,
                auth: true
            }
        case "LOGOUT":
            return {
                ...state,
                auth: false
            }

        default: return state;
    }
}

export default AuthReducer;