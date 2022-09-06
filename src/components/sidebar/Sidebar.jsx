import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  const mainRoutes = [
    { name: 'Bonus calculations', path: '/' },
    { name: 'Bonus details', path: '/bonus-details' },
    { name: 'Bonus depts', path: '/bonus-depts' },
    { name: 'Import time entries', path: '/time-entries' },
    { name: 'Import salaries', path: '/salaries' },
    { name: 'Add expenses', path: '/expenses' },
    { name: 'Add extra bonuses', path: '/extra-bonuses' },
   
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
          <Link to={route.path}>{route.name}</Link>
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
              <Link to={route.path}>{route.name}</Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
