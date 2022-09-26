import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dummy, Healthcheck, HttpError, NotFound } from './routes/'
import { TimeEntries } from './routes/time-entries/'
import { Bonuses } from './routes/bonuses/'
import { BonusDetails } from './routes/bonus-details/'
import { BonusDepts } from './routes/bonus-depts/'
import { Main } from './routes/main/Main'
import { Organisations } from './routes/organisations/'
import { Employees } from './routes/employees/'
import { Administrators } from './routes/administrators/'
import { UserProvider } from './contexts/user-context'

export function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route index element={<Bonuses />} />
            <Route path="/" element={<Bonuses />} />
            <Route path="/bonuses/:bonusId" element={<BonusDetails />} />
            <Route path="/bonus-depts" element={<BonusDepts />} />
            <Route path="/time-entries" element={<TimeEntries />} />
            <Route path="/organisations" element={<Organisations />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/administrators" element={<Administrators />} />
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
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}
