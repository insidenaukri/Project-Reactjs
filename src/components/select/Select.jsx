import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import styles from './Select.module.css'

export default function Select({ name, options, placeholder, handleChange, selected }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState()
  const [filteredArray, setFilteredArray] = useState([])
  const ref = useRef(null)

  useEffect(() => {
    filteredOptions()
    if (selected && options.length) setSelectedOption(options[0].name)
  }, [])

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

  const filteredOptions = () => {
    let filteredArray
    if (name) {
      let tempObject = {}
      filteredArray = options.map((option) => {
        const key = name || ''
        tempObject = { name: option[key], ...option }
        return tempObject
      })
    } else {
      filteredArray = options
    }
    setFilteredArray(filteredArray)
  }

  return (
    <div ref={ref} onClick={() => setIsOpen(!isOpen)} className={styles.select}>
      <span className={styles.text}>{selectedOption ? selectedOption : placeholder}</span>
      <span className="material-icons"> {isOpen ? 'arrow_drop_up' : 'arrow_drop_down'}</span>
      {isOpen && (
        <ul className={styles.options}>
          {filteredArray.map((option, index) => {
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
