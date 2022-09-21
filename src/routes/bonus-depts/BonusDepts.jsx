import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api'
import { DataTable } from '../../components/data-table/'
import { BonusDeptSum } from './BonusDeptSum'
import { formatDate } from '../../helpers/date'
import { FilterOptions } from '../../components/filter-options'
import { MONTHS } from '../../helpers/constants'

export function BonusDepts() {
  const navigateTo = useNavigate()
  const [bonuses, setBonuses] = useState([])
  const [organisationId, setOrganisationId] = useState('')
  const { fromDate } = formatDate(new Date().getFullYear(), MONTHS[new Date().getMonth()])
  const columns = [
    {
      Header: 'Sum of Bonus Depts',
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
          Header: 'Total bonus',
          accessor: 'bonus_balance',
        },
      ],
    },
  ]

  useEffect(() => {
    if (organisationId) getBonuses()
  }, [organisationId])

  const getBonuses = async () => {
    try {
      const response = await api.get(`/bonuses/${organisationId}?&date=${fromDate}`)
      setOrganisationId(organisationId)
      setBonuses(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <FilterOptions selectedOrganisation={(organisation) => setOrganisationId(organisation.id)} />
      <DataTable columns={columns} data={bonuses} selectRow={(data) => navigateTo(`/bonuses/${data.id}`)} />
      <BonusDeptSum organisationId={organisationId} date={fromDate} />
    </main>
  )
}
