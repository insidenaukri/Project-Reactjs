import React, { useEffect, useState } from 'react'
import { Input } from '../../components/input/'
import styles from './MonthlyBonusForm.module.css'

export function MonthlyBonusForm({ monthlyBonus, employee, updatedBonus }) {
  const [bonusData, setBonusData] = useState({
    reportedTime: 0,
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
    bonusQualifyingFee: 0,
    bonusQualifyingAmount: 0,
    calculationBasisSalary: 0,
    bonusQualifyingTime: 0,
    bonusQualifyingTimeNotComp: 0,
    bonusQualifyingOverTime: 0,
  })

  useEffect(() => {
    if (monthlyBonus) {
      setBonusData({ ...monthlyBonus })
    }
  }, [monthlyBonus])

  useEffect(() => {
    updatedBonus(bonusData)
  }, [bonusData])

  const handleChange = (event) => {
    setBonusData({ ...bonusData, [event.target.name]: event.target.value })
  }

  function inputFactory(values, index) {
    const [type, placeholder, value, name] = values
    return <Input onChange={handleChange} type={type} placeholder={placeholder} value={value} name={name} key={index} />
  }

  return (
    monthlyBonus && (
      <section>
        <div className={styles.summary}>
          <h2>{employee}</h2>
          <p>
            Bonus qualifying fee: <strong>{monthlyBonus.bonusQualifyingFee}</strong>
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
            {[
              ['number', 'Total time', bonusData.reportedTime, 'reportedTime', true],
              ['number', 'Travel time', bonusData.travelTime, 'travelTime', true],
              ['number', 'Unassigned time', bonusData.unassignedTime, 'unassignedTime', true],
              ['number', 'Vacation time', bonusData.vacationTime, 'vacationTime', true],
            ].map(inputFactory)}
          </div>

          <div className={styles.form}>
            {[
              ['number', 'Sick time', bonusData.sickTime, 'sickTime', true],
              ['number', 'Offduty time', bonusData.offDutyTime, 'offDutyTime', true],
              ['number', 'Comp time', bonusData.compTime, 'compTime', true],
              ['number', 'Vacation value', bonusData.valueOfVacation, 'valueOfVacation', true],
            ].map(inputFactory)}
          </div>

          <div className={styles.form}>
            {[
              ['number', 'Net deduction', bonusData.netDeduction, 'netDeduction', false],
              ['number', 'Gross deduction', bonusData.grossDeduction, 'grossDeduction', true],
              ['number', 'Extra bonus', bonusData.extraBonus, 'extraBonus', true],
              ['number', 'Bonus overtime', bonusData.bonusQualifyingOverTime, 'bonusQualifyingOverTime', true],
            ].map(inputFactory)}
          </div>

          <div className={styles.form}>
            {[
              ['number', 'Bonus amount', bonusData.bonusQualifyingAmount, 'bonusQualifyingAmount', true],
              ['number', 'Basis salary', bonusData.calculationBasisSalary, 'calculationBasisSalary', true],
              ['number', 'Bonus time', bonusData.bonusQualifyingTime, 'bonusQualifyingTime', true],
              [
                'number',
                'Bonus time (not comp)',
                bonusData.bonusQualifyingTimeNotComp,
                'bonusQualifyingTimeNotComp',
                true,
              ],
            ].map(inputFactory)}
          </div>
        </div>
      </section>
    )
  )
}
