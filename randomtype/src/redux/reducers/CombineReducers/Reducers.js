import { combineReducers } from 'redux';
import TypingTestReducer from '../TypingTestReducer'
import AuthReducer from '../AuthReducer';

console.log("before reducer container");
const reducers = combineReducers({
    TypingTestReducer,
    AuthReducer
})
console.log("after reducer container");

export default reducers;