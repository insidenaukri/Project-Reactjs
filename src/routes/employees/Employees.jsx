import React, { useEffect, useState } from 'react'
import api from '../../api'
import { DataTable } from '../../components/data-table/'
import { Input } from '../../components/input/'
import { Button } from '../../components/button/'
import { Modal } from '../../components/modal/'
import { FilterOptions } from '../../components/filter-options/'
import styles from './Employees.module.css'

export function Employees() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [organisationId, setOrganisationId] = useState('')
  const [open, setOpen] = useState(false)
  const [deleteEmployee, setDeleteEmployee] = useState(false)
  const [employee, setEmployee] = useState({ name: '', email: '' })
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

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
    } catch (error) {
      console.error(error)
    }
  }

  const columns = [
    {
      Header: 'Employees',
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
                  theme="danger"
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

    if (errorCount > 0) return false
    else return true
  }
  const createEmployee = async () => {
    try {
      if (validateUserInput()) {
        const objEmployee = {
          name: employee.name,
          email: employee.email,
          active: true,
          organisation_id: organisationId,
        }
        console.log(employee)
        await api.post('/employees', objEmployee)
        await getEmployees()
        closeModal()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const updateEmployee = async () => {
    try {
      if (validateUserInput()) {
        const objEmployee = {
          id: selectedEmployee.id,
          name: employee.name,
          email: employee.email,
          active: true,
          organisation_id: organisationId,
        }
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

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions showDate={false} selectedOrganisation={(organisation) => setOrganisationId(organisation.id)} />
      </div>
      <Button onClick={() => setOpen(true)}>Create Employee</Button>
      <DataTable columns={columns} data={employees} selectRow={(row) => setSelectedEmployee(row)} />
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
          <div>
            <Button onClick={updateEmployee} theme>
              Save
            </Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={open}>
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
            type="email"
            placeholder="Email"
            value={employee.email}
            onChange={(e) => setEmployee({ ...employee, email: e.target.value })}
            error={errorEmail}
            label="Email"
          />
          <div>
            <Button onClick={createEmployee}>Create</Button>
            <Button onClick={closeModal}>Close</Button>
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
            <Button onClick={removeEmployee} theme="danger">Yes</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
