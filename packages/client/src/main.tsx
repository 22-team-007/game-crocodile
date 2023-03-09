import React from 'react'
import ReactDOM from 'react-dom/client'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'

import { Index } from './router'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

ReactDOM.createRoot(document.getElementById('root') as Element).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
