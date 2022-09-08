import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Input from '../../../components/input/Input'
import styles from './MonthlyBonusForm.module.css'

export default function MonthlyBonusForm({ monthlyBonus, employee }) {
  const [bonusData, setBonusData] = useState({
    totalReportedTime: 0,
    travelTime: 0,
    unassignedTime: 0,
    vacationTime: 0,
    sickTime: 0,
    offDutyTime: 0,
    compTime: 0,
    valueOfVacation: 0,
    netDeduction: 0,
    grossDeduction: 0,
    extraBonus: 0,
    bonusQualifyingOverTime: 0,
    bonusQualifyingAmount: 0,
    calculationBasisSalary: 0,
    bonusQualifyingTime: 0,
    bonusQualifyingTimeNotComp: 0,
  })

  useEffect(() => {
    if (monthlyBonus) {
      setBonusData({ ...monthlyBonus })
    }
  }, [monthlyBonus])

  const handleChange = (event) => {
    setBonusData({ ...bonusData, [event.target.name]: event.target.value })
  }

  return (
    monthlyBonus &&
    employee && (
      <section>
        <h2>{employee.name}</h2>
        <div className={styles.balance}>
          <p>
            Bonus qualifyingfee: <strong>{monthlyBonus.bonusQualifyingFee}</strong>
          </p>
          <p>
            Bonus outcome: <strong>{monthlyBonus.bonusOutcome}</strong>
          </p>
          <p>
            Total balance: <strong>{monthlyBonus.bonusBalance}</strong>
          </p>
        </div>
        <div className={styles.container}>
          <div className={styles.form}>
            <Input
              value={bonusData.totalReportedTime}
              label="Total time"
              name="totalReportedTime"
              onChange={handleChange}
            />
            <Input value={bonusData.travelTime} label="Travel time" name="travelTime" onChange={handleChange} />
            <Input
              value={bonusData.unassignedTime}
              label="Unassigned time"
              name="unassignedTime"
              onChange={handleChange}
            />
            <Input value={bonusData.vacationTime} label="Vacation time" name="vacationTime" onChange={handleChange} />
          </div>
          <div className={styles.form}>
            <Input value={bonusData.sickTime} label="Sick time" name="sickTime" onChange={handleChange} />
            <Input value={bonusData.offDutyTime} label="Off duty time" name="offDutyTime" onChange={handleChange} />
            <Input value={bonusData.compTime} label="Comp time" name="compTime" onChange={handleChange} />
            <Input
              value={bonusData.valueOfVacation}
              label="Value of vacation"
              name="valueOfVacation"
              onChange={handleChange}
            />
          </div>

          <div className={styles.form}>
            <Input value={bonusData.netDeduction} label="Net deduction" name="netDeduction" onChange={handleChange} />
            <Input
              value={bonusData.grossDeduction}
              label="Gross deduction"
              name="grossDeduction"
              onChange={handleChange}
            />
            <Input value={bonusData.extraBonus} label="Extra bonuses" name="extraBonus" onChange={handleChange} />
            <Input
              value={bonusData.bonusQualifyingOverTime}
              label="Bonusqualifying over time"
              name="bonusQualifyingOverTime"
              onChange={handleChange}
            />
          </div>

          <div className={styles.form}>
            <Input
              value={bonusData.bonusQualifyingAmount}
              label="Bonusqualifying amount"
              name="bonusQualifyingAmount"
              onChange={handleChange}
            />
            <Input
              value={bonusData.calculationBasisSalary}
              label="Basis salary"
              name="calculationBasisSalary"
              onChange={handleChange}
            />
            <Input
              value={bonusData.bonusQualifyingTime}
              label="Bonusqualifying time"
              name="bonusQualifyingTime"
              onChange={handleChange}
            />
            <Input
              value={bonusData.bonusQualifyingTimeNotComp}
              label="Bonusqualifying time (not comp)"
              name="bonusQualifyingTimeNotComp"
              onChange={handleChange}
            />
          </div>
        </div>
      </section>
    )
  )
}
