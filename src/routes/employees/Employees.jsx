import React from 'react'
import DataTable from '../../components/data-table/DataTable'
import Input from '../../components/input/Input'
import Button from '../../components/button/Button'
import styles from './Employees.module.css'
import api from '../../api'
import { useState } from 'react'
import { useEffect } from 'react'
import FilterOptions from '../../components/filter-options/FilterOptions'
import Modal from '../../components/modal/Modal'

export default function Employees() {
  const [employees, setEmployees] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [organisationId, setOrganisationId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [open, setOpen] = useState(false)
  const [deleteEmployee, setDeleteEmployee] = useState(false)
  const [employee, setEmployee] = useState({ name: '', email: '' })
  const [errorName, setErrorName] = useState('')
  const [errorEmail, setErrorEmail] = useState('')

  useEffect(() => {
    if (organisationId && selectedYear && selectedMonth) getEmployees()
  }, [organisationId, selectedYear, selectedMonth])

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

  const createEmployee = async () => {
    try {
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
    } catch (error) {
      console.error(error)
    }
  }

  const updateEmployee = async () => {
    try {
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
    setSelectedEmployee(null)
    setOpen(false)
    setDeleteEmployee(false)
    setErrorName('')
    setErrorEmail('')
  }

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions
          selectedOrganisation={(organisation) => setOrganisationId(organisation.id)}
          selectedMonth={(month) => setSelectedMonth(month)}
          selectedYear={(year) => setSelectedYear(year)}
        />
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
            onChange={(e) => setEmployee({ ...employee, name: e.target.value })}
            error={errorName}
            label="Name"
          />
          <Input
            type="email"
            placeholder="Email"
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
            <Button onClick={removeEmployee}>Yes</Button>
            <Button onClick={closeModal}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
