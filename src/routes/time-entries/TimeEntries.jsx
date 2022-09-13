import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api/index'
import FilterOptions from '../../components/filter-options/FilterOptions'
import DataTable from '../../components/data-table/DataTable'
import styles from './TimeEntries.module.css'
import Button from '../../components/button/Button'
import LoadingSpinner from '../../components/loading/LoadingSpinner'

export default function TimeEntries() {
  const [timeEntries, setTimeEntries] = useState([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [organisationId, setOrganisationId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  useEffect(() => {
    // Should have organisationId from the logged in user
    // and pass it to instantly load correct entries
    getTimeEntries()
  }, [])

  useEffect(() => {
    if (organisationId && selectedYear && selectedMonth) getTimeEntries()
  }, [organisationId, selectedYear, selectedMonth])
  const columns = [
    {
      Header: 'Time Entries',
      columns: [
        {
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: 'Project',
          accessor: 'project',
        },
        {
          Header: 'Date',
          accessor: 'date',
        },
        {
          Header: 'Duration',
          accessor: 'duration',
        },
      ],
    },
  ]

  const getTimeEntries = async () => {
    try {
      const response = await api.get(
        `/time-entries/organisation/${organisationId}?&year=${selectedYear}?&month=${selectedMonth}`,
      )
      setTimeEntries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const importTimeEntries = async () => {
    setIsLoading(true)

    try {
      const response = await api.get('/time-entries/import')

      if (response.data) {
        setMessage('Successfully imported all time entries!')
        setIsLoading(false)
      }
    } catch (error) {
      setMessage('Something went wrong when importing time entries, try again or contact support.')
      setIsLoading(false)
      console.error(error)
    }
  }

  return (
    <main>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.header}>
        {selectedMonth}
        {selectedYear}
        {organisationId}
        <FilterOptions
          selectedOrganisation={(organisation) => setOrganisationId(organisation.id)}
          selectedMonth={(month) => setSelectedMonth(month)}
          selectedYear={(year) => setSelectedYear(year)}
        />
        <Button onClick={() => importTimeEntries()} disabled={isLoading}>
          Import entries
        </Button>
      </div>
      {isLoading ? <LoadingSpinner /> : timeEntries.length ? <DataTable columns={columns} data={timeEntries} /> : ''}
    </main>
  )
}
