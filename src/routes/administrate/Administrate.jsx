import React, { useEffect, useState } from 'react'
import api from '../../api'
import { DataTable } from '../../components/data-table'
import { Button } from '../../components/button'
import { Modal } from '../../components/modal'
import { FilterOptions } from '../../components/filter-options'
import { Select } from '../../components/select'
import styles from './Administrate.module.css'

export function Administrate() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [organisationId, setOrganisationId] = useState('')
  const [open, setOpen] = useState(false)
  const [makeUser, setmakeUser] = useState(false)
  const [employee, setEmployee] = useState({ name: '', email: '' })
  const [role, setRole] = useState('')
  const [options, setOptions] = useState('')
 
  useEffect(() => {
    if (organisationId) getEmployees()
  }, [organisationId])

  useEffect(() => {
    if (selectedEmployee) {
      setEmployee(selectedEmployee)
    }
    
  }, [selectedEmployee])

  const getEmployees = async () => {
    try {
      const response = await api.get(`/employees/organisation/${organisationId}`)
      setEmployees(response.data)
      const filteredIte = response.data.filter(item => item.role === "user")
      setOptions(filteredIte)
    } catch (error) {
      console.error(error)
    }
  }

 
  const columns = [
    {
      Header: 'Administrations',
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
          Header: 'Email',
          accessor: 'email',
        },
        {
          Header: '',
          accessor: 'delete',
          Cell: () => {
            return (
              <>
                <Button
                  children="Make User"
                  onClick={() => {
                    setmakeUser(true)
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

  const createAdministration = async () => {
    try {
        const objEmployee = {
          id:role.id,
          name: role.name,
          email: role.email,
          active: true,
          organisation_id: organisationId,
          role:'admin',
        }
       await api.put('/employees', objEmployee)
        await getEmployees()
        closeModal()
    } catch (error) {
      console.error(error)
    }
  }
  
  const updateAdministration = async () => {
    try {
        const objEmployee = {
          id: employee.id,
          name: employee.name,
          email: employee.email,
          active: true,
          organisation_id: organisationId,
          role:'user',
        }
         const res = await api.put('/employees', objEmployee)
        console.log(res, 'res')
        getEmployees()
        closeModal()
    } catch (error) {
      console.error()
    }
  }

  const closeModal = () => {
    setEmployee({ name: '', email: '' })
    setSelectedEmployee(null)
    setOpen(false)
    setmakeUser(false)
  }
  const filteredItems = employees.filter(item => item.role === "admin")

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions showDate={false} selectedOrganisation={(organisation) => setOrganisationId(organisation.id)} />
      </div>
      <Button onClick={() => setOpen(true)}>Create Administration</Button>
      <DataTable columns={columns} data={filteredItems} selectRow={(row) => setSelectedEmployee(row)} />
      <Modal setIsOpen={closeModal} isOpen={open}>
        <div>  
          <div className={styles.adduserText}>
            Add user as Admin
          </div>
            <Select
            options={options}
            handleChange ={(option)=>setRole(option)}
            selected={role.name}
            placeholder={role.name}
            />
          <div className={styles.btnTopmargin}>
            <Button onClick={createAdministration}>Make Admin</Button>
            <Button onClick={closeModal} theme="error">
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={makeUser}>
        <div>
          <div className={styles.deleteText}>
            Are you sure you want to change the role of <br />
            Employee: <b className={styles.textColor}>{employee.name}</b>
          </div>
          <div>
            <Button onClick={updateAdministration}>Yes</Button>
            <Button onClick={closeModal} theme="error">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
