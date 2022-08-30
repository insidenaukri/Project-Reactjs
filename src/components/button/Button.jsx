import React from 'react'
import styles from './Button.module.css'

export default function Button({ children, onClick }) {
  return (
    <div>
      <button onClick={onClick} className={styles.button}>
        {children}
      </button>
    </div>
  )
}
