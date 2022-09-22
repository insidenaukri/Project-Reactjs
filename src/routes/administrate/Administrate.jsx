import React, { useEffect, useState } from 'react'
import api from '../../api'
import { DataTable } from '../../components/data-table'
import { Input } from '../../components/input'
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
  const [deleteEmployee, setDeleteEmployee] = useState(false)
  const [employee, setEmployee] = useState({ name: '', email: '' })
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')
//
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
    console.log(organisationId,"eret")
    
    try {
      const response = await api.get(`/employees/organisation/${organisationId}`)
      setEmployees(response.data)
      const filteredIte = response.data.filter(item => item.role === "user")
      setOptions(filteredIte)
    } catch (error) {
      console.error(error)
    }
  }

 //const options=["user", "admin"]
  console.log(role,'veer')
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
                  children="Delete"
                  onClick={() => {
                    setDeleteEmployee(true)
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

  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  const validateUserInput = () => {
    let errorCount = 0

    if (employee.name.trim().length < 1) {
      setErrorName('Please provide a name')
      errorCount += 1
    } else setErrorName('')

    if (employee.email.trim().length < 1) {
      setErrorEmail('Please provide a email')
      errorCount += 1
    } else setErrorEmail('')

    if (regex.test(employee.email) == false) {
      setErrorEmail('Please provide a valid email')
      errorCount += 1
    } else setErrorEmail('')

    if (errorCount > 0) return
  }
  const createEmployee = async () => {
    try {
      validateUserInput()
      if (employee.name) {
        const objEmployee = {
          name: employee.name,
          email: employee.email,
          active: true,
          organisation_id: organisationId,
          role:role,
        }
        console.log(objEmployee)
        await api.post('/employees', objEmployee)
        await getEmployees()
        closeModal()
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const updateAdministration = async () => {
    try {
      validateUserInput()
      if (employee.name) {
        const objEmployee = {
          id: selectedEmployee.id,
          name: employee.name,
          email: employee.email,
          active: true,
          organisation_id: organisationId,
          role:'user',
        }
        console.log(objEmployee,"objEmployee")
         const res = await api.put('/employees', objEmployee)
        console.log(res, 'res')
        getEmployees()
        closeModal()
      }
    } catch (error) {
      console.error()
    }
  }

  const removeEmployee = async () => {
    try {
      const employeeId = selectedEmployee.id
      await api.delete(`/employees/${employeeId}`)
      await getEmployees()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }
  const closeModal = () => {
    setEmployee({ name: '', email: '' })
    setSelectedEmployee(null)
    setOpen(false)
    setDeleteEmployee(false)
    setErrorName('')
    setErrorEmail('')
  }
  const filteredItems = employees.filter(item => item.role === "admin")

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions showDate={false} selectedOrganisation={(organisation) => setOrganisationId(organisation.id)} />
      </div>
      <Button onClick={() => setOpen(true)}>Create Administration</Button>
      <DataTable columns={columns} data={filteredItems} selectRow={(row) => setSelectedEmployee(row)} />
      <Modal setIsOpen={closeModal} isOpen={selectedEmployee ? true : false}>
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={employee.name}
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            error={errorName}
            label="Name"
          />
          <Input
            type="text"
            placeholder="Email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            error={errorEmail}
            label="Email"
          />
           <Select
            options={options}
            handleChange ={(option)=>setRole(option.role)}
            selected={role}
            />
          <div className={styles.btnTopmargin}>
            <Button  theme>
              Save
            </Button>
            <Button onClick={closeModal} theme="error">
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={open}>
        <div>
            <Select
            options={options}
            handleChange ={(option)=>setRole(option)}
            selected={role}
            />
          
          <div className={styles.btnTopmargin}>
            <Button onClick={createEmployee}>Create</Button>
            <Button onClick={closeModal} theme="error">
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={deleteEmployee}>
        <div>
          <div className={styles.deleteText}>
            Are you sure you want to delete? <br />
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
