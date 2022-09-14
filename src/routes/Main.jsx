import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'

import api from '../api'
import Login from './login/Login'
import Header from '../components/header/Header'
import { Snackbar } from '../components/snackbar/Snackbar'
import Sidebar from '../components/sidebar/Sidebar'
import Footer from '../components/footer/Footer'
import 'material-icons'

const Main = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    api.get('employees/me').then(() => {
      // set the context here.
      setIsAuthenticated(true)
    })
  }, [])

  if (!isAuthenticated) {
    return <Login />
  }

  return (
    <>
      <Header />
      <Snackbar />
      <div className="page-wrapper">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default Main
