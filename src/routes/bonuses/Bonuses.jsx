import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from '../../api'
import DataTable from '../../components/data-table/DataTable'
import FilterOptions from '../../components/filter-options/FilterOptions'
import Button from '../../components/button/Button'
import styles from './Bonuses.module.css'

export default function Bonuses() {
  const navigateTo = useNavigate()
  const [bonuses, setBonuses] = useState([])
  const [organisationId, setOrganisationId] = useState('')

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

  const getBonuses = async (organisationId) => {
    try {
      const response = await api.get(`/bonuses/${organisationId}`)
      setOrganisationId(organisationId)
      setBonuses(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const calculateAll = async () => {
    try {
      // Todo: this should come from filter options!
      const date = new Date()
      const response = await api.post('/bonuses/calculate', { organisationId, date })
      if (response.data.length) getBonuses(organisationId)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <FilterOptions selectedOrganisation={(organisation) => getBonuses(organisation.id)} />
      <div className={styles.buttons}>
        <Button onClick={calculateAll}>Calculate all</Button>
      </div>
      <DataTable columns={columns} data={bonuses} selectRow={(data) => navigateTo(`/bonuses/${data.id}`)} />
    </main>
  )
}
