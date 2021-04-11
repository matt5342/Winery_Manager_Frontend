import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import wineriesReducer from './wineriesReducer'
import tanksReducer from './tanksReducer'
//import all reducers here

// debugger
const createRootReducer = (history) => combineReducers({
    user: userReducer,
    wineries: wineriesReducer,
    tanks: tanksReducer,
    router: connectRouter(history)

})
export default createRootReducer