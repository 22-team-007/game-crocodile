import React from 'react'

import { renderToString } from 'react-dom/server'
import { legacy_createStore as createStore } from 'redux'
import { Provider } from 'react-redux'

import { matchRoutes } from 'react-router-dom'

import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import rootReducer from './store/reducers'
import { routerConf, OAUTH_LOADER_NUMBER } from './router-ssr'
import { IRootState } from './store/reducers'

export async function render(
  fetchRequest: globalThis.Request,
  preloadedState: IRootState
): Promise<string> {
  const store = createStore(rootReducer, preloadedState)

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

  const appHTML = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    </React.StrictMode>
  )

  // loader number 3 = OAuthLoader
  let cookie = undefined
  if (context.loaderData && OAUTH_LOADER_NUMBER in context.loaderData) {
    preloadedState.userData.user=context.loaderData[OAUTH_LOADER_NUMBER].user
    cookie = context.loaderData[OAUTH_LOADER_NUMBER].parsCookies
  }

  // @ts-ignore
  return [appHTML, cookie]
}

// if route not exist tell client app don't hydrate page
export function checkRoute(path: string): boolean {
  return matchRoutes(routerConf, path) !== null ? true : false
}
