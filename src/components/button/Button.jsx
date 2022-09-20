import React from 'react'
import styles from './Button.module.css'

export function Button({ children, onClick, theme }) {
  return (
    <button
      onClick={onClick}
      className={
        theme == 'danger'
          ? [styles.button, styles.danger].join(' ')
          : theme == 'warning'
          ? [styles.button, styles.warning].join(' ')
          : [styles.button, styles.primary].join(' ')
      }
    >
      {children}
    </button>
  )
}
