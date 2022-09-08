import React from 'react'
import styles from './Input.module.css'

export default function Input({ type, value, onChange, placeholder, name }) {
  return (
    <div className={styles.container}>
      <input className={styles.input} type={type} name={name} onChange={onChange} value={value} />
      <label className={value && styles.filled}>{placeholder}</label>
    </div>
  )
}
