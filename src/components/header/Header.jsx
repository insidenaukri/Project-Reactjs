import { Link } from 'react-router-dom'
import logo from '../../assets/regent-logo.png'
import styles from './Header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <nav>
        <Link to="/">
          <img src={logo} alt="Hem" />
        </Link>
        <h1 style={{ display: 'inline', marginLeft: '1rem' }}>Bonusportalen</h1>
      </nav>{' '}
    </header>
  )
}
