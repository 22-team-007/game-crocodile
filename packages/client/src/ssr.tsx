import React from 'react'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import { renderToString } from 'react-dom/server'

import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
import store, { persistor } from './store/store'

import { IndexSSR } from './router'


// class PersistGateServer extends React.Component {
//     render() {
//         return this.props.children
//     }
// }
export function render(url: string, ititStates: any) {
  const store = createStore(ititStates)

  return renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <div>
        {/* <PersistGate persistor={persistor}> */}
          <IndexSSR url={url} />
          </div>
        {/* </PersistGate> */}
      </Provider>
    </React.StrictMode>
  )
}
