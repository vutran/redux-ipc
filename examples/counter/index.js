import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
const reduxIpcMiddleware = require('redux-ipc');
import Counter from './components/Counter'
import counter from './reducers'

const store = createStore(counter, 0, applyMiddleware(reduxIpcMiddleware))
const rootEl = document.getElementById('root')

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => store.dispatch({ type: 'INCREMENT' })}
      onDecrement={() => store.dispatch({ type: 'DECREMENT' })}
    />,
    rootEl
  )
}

render()
store.subscribe(render)
