import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api'
import Select from '../Select/Select'
import styles from './FilterOptions.module.css'
import { MONTHS, YEARS } from '../../helpers/constants'

export default function FilterOptions({ selectedOrganisation, selectedMonth, selectedYear }) {
  const [organisations, setOrganisations] = useState(null)

  useEffect(() => {
    getOrganisations()
    selectedMonth(MONTHS[0])
    selectedYear(YEARS[0])
  }, [])

  const getOrganisations = async () => {
    try {
      const response = await api.get('/organisations')
      setOrganisations(response.data)
      selectedOrganisation(response.data[0])
    } catch (error) {
      console.error(error)
    }
  }

  return organisations ? (
    <div className={styles.container}>
      <Select placeholder="Year" options={YEARS} handleChange={(year) => selectedYear(year)} />
      <Select placeholder="Month" options={MONTHS} handleChange={(month) => selectedMonth(month)} />
      <Select
        placeholder="Organisation"
        options={organisations}
        handleChange={(organsiation) => selectedOrganisation(organsiation)}
      />
    </div>
  ) : null
}
