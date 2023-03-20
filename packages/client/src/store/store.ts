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

let initialData

if (typeof window !== 'undefined') {
  initialData = window.__INITIAL_STATE__
  delete window.__INITIAL_STATE__
} else {
  initialData = {}
}

const persistConfig = {
  key: 'root',
  storage: new CookieStorage(Cookies, {}),
  whitelist: ['userData', 'theme'],
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
