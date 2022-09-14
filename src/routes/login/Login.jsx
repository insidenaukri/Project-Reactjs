import styles from './Login.module.css'
import logo from '../../assets/regent-logo.png'

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <img src={logo} className={styles.logo} alt="Hem" />
      <button
        className={styles.button}
        onClick={() => {
          window.open(`${import.meta.env.REACT_BACKEND_BASE_URL || 'http://localhost:4000'}/api/auth/login`, '_self')
        }}
      >
        <object
          type="image/svg+xml"
          data="https://s3-eu-west-1.amazonaws.com/cdn-testing.web.bas.ac.uk/scratch/bas-style-kit/ms-pictogram/ms-pictogram.svg"
          className={styles.xIcon}
        />
        Sign in with Microsoft
      </button>
    </div>
  )
}

export default Login
