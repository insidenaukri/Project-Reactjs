import React from 'react'
import DataTable from '../../components/data-table/DataTable'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import api from '../../api'
import { useState } from 'react'
import { useEffect } from 'react'
import Modal from '../../components/modal/Modal'

export default function Organisations() {
  const [organisations, setOrganisations] = useState([])
  const [selectedOrganisation, setSelectedOrganisation] = useState(null)
  const [organisationName, setOrganisationName] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getOrganisations()
  }, [])

  useEffect(() => {
    if (selectedOrganisation) {
      setOrganisationName(selectedOrganisation.name)
    }
  }, [selectedOrganisation])

  const columns = [
    {
      Header: 'Organisations',
      columns: [
        {
          Header: 'Name',
          accessor: 'name',
        },
        {
          Header: 'Id',
          accessor: 'id',
        },
      ],
    },
  ]

  const getOrganisations = async () => {
    try {
      const response = await api.get('/organisations')
      setOrganisations(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const updateOrganisation = async () => {
    try {
      if (organisationName.trim().length < 1) return setError('Please provide a name')
      const organisation = { id: selectedOrganisation.id, name: organisationName }
      await api.put('/organisations', organisation)
      await getOrganisations()
      closeModal()
    } catch (error) {
      console.error()
    }
  }

  const createOrganisation = async () => {
    try {
      const organisation = { name: organisationName }
      await api.post('/organisations', organisation)
      getOrganisations()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const closeModal = () => {
    setSelectedOrganisation(null)
    setOpen(false)
    setError('')
    setOrganisationName('')
  }

  return (
    <main>
      <Button onClick={() => setOpen(true)}>Create organisation</Button>
      <DataTable columns={columns} data={organisations} selectRow={(row) => setSelectedOrganisation(row)} />
      <Modal setIsOpen={closeModal} isOpen={selectedOrganisation ? true : false}>
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={organisationName}
            onChange={(e) => setOrganisationName(e.target.value)}
            error={error}
            label="Name"
          />
          {}
          <div>
            <Button onClick={updateOrganisation}>Save</Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={open}>
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={organisationName}
            onChange={(e) => setOrganisationName(e.target.value)}
            error={error}
            label="Name"
          />
          {}
          <div>
            <Button onClick={createOrganisation}>Create</Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
