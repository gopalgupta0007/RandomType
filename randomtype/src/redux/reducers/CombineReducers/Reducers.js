import { combineReducers } from 'redux';
import TypingTestReducer from '../TypingTestReducer'
import AuthReducer from '../AuthReducer';
import AuthorReducer from '../AuthorReducer'

console.log("before reducer container");
const reducers = combineReducers({
    TypingTestReducer,
    AuthReducer,
    AuthorReducer
})
console.log("after reducer container");

export default reducers;