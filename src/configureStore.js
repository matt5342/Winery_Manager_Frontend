import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from './reducers/root'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
//https://github.com/supasate/connected-react-router
export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), //root reducer w/ router state
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), //for dispatching history actions
        thunk
        // , other middleware
      )
    )
  )
  return store
}