import { useState } from 'react'
import styles from '../styles/theme.module.css'

const ADMIN_PASSWORD = 'lavender2024' // Change this after deployment!

export default function AdminLogin({ isAdmin, setIsAdmin }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  const handleLogin = (e) => {
    e.preventDefault()
    if (input === ADMIN_PASSWORD) {
      setIsAdmin(true)
      setError(false)
    } else {
      setError(true)
    }
  }

  if (isAdmin) return (
    <div className={styles.adminBanner}>
      <span>Admin mode enabled</span>
      <button onClick={() => setIsAdmin(false)} className={styles.logoutBtn}>Logout</button>
    </div>
  )

  return (
    <form onSubmit={handleLogin} className={styles.adminForm}>
      <input
        type="password"
        placeholder="Admin password"
        value={input}
        onChange={e => setInput(e.target.value)}
        className={styles.adminInput}
      />
      <button type="submit" className={styles.loginBtn}>Login</button>
      {error && <span className={styles.errorMsg}>Incorrect password!</span>}
    </form>
  )
}