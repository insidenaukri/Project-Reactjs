import React from 'react'
import styles from './Button.module.css'

export default function Button({ children, onClick, theme }) {
 
  return (
    <button onClick={onClick} className={styles.button}>
      {children}
    </button>
  )
}
