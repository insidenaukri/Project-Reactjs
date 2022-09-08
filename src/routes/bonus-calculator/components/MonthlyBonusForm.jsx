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
        <div className={styles.summary}>
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
              type="number"
              placeholder="Total time"
              value={bonusData.totalReportedTime}
              name="totalReportedTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Travel time"
              value={bonusData.travelTime}
              name="travelTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Unassigned time"
              value={bonusData.unassignedTime}
              label="Unassigned time"
              name="unassignedTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Vacation time"
              value={bonusData.vacationTime}
              name="vacationTime"
              onChange={handleChange}
            />
          </div>
          <div className={styles.form}>
            <Input
              type="number"
              placeholder="Sick time"
              value={bonusData.sickTime}
              name="sickTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Offduty time"
              value={bonusData.offDutyTime}
              name="offDutyTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Comp time"
              value={bonusData.compTime}
              name="compTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Vacation value"
              value={bonusData.valueOfVacation}
              name="valueOfVacation"
              onChange={handleChange}
            />
          </div>

          <div className={styles.form}>
            <Input
              type="number"
              placeholder="Net deduction"
              value={bonusData.netDeduction}
              name="netDeduction"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Gross deduction"
              value={bonusData.grossDeduction}
              name="grossDeduction"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Extra bonus"
              value={bonusData.extraBonus}
              name="extraBonus"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Bonus overtime"
              value={bonusData.bonusQualifyingOverTime}
              label="Bonusqualifying over time"
              name="bonusQualifyingOverTime"
              onChange={handleChange}
            />
          </div>

          <div className={styles.form}>
            <Input
              type="number"
              placeholder="Bonus amount"
              value={bonusData.bonusQualifyingAmount}
              name="bonusQualifyingAmount"
              onChange={handleChange}
            />
            <Input
              placeholder="Basis salary"
              value={bonusData.calculationBasisSalary}
              name="calculationBasisSalary"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Bonus time"
              value={bonusData.bonusQualifyingTime}
              name="bonusQualifyingTime"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Bonus time (not comp)"
              value={bonusData.bonusQualifyingTimeNotComp}
              name="bonusQualifyingTimeNotComp"
              onChange={handleChange}
            />
          </div>
        </div>
      </section>
    )
  )
}
