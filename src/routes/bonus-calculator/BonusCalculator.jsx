import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api'
import FilterOptions from '../../components/filter-options/FilterOptions'
import DataTable from '../../components/data-table/DataTable'
import styles from './BonusCalculator.module.css'
import Select from '../../components/Select/Select'
import MonthlyBonusForm from './components/MonthlyBonusForm'
import Button from '../../components/button/Button'

export default function BonusCalculator() {
  const [timeEntries, setTimeEntries] = useState([])
  const [employees, setEmployees] = useState([])
  const [organisationId, setOrganisationId] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
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
    getEmployees()
  }, [organisationId])

  useEffect(() => {
    if (selectedEmployee) {
      calculateBonus()
      getTimeEntries()
    }
  }, [selectedEmployee])

  const getTimeEntries = async () => {
    try {
      const response = await api.get(`/time-entries/${selectedEmployee.id}`)
      setTimeEntries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const calculateBonus = async () => {
    try {
      const response = await api.post('/bonuses/calculate', { userId: selectedEmployee.id })
      setMonthlyBonus(response.data)
    } catch (error) {
      console.error()
    }
  }

  const getEmployees = async () => {
    try {
      if (!organisationId) return
      const response = await api.get(`/employees/organisation/${organisationId}`)
      setEmployees(response.data)
      setSelectedEmployee(response.data[0])
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions selectedOrganisation={(organisation) => setOrganisationId(organisation.id)} />
        <Select
          name="email"
          placeholder="Employee"
          options={employees}
          handleChange={(employee) => setSelectedEmployee(employee)}
        />
      </div>
      <div className={styles.buttons}>
        <Button>Create bonus</Button>
        <Button>Recalculate</Button>
      </div>
      <MonthlyBonusForm employee={selectedEmployee} monthlyBonus={monthlyBonus} />
      <DataTable columns={columns} data={timeEntries} />
    </main>
  )
}
