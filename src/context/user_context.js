import React, { useContext, useEffect, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const UserContext = React.createContext()
export const UserProvider = ({ children }) => {
  const { isAuthenticated, user, isLoading, logout, loginWithRedirect } = useAuth0()
  const [myUser, setMyUser] = useState(null);
  useEffect(() => {
    return setMyUser(isAuthenticated ? user : false)
  }, [isAuthenticated])

  return (
    <UserContext.Provider value={{ isAuthenticated, user, isLoading, logout, myUser, loginWithRedirect }}>{children}</UserContext.Provider>
  )
}
// make sure use
export const useUserContext = () => {
  return useContext(UserContext)
}
