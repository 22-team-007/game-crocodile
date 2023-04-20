import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
// @ts-ignore (can't import types)
import { CookieStorage } from 'redux-persist-cookie-storage'
import Cookies from 'cookies-js'
import rootReducer from './reducers'
import { IRootState } from './reducers'
import api from '../api'

let initialData: IRootState

if (typeof window?.__INITIAL_STATE__ !== 'undefined') {
  initialData = window.__INITIAL_STATE__ as any
  delete window.__INITIAL_STATE__
} else {
  initialData = {
    userData: { user: null },
    theme: { name: 'white-theme' },
  }
}

if (initialData.userData.user === null) {
  const user = await api.auth.user()

  if (user.reason !== 'Cookie is not valid') {
    initialData.userData.user = user
  }
}

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies),
  whitelist: ['theme'],
  stateReconciler(inboundState: any, originalState: any) {
    // Ignore state from cookies, only use preloadedState from window object
    return originalState
  },
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const enhancer = composeEnhancers(applyMiddleware(thunk))

const store = createStore(persistedReducer, initialData, enhancer)

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
