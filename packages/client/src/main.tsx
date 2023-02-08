import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import api from './api';

api.auth.signIn({
  login:"ZinovNA",
  password:"123qwertY@"
}).then(v=>{
  console.log('vvv',v);
  api.auth.logOut()
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
