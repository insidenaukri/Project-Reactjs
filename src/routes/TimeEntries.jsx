import React from 'react'
import { useState } from 'react'
import FilterOptions from '../components/filter-options/FilterOptions'
import api from '../api'

export default function TimeEntries() {
  const [timeEntries, setTimeEntries] = useState([])

  const getTimeEntries = async (organisationId) => {
    try {
      const response = await api.get(`/time-entries/${organisationId}`)
      setTimeEntries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <FilterOptions selectedOrganisation={(organisation) => getTimeEntries(organisation.id)} />
      <div className="entries">Amount of entries: {timeEntries.length}</div>
    </main>
  )
}
