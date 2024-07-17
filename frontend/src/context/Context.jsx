import React, { createContext, useEffect, useContext, useState } from 'react'

const AuthContext = createContext()

// Export the useAuth hook
export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: ""
  })
  useEffect(() => {
    const data = localStorage.getItem('auth')
    if (data) {
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user:parseData.user,
        token:parseData.token,
      })
    }
    // eslint-disable-nextline
  }, [])
return (
  <AuthContext.Provider value={[auth, setAuth]}>
    {children}
  </AuthContext.Provider>
)
}

// Export the AuthProvider component
export default AuthProvider
