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
import { routerConf } from './router-ssr'
import { IRootState } from './store/reducers'
import { userTypes } from './store/actions/user'

export async function render(
  fetchRequest: globalThis.Request,
  preloadedState: IRootState
): Promise<string> {
  const store = createStore(rootReducer, preloadedState)

  // convert Routes object To DataRoutes
  const { query, dataRoutes } = createStaticHandler(routerConf)

  // run actions / loaders, for requested path, and put returned data to context
  const context = await query(fetchRequest)

  // loader return redirect?
  if (context instanceof Response) {
    throw context
  }

  if (context.loaderData && '0' in context.loaderData) {
    const userData: UserType = context.loaderData[0]

    store.dispatch({ type: userTypes.SET_USER_DATA, payload: userData })

    preloadedState.userData.user = userData
  }

  const router = createStaticRouter(dataRoutes, context)

  const appHTML = renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>
    </React.StrictMode>
  )

  return appHTML
}

// if route not exist tell client app don't hydrate page
export function checkSSRRoute(path: string): boolean {
  return matchRoutes(routerConf, path) !== null ? true : false
}
