import React, { useEffect, useState } from 'react'
import api from '../../api'
import { DataTable } from '../../components/data-table'
import { Input } from '../../components/input'
import { Button } from '../../components/button'
import { Modal } from '../../components/modal'
import { FilterOptions } from '../../components/filter-options'
import styles from './Administrators.module.css'

export function Administrators() {
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [organisationId, setOrganisationId] = useState('')
  const [open, setOpen] = useState(false)
  const [removeAdmin, setRemoveAdmin] = useState(false)
  const [user, setUser] = useState({ name: '', email: '', role: 'admin' })  
  const [role, setRole] = useState('')
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (organisationId) getUsers()
  }, [organisationId])

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser)
    }
  }, [selectedUser])

  const getUsers = async () => {
    try {
      const response = await api.get(`/employees/organisation/${organisationId}`)
      setUsers(response.data)

      //Filter non-admin users from employee list to populate
      const nonAdminUsersList = response.data?.filter(item => item.role === 'user')
      setOptions(nonAdminUsersList)
    } catch (error) {
      console.error(error)
    }
  }

  const adminUsers = users.filter(item => item.role === "admin")

  const columns = [
    {
      Header: 'Administrators',
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
                  children="Remove as Admin"
                  onClick={() => {
                    setRemoveAdmin(true)
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

  const addAsAdmin = async () => {
    try {
      const objUser = {
        name: user.name,
        email: user.email,
        active: true,
        organisation_id: organisationId,
        role: 'admin'
      }
      await api.put('/employees', objUser)
      await getUsers()
      closeModal()
    } catch (error) {
      console.error(error)
    }
  }

  const removeAsAdmin = async () => {
    try {
        const objUser = {
          id: selectedUser.id,
          name: user.name,
          email: user.email,
          active: true,
          organisation_id: organisationId,
          role: 'user'
        }
        await api.put('/employees', objUser)
        getUsers()
        closeModal()
    } catch (error) {
      console.error()
    }
  }

  const closeModal = () => {
    setUser({ name: '', email: '', role: 'admin' })
    setSelectedUser(null)
    setOpen(false)
    setRemoveAdmin(false)
  }

  return (
    <main>
      <div className={styles.header}>
        <FilterOptions showDate={false} selectedOrganisation={(organisation) => setOrganisationId(organisation.id)} />
      </div>
      <Button onClick={() => setOpen(true)}>Add Admin</Button>
      <DataTable columns={columns} data={adminUsers} selectRow={row => setSelectedUser(row)} />
      
      <Modal setIsOpen={closeModal} isOpen={open}>
        <div>
          <div className={styles.addAdminHeader}>
            Add user as <b>Admin</b>
          </div>
          <Select
            options={options}
            handleChange ={(option)=>setRole(option)}
            selected={role.name}
            placeholder={role.name}
            />
          <div className={styles.btnTopmargin}>
            <Button onClick={addAsAdmin}>Add Admin</Button>
            <Button onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
      <Modal setIsOpen={closeModal} isOpen={removeAdmin}>
        <div>
          <div className={styles.deleteText}>
          Are you sure you want to remove the user as admin? <br />
            User: <b className={styles.textColor}>{user.name}</b>
          </div>
          <div>
            <Button onClick={removeAsAdmin} theme="danger">Yes</Button>
            <Button onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
