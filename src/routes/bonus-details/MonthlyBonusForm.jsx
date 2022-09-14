import React, { useEffect, useState } from 'react'
import Input from '../../components/input/Input'
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

  return (
    monthlyBonus && (
      <section>
        <div className={styles.summary}>
          <h2>{employee}</h2>
          <p>
            Bonus qualifyingfee: <strong>{monthlyBonus.bonus_qualifying_fee}</strong>
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
            <Input
              type="number"
              placeholder="Total time"
              value={bonusData.reported_time}
              name="reported_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Travel time"
              value={bonusData.travel_time}
              name="travel_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Unassigned time"
              value={bonusData.unassigned_time}
              label="Unassigned time"
              name="unassigned_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Vacation time"
              value={bonusData.vacation_time}
              name="vacation_time"
              onChange={handleChange}
              disabled
            />
          </div>
          <div className={styles.form}>
            <Input
              type="number"
              placeholder="Sick time"
              value={bonusData.sick_time}
              name="sick_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Offduty time"
              value={bonusData.offduty_time}
              name="offduty_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Comp time"
              value={bonusData.comp_time}
              name="comp_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Vacation value"
              value={bonusData.value_of_vacation}
              name="value_of_vacation"
              onChange={handleChange}
              disabled
            />
          </div>

          <div className={styles.form}>
            <Input
              type="number"
              placeholder="Net deduction"
              value={bonusData.net_deduction}
              name="net_deduction"
              onChange={handleChange}
            />
            <Input
              type="number"
              placeholder="Gross deduction"
              value={bonusData.gross_deduction}
              name="gross_deduction"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Extra bonus"
              value={bonusData.extra_bonus}
              name="extra_bonus"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Bonus overtime"
              value={bonusData.bonus_qualifying_overtime}
              label="Bonusqualifying over time"
              name="bonus_qualifying_overtime"
              onChange={handleChange}
              disabled
            />
          </div>

          <div className={styles.form}>
            <Input
              type="number"
              placeholder="Bonus amount"
              value={bonusData.bonus_qualifying_amount}
              name="bonus_qualifying_amount"
              onChange={handleChange}
              disabled
            />
            <Input
              placeholder="Basis salary"
              value={bonusData.calculation_basis_salary}
              name="calculation_basis_salary"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Bonus time"
              value={bonusData.bonus_qualifying_time}
              name="bonus_qualifying_time"
              onChange={handleChange}
              disabled
            />
            <Input
              type="number"
              placeholder="Bonus time (not comp)"
              value={bonusData.bonus_qualifying_time_not_comp}
              name="bonus_qualifying_time_not_comp"
              onChange={handleChange}
              disabled
            />
          </div>
        </div>
      </section>
    )
  )
}
