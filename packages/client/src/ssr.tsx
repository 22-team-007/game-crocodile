import React from 'react'
import { renderToString } from 'react-dom/server'
import { legacy_createStore as createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import { SSRProvider } from 'react-bootstrap'
import { Provider } from 'react-redux'

import rootReducer from './store/reducers'
import { IndexSSR } from './router'

export function render(
  url: string,
  { persistConfig, preloadedState }: any
): string {
  const SSRReducer = persistReducer(persistConfig, rootReducer)

  const reduxStore = createStore(SSRReducer, preloadedState)

  return renderToString(
    <React.StrictMode>
      <SSRProvider>
        <Provider store={reduxStore}>
          <IndexSSR url={url} />
        </Provider>
      </SSRProvider>
    </React.StrictMode>
  )
}
