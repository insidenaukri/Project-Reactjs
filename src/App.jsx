import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar'
import 'material-icons'
import { Snackbar } from './components/snackbar/Snackbar'

export default function App() {
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
