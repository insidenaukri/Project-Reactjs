import React, { useEffect, useState } from 'react'
import api from '../../api'
import styles from './BonusDeptSum.module.css'

export function BonusDeptSum({ organisationId, date }) {
  if (!organisationId) return <></>
  const [bonusDeptSum, setBonusDeptSum] = useState({})

  const getBonusDeptSum = async () => {
    try {
      const response = await api.get(`/bonuses/bonus-dept-sum/${organisationId}?&date=${date}`)
      setBonusDeptSum(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getBonusDeptSum()
  }, [organisationId, date])

  return (
    <ul className={styles.list}>
      <li>
        <strong>Bonus Depts:</strong> {bonusDeptSum.bonus_dept}
      </li>
      <li>
        <strong>Social Fees:</strong> {bonusDeptSum.social_fees}
      </li>
      <li>
        <strong>Total</strong> {bonusDeptSum.total}
      </li>
    </ul>
  )
}
