import { Navigate } from "react-router-dom"
import { useAuth } from "../context/useAuth"

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isAuthenticated,loading } = useAuth()

    if (loading) {
        return <div>Loading...</div>
    }
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }
    return <>{children}</>
}