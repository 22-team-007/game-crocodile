import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
// import storage from 'redux-persist/lib/storage'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
   return {
      getItem(_key: any) {
         return Promise.resolve(null);
      },
      setItem(_key: any, value: any) {
         return Promise.resolve(value);
      },
      removeItem(_key: any) {
         return Promise.resolve();
      },
   };
};

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userData', 'theme'],
}

let initialData 

if (typeof window !== 'undefined') {
  initialData = window.__INITIAL_STATE__
  delete  window.__INITIAL_STATE__
} else {
  initialData = {}
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(persistedReducer, initialData, applyMiddleware(thunk))

export const persistor = persistStore(store)

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
