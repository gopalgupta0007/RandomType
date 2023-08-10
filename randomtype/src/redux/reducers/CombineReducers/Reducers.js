import { combineReducers } from 'redux';
import TypingTestReducer from '../TypingTestReducer'

console.log("before reducer container");
const reducers = combineReducers({
    TypingTestReducer
})
console.log("after reducer container");

export default reducers;