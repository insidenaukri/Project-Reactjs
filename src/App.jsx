import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './routes/Main'
import Dummy from './routes/Dummy'
import Healthcheck from './routes/Healthcheck'
import HttpError from './routes/HttpError'
import TimeEntries from './routes/time-entries/TimeEntries'
import NotFound from './routes/NotFound'
import Bonuses from './routes/bonuses/Bonuses'
import BonusDetails from './routes/bonus-details/BonusDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Bonuses />} />
          <Route path="/bonuses/:bonusId" element={<BonusDetails />} />
          <Route path="/time-entries" element={<TimeEntries />} />
          <Route path="/dummy" element={<Dummy />} />
          <Route path="/healthcheck" element={<Healthcheck />} />
          <Route path="/error" element={<HttpError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
