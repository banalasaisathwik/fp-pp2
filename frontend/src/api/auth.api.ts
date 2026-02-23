import { api } from "./axios";


async function login(email: string, password: string) {
  return api.post('/login', { email, password })
}

async function register(email: string, password: string) {
  return api.post('/register', { email, password })
}

async function getProfile() {
  return api.get('/profile')
}

async function logout() {
  return api.post('/logout')
}

export const authApi = {
  login,
  register,
  getProfile,
    logout,
}