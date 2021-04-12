import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import wineriesReducer from './wineriesReducer'
import tanksReducer from './tanksReducer'
import lotsReducer from './lotsReducer';
//import all reducers here

// debugger
const createRootReducer = (history) => combineReducers({
    user: userReducer,
    wineries: wineriesReducer,
    tanks: tanksReducer,
    lots: lotsReducer,
    router: connectRouter(history)

})
export default createRootReducer