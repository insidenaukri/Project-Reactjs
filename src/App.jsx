import { Outlet } from 'react-router-dom'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar'
import 'material-icons'

export default function App() {
  return (
    <>
      <Header />
      <div className="page-wrapper">
        <Sidebar />
        <Outlet />
      </div>
      <Footer />
    </>
  )
}
