import { useEffect, useState } from 'react'
import api from '../../api'

export default function ApiHealthcheck() {
  const [healthData, setHealthData] = useState('Loading...')

  useEffect(() => {
    api.get('/')
      .then((result) => {
        console.log('result = ', result.data)
        const jsonText = JSON.stringify(result.data, null, 2)
        setHealthData(jsonText)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <div>
      <h1>API Healthcheck</h1>
      <div>
        <code>{healthData}</code>
      </div>
    </div>
  )
}
