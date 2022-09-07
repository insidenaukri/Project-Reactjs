import { useEffect, useState } from 'react'
import styles from './Snackbar.module.css'

const SNACKBAR_TIMEOUT = 1500
const SNACKBAR_EVENT_NAME = 'SNACKBAR_EVENT'

function SnackbarItem({ message, timeout }) {
  const [isShow, setIsShow] = useState(true)
  let TIMER
  function handleTimeout() {
    TIMER = setTimeout(() => {
      setIsShow(false)
    }, timeout)
  }

  useEffect(() => {
    handleTimeout()
  }, [])

  function handleClose() {
    setIsShow(false)
  }

  return (
    isShow && (
      <div className={styles.item}>
        <p>{message}</p>
        <button className={`material-icons-outlined ${styles.closeButton}`} onClick={handleClose}>
          close
        </button>
      </div>
    )
  )
}

function Snackbar() {
  const [messages, setMessages] = useState([])
  window.addEventListener(SNACKBAR_EVENT_NAME, (event) => {
    setMessages([...messages, event.detail])
  })
  return (
    <div className={styles.snackbar_container}>
      {messages.map((messageItem) => (
        <SnackbarItem key={messageItem.uniqueID} message={messageItem.message} timeout={messageItem.timeout} />
      ))}
    </div>
  )
}

function launchSnackbar(message, timeout = SNACKBAR_TIMEOUT) {
  const event = new CustomEvent(SNACKBAR_EVENT_NAME, { detail: { message, timeout, uniqueID: Date.now() } })
  window.dispatchEvent(event)
}

export { launchSnackbar, Snackbar }
