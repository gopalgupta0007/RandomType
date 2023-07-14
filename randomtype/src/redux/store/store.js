import { createStore } from 'redux';
import reducers from "../reducers/CombineReducers/Reducers"
// import state from "../state/state"

const store = createStore(reducers)

export default store;