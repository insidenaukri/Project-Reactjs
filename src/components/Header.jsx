import { Link } from 'react-router-dom'
import logo from '../assets/regent-logo.png'

export default function Header() {
  return (
    <header className="header">
      <nav>
        <Link to="/">
          <img src={logo} alt="Hem" />
        </Link>
        <h2 style={{ display: 'inline', marginLeft: '1rem' }}>Bonusportalen</h2>
      </nav>{' '}
    </header>
  )
}
