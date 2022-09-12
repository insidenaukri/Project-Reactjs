import { NavLink } from 'react-router-dom'

import styles from './Sidebar.module.css'

export default function Sidebar() {
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
    { name: 'Adminstrators', path: '/admins' },
  ]

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
      </ul>
    </aside>
  )
}
