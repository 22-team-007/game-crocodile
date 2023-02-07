import React from 'react'
import ReactDOM from 'react-dom/client'

import { ProfilePage } from './pages'

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProfilePage />
  </React.StrictMode>
)
