import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/global.scss'
import { Router } from './routing/router.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
)
