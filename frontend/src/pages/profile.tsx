import { useAuth } from "../context/useAuth"

export const ProfilePage = () => {
    const { user, logout,loading } = useAuth()

    return (
        <>
        <div>
            <h2>Profile</h2>
            <p>This is the profile page.</p>
            {user && <p>Welcome, {user.email}!</p>}
        </div>
        <div>
            <button disabled={loading} onClick={() => {
                logout()
            }}>Logout</button>
        </div>
        </>
    )
}