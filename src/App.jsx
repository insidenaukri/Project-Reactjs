import './App.css'
import ApiHealthcheck from './components/utils/ApiHealthcheck'

function App() {
  return (
    <div className="App">
      <h1>Bonusportalen</h1>
      {
        // Todo: Below component is only used to healthcheck API.
      }
      <ApiHealthcheck />
    </div>
  )
}

export default App
