import React from 'react'
import { Provider } from 'react-redux'
import * as reducers from 'reducers'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'

interface RootProps {
  children: React.ReactNode
  initialState?: any
}

export const Root = ({ children, initialState = {} }: RootProps) => {
  const store = createStore(
    combineReducers(reducers),
    initialState,
    applyMiddleware(thunk)
  )

  return <Provider store={store}>{children}</Provider>
}
