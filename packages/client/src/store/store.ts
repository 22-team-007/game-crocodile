import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducers'
import { IRootState } from './reducers'
import api from '../api'

let initialData: IRootState

initialData = {
  userData: { user: null },
  theme: { name: 'white-theme', defTheme: 'white-theme' }
}

if (typeof window?.__INITIAL_STATE__ !== 'undefined') {
  initialData = window.__INITIAL_STATE__ as any
  delete window.__INITIAL_STATE__
}

if (!('userData' in initialData) || initialData.userData.user === null) {
  try {
    const user = await api.auth.user()

    if ('id' in user) {
      initialData.userData.user = user
    }
  } catch {
    // ignore loaded data
  }
}

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData', 'theme'],
  stateReconciler(inboundState: any, originalState: any) {
    // Ignore state, only use preloadedState from window object
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
