import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import api from '../../api'
import FilterOptions from '../../components/filter-options/FilterOptions'
import DataTable from '../../components/data-table/DataTable'
import styles from './TimeEntries.module.css'
import Button from '../../components/button/Button'

export default function TimeEntries() {
  const [timeEntries, setTimeEntries] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    // Should have organisationId from the logged in user
    // and pass it to instantly load correct entries
    // getTimeEntries(orgId)
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
      const response = await api.get(`/time-entries/${organisationId}`)
      setTimeEntries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const importTimeEntries = async () => {
    try {
      const response = await api.get('/time-entries/import')
      if (response.data) {
        setMessage('Successfully imported all time entries!')
      }
    } catch (error) {
      setMessage('Something went wrong when importing time entries, try again or contact support.')
      console.error(error)
    }
  }

  return (
    <main>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.header}>
        <FilterOptions selectedOrganisation={(organisation) => getTimeEntries(organisation.id)} />
        <Button onClick={() => importTimeEntries()}>Import entries</Button>
      </div>
      {timeEntries.length ? <DataTable columns={columns} data={timeEntries} /> : ''}
    </main>
  )
}
