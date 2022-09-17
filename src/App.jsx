import 'material-icons'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dummy, Healthcheck, HttpError, NotFound } from './routes/'
import { TimeEntries } from './routes/time-entries/'
import { Bonuses } from './routes/bonuses/'
import { BonusDetails } from './routes/bonus-details/'
import { Header } from './components/header/'
import { Footer } from './components/footer/'
import { Sidebar } from './components/sidebar/'
import { Snackbar } from './components/snackbar/'
import { Organisations } from './routes/organisations/'
import Employees from './routes/employees/Employees'
import { UserProvider } from './contexts/user-context'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Snackbar />
      <div className="page-wrapper">
        <Sidebar />
        {/* <UserProvider> */}
        <Routes>
          <Route path="/" element={<Bonuses />} />
          <Route path="/bonuses/:bonusId" element={<BonusDetails />} />
          <Route path="/time-entries" element={<TimeEntries />} />
          <Route path="/organisations" element={<Organisations />} />
          <Route path="/employees" element={<Employees/>}/>
          <Route
            path="/dummy"
            element={
              <UserProvider>
                <Dummy />
              </UserProvider>
            }
          />
          <Route path="/healthcheck" element={<Healthcheck />} />
          <Route path="/error" element={<HttpError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* </UserProvider> */}
      </div>
      <Footer />
    </BrowserRouter>
  )
}
