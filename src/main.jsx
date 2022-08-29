import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import './index.css'
import Dummy from './routes/Dummy'
import Healthcheck from './routes/Healthcheck'
import HttpError from './routes/HttpError'
import TimeEntries from './routes/TimeEntries'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/healthcheck" element={<Healthcheck />} />
          <Route path="/error" element={<HttpError />} />
          <Route path="/time-entries" element={<TimeEntries />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
