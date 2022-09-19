import React from 'react'
import styles from './Button.module.css'

export  function Button({ children, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      className={
        theme == 'error'
          ? [styles.button, styles.error].join(' ')
          : theme == 'warning'
          ? [styles.button, styles.warning].join(' ')
          : [styles.button, styles.primary].join(' ')
      }
    >
      {children}
    </button>
  )
}
