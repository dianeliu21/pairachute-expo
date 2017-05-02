import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import AppReducer from '../reducers'

export default function configureStore (initialState) {
  const logger = createLogger()
  const enhancer = compose(
    applyMiddleware(thunk, logger)
  )
  return createStore(AppReducer, initialState, enhancer)
}
