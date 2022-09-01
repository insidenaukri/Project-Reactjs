import React, { useEffect, useState } from 'react'
import api from '../../api'
import DataTable from '../../components/data-table/DataTable'
import FilterOptions from '../../components/filter-options/FilterOptions'
import styles from './BonusCalculations.module.css'

export default function BonusCalculations() {
  const [bonuses, setBonuses] = useState([])
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
          accessor: 'extra_bonuses',
        },
        {
          Header: 'Deductions',
          accessor: 'gross_deduction',
        },
        {
          Header: 'Total bonus',
          accessor: 'bonus_total',
        },
        {
          Header: 'Approved',
          accessor: 'approved',
        },
      ],
    },
  ]
  useEffect(() => {
    // Should have organisationId from the logged in user
    // and pass it to instantly load correct bonuses
    // getBonuses(organisationId)
  }, [])

  const getBonuses = async (organisationId) => {
    try {
      const response = await api.get(`/bonuses/${organisationId}`)
      setBonuses(response.data)
    } catch (error) {
      console.error(error)
    }
  }
  return (
    <main>
      <FilterOptions selectedOrganisation={(organisation) => getBonuses(organisation.id)} />
      <DataTable columns={columns} data={bonuses} />
    </main>
  )
}
