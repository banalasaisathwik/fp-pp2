import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
    const navigate = useNavigate();
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

const loginAction = async () => {
    if (!email) {
      alert('Email is required')
      return
    }
    if (!password) {
      alert('Password is required')
      return
    }
    try {
      const response = await login(email, password)
      navigate("/profile")
    
    } catch (error) {
      alert('Login failed')
    }
  }
  
    return (
        <div>
            <h2>Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading} onClick={loginAction}>Login</button>
        </div>
    )
}