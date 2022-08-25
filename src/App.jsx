import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Sidebar from './components/Sidebar'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
