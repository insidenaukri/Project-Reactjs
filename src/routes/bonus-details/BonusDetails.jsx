import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api'
import { MONTHS } from '../../helpers/constants'
import { formatDate } from '../../helpers/date'
import { DataTable } from '../../components/data-table/'
import { MonthlyBonusForm } from './MonthlyBonusForm'
import { Button } from '../../components/button'

export function BonusDetails() {
  const navigateTo = useNavigate()
  const { bonusId } = useParams()
  const [timeEntries, setTimeEntries] = useState([])
  const [monthlyBonus, setMonthlyBonus] = useState(null)
  const [updatedMonthlyBonus, setUpdatedMonthlyBonus] = useState(null)

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
      await getTimeEntries(response.data.employeeId, response.data.date)
    } catch (error) {
      console.error(error)
    }
  }

  const getTimeEntries = async (employeeId, createdDate) => {
    try {
      const date = new Date(createdDate)
      let month = date.getMonth()
      // Get the correct start month if selected is Jan
      month = month === 0 ? MONTHS[MONTHS.length - 1] : MONTHS[month - 1]
      const year = date.getFullYear()
      const { fromDate, maxDate } = formatDate(year, month)

      const response = await api.get(`/time-entries/${employeeId}?&fromDate=${fromDate}&maxDate=${maxDate}`)
      setTimeEntries(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const recalculate = async () => {
    try {
      if (!updatedMonthlyBonus) return
      const {
        reportedTime,
        vacationTime,
        sickTime,
        travelTime,
        offDutyTime,
        compTime,
        unassignedTime,
        bonusQualifyingOverTime,
        notBonusQualifyingTime,
        bonusQualifyingTime,
        calculationBasisSalary,
        bonusQualifyingFee,
        bonusQualifyingTimeNotComp,
      } = updatedMonthlyBonus

      const response = await api.post('/bonuses/recalculate', {
        reportedTime,
        vacationTime,
        sickTime,
        travelTime,
        offDutyTime,
        compTime,
        unassignedTime,
        bonusQualifyingOverTime,
        notBonusQualifyingTime,
        bonusQualifyingTime,
        calculationBasisSalary,
        bonusQualifyingFee,
        bonusQualifyingTimeNotComp,
      })
      setMonthlyBonus(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateBonusMonth = async () => {
    try {
      await api.put('/bonuses', { ...updatedMonthlyBonus, id: bonusId })
      await getBonus()
    } catch (error) {
      console.error(error)
    }
  }

  const deleteBonusMonth = async () => {
    try {
      await api.delete(`/bonuses/${bonusId}`)
      navigateTo('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main>
      <MonthlyBonusForm
        employee={timeEntries[0]?.email}
        monthlyBonus={monthlyBonus}
        updatedBonus={(updatedData) => setUpdatedMonthlyBonus(updatedData)}
      />
      <Button onClick={recalculate}>Recalculate</Button>
      <Button onClick={updateBonusMonth}>Save</Button>
      <Button onClick={deleteBonusMonth}>Delete</Button>
      <DataTable columns={columns} data={timeEntries} />
    </main>
  )
}
