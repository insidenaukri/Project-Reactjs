import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../../api'
import { DataTable } from '../../components/data-table/'
import { MonthlyBonusForm } from './MonthlyBonusForm'
import styles from './BonusDetails.module.css'

export function BonusDetails() {
  const { bonusId } = useParams()
  const [timeEntries, setTimeEntries] = useState([])
  const [monthlyBonus, setMonthlyBonus] = useState(null)

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

  useEffect(() => {
    if (bonusId) getBonus()
  }, [])

  const getBonus = async () => {
    try {
      const response = await api.get(`/bonuses/bonus/${bonusId}`)
      setMonthlyBonus(response.data)
      getTimeEntries(response.data.employee_id)
    } catch (error) {
      console.error()
    }
  }

  const getTimeEntries = async (employeeId) => {
    try {
      const response = await api.get(`/time-entries/${employeeId}`)
      setTimeEntries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <MonthlyBonusForm employee={timeEntries[0]?.email} monthlyBonus={monthlyBonus} />
      <DataTable columns={columns} data={timeEntries} />
    </main>
  )
}
