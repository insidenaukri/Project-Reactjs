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

export default function Organisations() {
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [error, setError] = useState('')
  const [organisationId, setOrganisationId] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [open, setOpen] = useState(false)
  const [deleteEmployeeModel, SetDeleteEmployeeModel]= useState(false)
  const [empolyeeemail, setEmpolyeeemail] =useState({name:'', email:''})
  const [employees, setEmployees] = useState([])
  const [erro, setErro] = useState('')

useEffect(() => {
    if (organisationId && selectedYear && selectedMonth) getEmployee()
  }, [organisationId, selectedYear, selectedMonth])

  useEffect(() => {
    if (selectedEmployee) {
        setEmpolyeeemail(selectedEmployee)
    }
  }, [selectedEmployee])


  const getEmployee = async () => {
    try {
      const response = await api.get(`/employees/organisation/${organisationId}`,)
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
            Header:'Email',
            accessor:'email',
          },{
            Header: '',
            accessor: 'delete',
            Cell : () => {
              return (
                <>
                <Button children="Delete"onClick={() =>{SetDeleteEmployeeModel(true)}}/>
                </>
              );
            }
          },
        ]
    }
  ]

  const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // const validateEmail = (email) => {
  //   const re =
      
  //   return re.test(String(email).toLowerCase());
  // };
  const createEmployee = async () => {
    try {
     if (empolyeeemail.name.trim().length < 1) return setError('Please provide a name')
     if (empolyeeemail.email.trim().length < 1) return setErro('Please provide a email')
     if(regex.test(empolyeeemail.email)==false)return setErro('Please provide a valid email')
    
    //{
      
    //  }else{
    //   setErro('')
    //   return true
    //  }
     //if (validateEmail(empolyeeemail.email.trim().length < 1)) return setErro('Invalid Email')
      
     //if (empolyeeemail.email.trim().length < 1) return setErro('Please provide a email')
      const employee = {
            id:organisationId, 
            name:empolyeeemail.name, 
            email:empolyeeemail.email, 
            active:true,
            organisation_id:organisationId
        }
        console.log(employee)
      await api.post('/employees', employee)
     await getEmployee()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const updateEmployee = async () => {
    try {
      if (empolyeeemail.name.trim().length < 1) return setError('Please provide a name')
      if (empolyeeemail.email.trim().length < 1) return setErro('Please provide a email')
      if(regex.test(empolyeeemail.email)==false)return setErro('Please provide a  valid email')
      const employee = {
            id:organisationId,
            name:empolyeeemail.name,
            email:empolyeeemail.email, 
            active:true, 
            organisation_id:organisationId
        }
        const res = await api.put('/employees',employee)
        console.log(res,'res')
        getEmployee()
        closeModal()
    } catch (error) {
      console.error()
    }
  }

  const removeEmployee = async () => {
    try {
      const orgId = empolyeeemail.id
      await api.delete(`/employees/${orgId}`)
      await getEmployee()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }
  const closeModal = () => {
    setSelectedEmployee(null)
    setOpen(false)
    SetDeleteEmployeeModel(false)
    setError('')
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
           <Button onClick={() => setOpen(true)} >Create Employee</Button>
      <DataTable columns={columns} data={employees} selectRow={(row) => setSelectedEmployee(row)} />
      <Modal setIsOpen={closeModal} isOpen={selectedEmployee ? true : false}>
        <div>
          <Input
            type="text"
            placeholder="Name"
            value={empolyeeemail.name}
            onChange={(e) => setEmpolyeeemail({...empolyeeemail,name:e.target.value,})}
            error={error}
            label="Name"
          />
          <Input
            type="text"
            placeholder="Name"
            value={empolyeeemail.email}
            onChange={(e) =>setEmpolyeeemail({...empolyeeemail,email:e.target.value})} 
            error={erro}
            label="Name"
          />
          {}
          
          <div>
            <Button onClick={updateEmployee}
            theme >Save</Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={open}>
        <div>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => setEmpolyeeemail({...empolyeeemail,name:e.target.value,})}
            error={error}
            label="Name"
          />
          <Input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmpolyeeemail({...empolyeeemail,email:e.target.value})}
            error={erro}
            label="Name"
          />
          {}
          <div>
            <Button onClick={createEmployee}>Create</Button>
            <Button onClick={closeModal}>Close</Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={deleteEmployeeModel}>
        <div>
          <div className={styles.deleteText}>
           Are you sure you want to delete? <br/> 
           Employee: <b className={styles.textColor}>{empolyeeemail.name}</b>
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
