import { createStore } from 'redux';
import reducers from "../reducers/CombineReducers/Reducers";
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'persist-store',
    storage
}
const persistdReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistdReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const persistor = persistStore(store)
export default store;