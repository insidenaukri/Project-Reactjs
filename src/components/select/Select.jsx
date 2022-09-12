import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import styles from './Select.module.css'

export default function Select({ options, placeholder, handleChange, selected }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    if (selected && options.length) setSelectedOption(selected)
  }, [selected])

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const selectOption = (option) => {
    setSelectedOption(option.name ? option.name : option)
    handleChange(option)
    setIsOpen(false)
  }

  return (
    <div ref={ref} onClick={() => setIsOpen(!isOpen)} className={styles.select}>
      <span className={styles.text}>{selectedOption ? selectedOption : placeholder}</span>
      <span className="material-icons"> {isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
      {isOpen && (
        <ul className={styles.options}>
          {options.map((option, index) => {
            return (
              <li className={styles.option} onClick={() => selectOption(option)} key={index}>
                {option.name || option}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
