import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage as Login } from './pages/login'
import { RegisterPage as Register } from './pages/register'
import { ProfilePage as Profile } from './pages/profile'
import { ProtectedRoute } from './components/ProtectedRoute.tsx'

function App() {

  return (
    <Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="*" element={<Navigate to="/login" />} />
</Routes>
  )
    
}

export default App
