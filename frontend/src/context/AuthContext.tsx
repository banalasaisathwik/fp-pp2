import { createContext  } from "react";

type User = {
    id: number;
    email: string;
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
  login: (email: string, password: string) => Promise<void>,
  register: (email: string, password: string) => Promise<void>,
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext 
export {type AuthContextType };