import React from 'react'
import './Input.module.css'

export default function Input({ type = 'text', value, onChange, placeholder, label, name }) {
  return (
    <div>
      {label && <label htmlFor="input">{label}</label>}
      <input type={type} name={name} onChange={onChange} value={value} placeholder={placeholder} />
    </div>
  )
}
