import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import api from '../../api'
import Login from '../login/Login'
import { Header } from '../../components/header'
import { Snackbar } from '../../components/snackbar/Snackbar'
import { Sidebar } from '../../components/sidebar'
import { Footer } from '../../components/footer'
import { updateUser, useUser } from '../../contexts'
import 'material-icons'

export function Main() {
  const [state, dispatch] = useUser()

  useEffect(() => {
    api.get('employees/me').then((response) => {
      const user = response.data
      if (user) updateUser(dispatch, user.id, user.email, user.organisation_id)
    })
  }, [])

  if (!state.id) return <Login />

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
