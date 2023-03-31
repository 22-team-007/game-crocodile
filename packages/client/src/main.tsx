import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store'
import { Index } from './router'

// hydrate page, only when persist store get initial data
persistor.subscribe(() => {
  const { bootstrapped } = persistor.getState()
  
  if (bootstrapped) {
    ReactDOM.hydrateRoot(
      document.getElementById('root') as HTMLElement,
      <React.StrictMode>
        <Provider store={store}>
          <Index />
        </Provider>
      </React.StrictMode>
    )
  }
})
