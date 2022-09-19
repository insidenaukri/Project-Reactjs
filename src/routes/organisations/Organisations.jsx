import React, { useEffect, useState } from 'react'
import api from '../../api'
import { DataTable } from '../../components/data-table/'
import { Input } from '../../components/input/'
import { Button } from '../../components/button/'
import { Modal } from '../../components/modal/'
import styles from './organisations.module.css'

export function Organisations() {
  const [organisations, setOrganisations] = useState([])
  const [selectedOrganisation, setSelectedOrganisation] = useState(null)
  const [organisationName, setOrganisationName] = useState('')
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)
  const [deleteOrganisation, setDeleteOrganisation] = useState(false)

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
        {
          Header: '',
          accessor: 'delete',
          Cell: () => {
            return (
              <>
                <Button
                  children="Delete"
                  onClick={() => {
                    setDeleteOrganisation(true)
                  }}
                  theme="error"
                />
              </>
            )
          },
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
      if (organisationName.trim().length < 1) return setError('Please provide a name')
      const organisation = { name: organisationName }
      await api.post('/organisations', organisation)
      getOrganisations()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const removeOrganisation = async () => {
    try {
      const orgId = selectedOrganisation.id
      await api.delete(`/organisations/${orgId}`)
      getOrganisations()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const closeModal = () => {
    setSelectedOrganisation(null)
    setOpen(false)
    setDeleteOrganisation(false)
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
            <Button onClick={closeModal} theme="error">Close</Button>
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
            <Button onClick={closeModal} theme="error">Close</Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={deleteOrganisation}>
        <div>
          <div className={styles.deleteText}>
            Are you sure you want to delete? <br />
            Organisation: <b className={styles.textColor}>{organisationName}</b>
          </div>
          <div>
            <Button onClick={removeOrganisation}>Yes</Button>
            <Button onClick={closeModal} theme="error">Cancel</Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
