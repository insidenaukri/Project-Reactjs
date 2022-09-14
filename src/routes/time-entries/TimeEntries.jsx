import React, { useEffect, useMemo, useState } from 'react'
import api from '../../api/index'
import { FilterOptions } from '../../components/filter-options/'
import { DataTable } from '../../components/data-table/'
import { Button } from '../../components/button/'
import { LoadingSpinner } from '../../components/loading/'
import styles from './TimeEntries.module.css'

export function TimeEntries() {
  const [timeEntries, setTimeEntries] = useState([])
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // TODO: Should have organisationId from the logged in user
    // and pass it to instantly load correct entries
    getTimeEntries()
  }, [])
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

  const getTimeEntries = async (organisationId) => {
    try {
      if (!organisationId) return
      const response = await api.get(`/time-entries/organisation/${organisationId}`)
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
        <FilterOptions selectedOrganisation={(organisation) => getTimeEntries(organisation.id)} />
        <Button onClick={() => importTimeEntries()} disabled={isLoading}>
          Import entries
        </Button>
      </div>
      {isLoading ? <LoadingSpinner /> : timeEntries.length ? <DataTable columns={columns} data={timeEntries} /> : ''}
    </main>
  )
}
