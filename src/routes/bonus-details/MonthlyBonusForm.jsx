import React, { useEffect, useState } from 'react'
import { Input } from '../../components/input/'
import styles from './MonthlyBonusForm.module.css'

export function MonthlyBonusForm({ monthlyBonus, employee }) {
  const [bonusData, setBonusData] = useState({
    reported_time: 0,
    travel_time: 0,
    unassigned_time: 0,
    vacation_time: 0,
    sick_time: 0,
    offduty_time: 0,
    comp_time: 0,
    value_of_vacation: 0,
    net_deduction: 0,
    gross_deduction: 0,
    extra_bonus: 0,
    bonus_qualifying_overtime: 0,
    bonus_qualifying_amount: 0,
    calculation_basis_salary: 0,
    bonus_qualifying_time: 0,
    bonus_qualifying_time_not_comp: 0,
  })

  useEffect(() => {
    if (monthlyBonus) {
      setBonusData({ ...monthlyBonus })
    }
  }, [monthlyBonus])

  const handleChange = (event) => {
    setBonusData({ ...bonusData, [event.target.name]: event.target.value })
  }

  function inputFactory(type, placeholder, value, name, disabled) {
    return (
      <Input
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        disabled={disabled}
      />
    )
  }

  return (
    monthlyBonus && (
      <section>
        <div className={styles.summary}>
          <h2>{employee}</h2>
          <p>
            Bonus qualifying fee: <strong>{monthlyBonus.bonus_qualifying_fee}</strong>
          </p>
          <p>
            Bonus outcome: <strong>{monthlyBonus.bonus_outcome}</strong>
          </p>
          <p>
            Total balance: <strong>{monthlyBonus.bonus_balance}</strong>
          </p>
        </div>
        <div className={styles.container}>
          <div className={styles.form}>
            {[
              ['number', 'Total time', bonusData.reported_time, 'reported_time', true],
              ['number', 'Travel time', bonusData.travel_time, 'travel_time', true],
              ['number', 'Unassigned time', bonusData.unassigned_time, 'unassigned_time', true],
              ['number', 'Vacation time', bonusData.vacation_time, 'vacation_time', true],
            ].map(inputFactory)}
          </div>
          <div className={styles.form}>
            {[
              ['number', 'Sick time', bonusData.reported_time, 'sick_time', true],
              ['number', 'Offduty time', bonusData.offduty_time, 'offduty_time', true],
              ['number', 'Comp time', bonusData.comp_time, 'comp_time', true],
              ['number', 'Vacation value', bonusData.value_of_vacation, 'vacation_time', true],
            ].map(inputFactory)}
          </div>

          <div className={styles.form}>
            {[
              ['number', 'Net deduction', bonusData.net_deduction, 'net_deduction', false],
              ['number', 'Gross deduction', bonusData.gross_deduction, 'gross_deduction', true],
              ['number', 'Extra bonus', bonusData.extra_bonus, 'extra_bonus', true],
              ['number', 'Bonus overtime', bonusData.bonus_qualifying_overtime, 'bonus_qualifying_overtime', true],
            ].map(inputFactory)}
          </div>

          <div className={styles.form}>
            {[
              ['number', 'Bonus amount', bonusData.bonus_qualifying_amount, 'bonus_qualifying_amount', true],
              ['number', 'Basis salary', bonusData.calculation_basis_salary, 'calculation_basis_salary', true],
              ['number', 'Bonus time', bonusData.bonus_qualifying_time, 'bonus_qualifying_time', true],
              [
                'number',
                'Bonus time (not comp)',
                bonusData.bonus_qualifying_time_not_comp,
                'bonus_qualifying_time_not_comp',
                true,
              ],
            ].map(inputFactory)}
          </div>
        </div>
      </section>
    )
  )
}
