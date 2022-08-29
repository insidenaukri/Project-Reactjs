import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <h3>Main</h3>
      <ul>
        <li>
          <Link to="/">Bonus calculations</Link>
        </li>
        <li>
          <Link to="/">Bonus details</Link>
        </li>
        <li>
          <Link to="/">Sum of Bonus depts.</Link>
        </li>
        <li>
          <Link to="/">Import time sheets</Link>
        </li>
        <li>
          <Link to="/">Import salaries</Link>
        </li>
        <li>
          <Link to="/">Add expenses</Link>
        </li>
        <li>
          <Link to="/">Add extra bonuses</Link>
        </li>
      </ul>
      <h3>Configuration</h3>
      <ul>
        <li>
          <Link to="/">Employees</Link>
        </li>
        <li>
          <Link to="/">Organizations</Link>
        </li>
        <li>
          <Link to="/">Administrators</Link>
        </li>
        <li>
          <Link to="/">Other stuff...</Link>
        </li>
      </ul>
      <h3>Dev</h3>
      <ul>
        <li>
          <Link to="/dummy">Dummy</Link>
        </li>
        <li>
          <Link to="/healthcheck">Healthcheck</Link>
        </li>
      </ul>
    </aside>
  )
}
