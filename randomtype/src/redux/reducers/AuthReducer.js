import { user } from "../state/state";

const AuthReducer = (state=user, action) => {
    console.log("typingtestReducer");
    switch (action.type) {
        case "AUTHENTICATED":
            return {
                ...state,
                isAuth: true
            }
        case "LOGOUT":
            return {
                ...state,
                isAuth: false
            }
        default: return state;
    }
}

export default AuthReducer