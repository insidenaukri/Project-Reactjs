import React, { useEffect, useState } from 'react'
import api from '../../api/index'
import { formatDate } from '../../helpers/date'
import { FilterOptions } from '../../components/filter-options/'
import { DataTable } from '../../components/data-table/'
import { Button } from '../../components/button/'
import { LoadingSpinner } from '../../components/loading/'
import styles from './TimeEntries.module.css'

export function TimeEntries() {
  const [timeEntries, setTimeEntries] = useState([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [organisationId, setOrganisationId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

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
      const { fromDate, maxDate } = formatDate(selectedYear, selectedMonth)
      const response = await api.get(
        `/time-entries/organisation/${organisationId}?&fromDate=${fromDate}&maxDate=${maxDate}`,
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
