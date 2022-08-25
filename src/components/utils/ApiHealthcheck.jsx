import { useEffect, useState } from 'react'

export default function ApiHealthcheck() {
  const [healthData, setHealthData] = useState('Loading...')

  useEffect(() => {
    fetch('/api/')
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw res.status
        }
      })
      .then((result) => {
        const jsonText = JSON.stringify(result, null, 2)
        setHealthData(jsonText)
      })
      .catch((error) => {
        console.error('Catching in promise chain:', error)
        setHealthData(error)
      })
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
