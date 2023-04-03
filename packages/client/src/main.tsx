import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store, { persistor } from './store/store'
import { Index } from './router'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

const root = document.getElementById('root') as HTMLElement
const hydrate = window.__staticRouterHydrationData
delete window.__staticRouterHydrationData

typeof hydrate !== 'undefined'
  ? ReactDOM.hydrateRoot(
      root,
      <React.StrictMode>
        <Provider store={store}>
          <Index />
        </Provider>
      </React.StrictMode>
    )
  : ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <Provider store={store}>
          <Index />
        </Provider>
      </React.StrictMode>
    )
