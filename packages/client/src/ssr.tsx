import React from 'react'

import { renderToString } from 'react-dom/server'
import { legacy_createStore as createStore } from 'redux'
import { persistReducer } from 'redux-persist'
import { Provider } from 'react-redux'

import { matchRoutes } from 'react-router-dom'

import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import rootReducer from './store/reducers'
import { routerConf } from './router-ssr'

export async function render(
  path: string,
  fetchRequest: globalThis.Request,
  { persistConfig, preloadedState }: any
): Promise<string> {
  const SSRReducer = persistReducer(persistConfig, rootReducer)

  const reduxStore = createStore(SSRReducer, preloadedState)

  // convert Routes object To DataRoutes
  const { query, dataRoutes } = createStaticHandler(routerConf)

  // run actions / loaders, for requested path, and put returned data to context
  // now we haven't any
  const context = await query(fetchRequest)

  // loader return redirect?
  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)

  // if route not exist tell client app don't hydrate page
  const routExist = matchRoutes(dataRoutes, path)

  return renderToString(
    <React.StrictMode>
      <Provider store={reduxStore}>
        {routExist ? (
          <StaticRouterProvider router={router} context={context} />
        ) : (
          <></>
        )}
      </Provider>
    </React.StrictMode>
  )
}
