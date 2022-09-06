import React, { useEffect, useMemo } from 'react'
import { useState } from 'react'
import api from '../../api'
import FilterOptions from '../../components/filter-options/FilterOptions'
import DataTable from '../../components/data-table/DataTable'
import styles from './BonusDetails.module.css'
import Button from '../../components/button/Button'

export default function BonusDetails() {
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

  return (
    <main>
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.header}>
        <FilterOptions selectedOrganisation={(organisation) => getTimeEntries(organisation.id)} />
      </div>
      <DataTable columns={columns} data={timeEntries} />
    </main>
  )
}
