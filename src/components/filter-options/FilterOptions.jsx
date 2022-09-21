import React, { useEffect, useState } from 'react'
import api from '../../api'
import { Select } from '../select/'
import styles from './FilterOptions.module.css'
import { MONTHS, YEARS } from '../../helpers/constants'

export function FilterOptions({ selectedOrganisation, selectedMonth, selectedYear }) {
  const [organisations, setOrganisations] = useState(null)
  const currentMonth = MONTHS[new Date().getMonth()]
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    selectedOrganisation && getOrganisations()
    selectedMonth && selectedMonth(currentMonth)
    selectedYear && selectedYear(currentYear)
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
      {selectedYear && (
        <Select selected={YEARS[0]} placeholder="Year" options={YEARS} handleChange={(year) => selectedYear(year)} />
      )}
      {selectedMonth && (
        <Select
          selected={currentMonth}
          placeholder="Month"
          options={MONTHS}
          handleChange={(month) => selectedMonth(month)}
        />
      )}
      {selectedOrganisation && (
        <Select
          selected={organisations && organisations[0].name}
          placeholder="Organisation"
          options={organisations}
          handleChange={(organsiation) => selectedOrganisation(organsiation)}
        />
      )}
    </div>
  ) : null
}
