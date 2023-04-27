import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store'
import { Index } from './router'

const root = document.getElementById('root') as HTMLElement
const hydrate = window.__staticRouterHydrationData

typeof hydrate !== 'undefined'
  ? ReactDOM.hydrateRoot(
      root,
      <Provider store={store}>
        <Index />
      </Provider>
    )
  : ReactDOM.createRoot(root).render(
      <Provider store={store}>
        <Index />
      </Provider>
    )
