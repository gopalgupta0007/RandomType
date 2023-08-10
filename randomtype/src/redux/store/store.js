import { createStore } from 'redux';
import reducers from "../reducers/CombineReducers/Reducers"

console.log("before store");
const store = createStore(reducers)
console.log("after store");

export default store;