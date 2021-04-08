import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import wineriesReducer from './wineriesReducer'
//import all reducers here

// debugger
const createRootReducer = (history) => combineReducers({
    user: userReducer,
    wineries: wineriesReducer,
    router: connectRouter(history)

})
export default createRootReducer