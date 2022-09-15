import React from 'react'
import styles from './Input.module.css'

export default function Input({ type, value, onChange, placeholder, name, disabled, error }) {
  return (
    <div>
      <div className={styles.container}>
        <input disabled={disabled} className={styles.input} type={type} name={name} onChange={onChange} value={value} />
        <label className={value && styles.filled}>{placeholder}</label>
      </div>
      {error ? <p className={styles.error}>{error}</p> : ''}
    </div>
  )
}
