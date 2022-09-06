import 'material-icons'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dummy from './routes/Dummy'
import Healthcheck from './routes/Healthcheck'
import HttpError from './routes/HttpError'
import TimeEntries from './routes/time-entries/TimeEntries'
import NotFound from './routes/NotFound'
import Bonuses from './routes/bonuses/Bonuses'
import BonusDetails from './routes/bonus-details/BonusDetails'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Sidebar from './components/sidebar/Sidebar'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="page-wrapper">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Bonuses />} />
          <Route path="/bonus-details/:id" element={<BonusDetails />} />
          <Route path="/time-entries" element={<TimeEntries />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/healthcheck" element={<Healthcheck />} />
          <Route path="/error" element={<HttpError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}
