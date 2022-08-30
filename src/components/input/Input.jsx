import React from 'react'
import './Input.module.css'

export default function Input({ type = 'text', value, onChange, placeholder }) {
  return <input type={type} onChange={onChange} value={value} placeholder={placeholder} />
}
