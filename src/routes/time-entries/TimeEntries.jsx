import React, { useEffect, useMemo } from 'react'
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Should have organisationId from the logged in user
    // and pass it to instantly load correct entries
     getTimeEntries()
     setTimeout(() => setIsLoading(false), 5000)
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
  
    setIsLoading(true); 
    try {
      const response = await api.get(`/time-entries/${organisationId}`)
      setTimeEntries(response.data)
      setIsLoading(false)
    } catch (error) {
      console.error(error)
    }
  }
console.log(timeEntries,"timeEntries")
  const importTimeEntries = async () => {
    setIsLoading(true);
    
    try {
      const response = await api.get('/time-entries/import');
       console.log(response);

      if (response.data) {
        setMessage('Successfully imported all time entries!')
        setIsLoading(false);
      }
    } catch (error) {
      setMessage('Something went wrong when importing time entries, try again or contact support.')
      setIsLoading(false);
      console.error(error)
    }
  }

  return (
    <main>
   
      {message && <p className={styles.message}>{message}</p>}
      <div className={styles.header}>
        <FilterOptions selectedOrganisation={(organisation) => getTimeEntries(organisation.id)} />
        <Button onClick={() => importTimeEntries()} disabled={isLoading}>Import entries</Button>
      </div>
      {isLoading ? <LoadingSpinner /> : timeEntries.length ? <DataTable columns={columns} data={timeEntries} /> : ''}
      {/* {timeEntries.length ? <DataTable columns={columns} data={timeEntries} /> : ''} */}
    </main>
  )
}
