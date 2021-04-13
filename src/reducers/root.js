import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import wineriesReducer from './wineriesReducer'
import tanksReducer from './tanksReducer'
import lotsReducer from './lotsReducer';
import actionsReducer from './actionsReducer';
//import all reducers here

// debugger
const createRootReducer = (history) => combineReducers({
    user: userReducer,
    wineries: wineriesReducer,
    tanks: tanksReducer,
    lots: lotsReducer,
    actions: actionsReducer,
    router: connectRouter(history)

})
export default createRootReducer