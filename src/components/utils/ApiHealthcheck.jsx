import { useEffect, useState } from 'react'

export default function ApiHealthcheck() {
  const [healthData, setHealthData] = useState('Loading...')

  useEffect(() => {
    fetch('/api/')
      .then((res) => res.json())
      .then((result) => {
        console.log('result = ', result)
        const jsonText = JSON.stringify(result, null, 2)
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
