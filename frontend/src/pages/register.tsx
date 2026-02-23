import { useState } from 'react'
import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom';

export const RegisterPage = () => {
    const navigate = useNavigate();
    const { register, loading } = useAuth()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
      const registerAction = async () => {
    
    if (!email) {
      alert('Email is required')
      return
    }
    if (!password) {
      alert('Password is required')
      return
    }
    try {
      const response = await register(email, password)
      navigate("/profile")
    } catch (error) {
      alert('Registration failed')
    }
  }

  return (
    <div>   
        <h2>Register</h2>
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
        <button disabled={loading} onClick={registerAction}>Register</button>
    </div>
  )
}