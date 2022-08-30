import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import api from '../../api'
import Select from '../Select/Select'
import styles from './FilterOptions.module.css'

export default function FilterOptions({ selectedOrganisation }) {
  const [organisations, setOrganisations] = useState(null)

  useEffect(() => {
    getOrganisations()
  }, [])

  const getOrganisations = async () => {
    try {
      const response = await api.get('/organisations')
      setOrganisations(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  if (organisations) {
    return (
      <div className={styles.container}>
        <Select
          placeholder="Year"
          options={['Todo']}
          handleChange={(organsiation) => selectedOrganisation(organsiation)}
        />
        <Select
          placeholder="Month"
          options={['Todo']}
          handleChange={(organsiation) => selectedOrganisation(organsiation)}
        />
        <Select
          placeholder="Organisation"
          options={organisations}
          handleChange={(organsiation) => selectedOrganisation(organsiation)}
        />
      </div>
    )
  }
}
