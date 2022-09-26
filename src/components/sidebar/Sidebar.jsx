import { NavLink, useNavigate } from 'react-router-dom'
import api from '../../api'
import styles from './Sidebar.module.css'
import { updateUser, useUser } from '../../contexts'

export function Sidebar() {
  const navigateTo = useNavigate()
  const [state, dispatch] = useUser()
  const mainRoutes = [
    { name: 'Bonuses', path: '/' },
    { name: 'Bonus Depts', path: '/bonus-depts' },
    { name: 'Time Entries', path: '/time-entries' },
    { name: 'Salaries', path: '/salaries' },
    { name: 'Expenses', path: '/expenses' },
    { name: 'Extra Bonuses', path: '/extra-bonuses' },
  ]

  const configRoutes = [
    { name: 'Employees', path: '/employees' },
    { name: 'Organisations', path: '/organisations' },
    { name: 'Administrators', path: '/administrators' },
  ]

  const logout = async () => {
    try {
      await api.get('/auth/logout')
      navigateTo('/')
      updateUser(dispatch, null)
    } catch (error) {
      console.error(error)
    }
  }

  const MainRoutesList = () => {
    return mainRoutes.map((route, index) => {
      return (
        <li key={index}>
          <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={route.path}>
            {route.name}
          </NavLink>
        </li>
      )
    })
  }

  return (
    <aside className={styles.sidebar}>
      <h3>Main</h3>
      <ul>
        <MainRoutesList />
      </ul>
      <h3>Configuration</h3>
      <ul>
        {configRoutes.map((route, index) => {
          return (
            <li key={index}>
              <NavLink className={({ isActive }) => (isActive ? styles.active : '')} to={route.path}>
                {route.name}
              </NavLink>
            </li>
          )
        })}
        <li>
          <NavLink to="/" onClick={() => logout()}>
            Log Out
          </NavLink>
        </li>
      </ul>
    </aside>
  )
}
