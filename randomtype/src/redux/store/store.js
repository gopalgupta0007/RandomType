import { createStore } from 'redux';
import reducers from "../reducers/CombineReducers/Reducers"

const store = createStore(reducers)

export default store;