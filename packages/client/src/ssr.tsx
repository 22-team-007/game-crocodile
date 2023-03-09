import React from 'react'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'

import { Index } from './router'

export function render() {
  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Index />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  )
}
