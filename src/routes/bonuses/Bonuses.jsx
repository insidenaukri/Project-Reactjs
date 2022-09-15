import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { DataTable } from '../../components/data-table/'
import { FilterOptions } from '../../components/filter-options/'
import { Button } from '../../components/button/'
import styles from './Bonuses.module.css'
import { formatDate } from '../../helpers/date'

export function Bonuses() {
  const navigateTo = useNavigate()
  const [bonuses, setBonuses] = useState([])
  const [organisationId, setOrganisationId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')

  const columns = [
    {
      Header: 'Bonus Calculations',
      columns: [
        {
          Header: 'Organisation',
          accessor: 'organisation_name',
        },
        {
          Header: 'Name',
          accessor: 'employee_name',
        },
        {
          Header: 'Reported time',
          accessor: 'reported_time',
        },
        {
          Header: 'Outcome',
          accessor: 'bonus_outcome',
        },
        {
          Header: 'Extra bonuses',
          accessor: 'extra_bonus',
        },
        {
          Header: 'Deductions',
          accessor: 'gross_deduction',
        },
        {
          Header: 'Total bonus',
          accessor: 'bonus_balance',
        },
        {
          Header: 'Approved',
          accessor: 'approved',
        },
      ],
    },
  ]

  useEffect(() => {
    if (organisationId && selectedYear && selectedMonth) getBonuses()
  }, [organisationId, selectedYear, selectedMonth])

  const getBonuses = async () => {
    try {
      const { fromDate } = formatDate(selectedYear, selectedMonth)
      const response = await api.get(`/bonuses/${organisationId}?&date=${fromDate}`)
      setOrganisationId(organisationId)
      setBonuses(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const calculateAll = async () => {
    try {
      const { fromDate } = formatDate(selectedYear, selectedMonth)
      const response = await api.post('/bonuses/calculate', {
        organisationId,
        date: fromDate,
      })
      if (response.data.length) getBonuses(organisationId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions
          selectedOrganisation={(organisation) => setOrganisationId(organisation.id)}
          selectedMonth={(month) => setSelectedMonth(month)}
          selectedYear={(year) => setSelectedYear(year)}
        />
        <Button onClick={calculateAll}>Calculate all</Button>
      </div>
      <DataTable columns={columns} data={bonuses} selectRow={(data) => navigateTo(`/bonuses/${data.id}`)} />
    </main>
  )
}
