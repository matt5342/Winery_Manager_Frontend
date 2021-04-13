import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import userReducer from './userReducer'
import sectionsReducer from './sectionsReducer'
import tanksReducer from './tanksReducer'
import lotsReducer from './lotsReducer';
import workOrdersReducer from './workOrdersReducer';
//import all reducers here

// debugger
const createRootReducer = (history) => combineReducers({
    user: userReducer,
    sections: sectionsReducer,
    tanks: tanksReducer,
    lots: lotsReducer,
    workOrders: workOrdersReducer,
    router: connectRouter(history)

})
export default createRootReducer