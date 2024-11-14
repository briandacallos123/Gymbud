'use client'

import React,{createContext, useContext, useReducer, useState} from 'react'

const AuthContextProvider = createContext({});

export const useAuthContext = () => {
    return useContext(AuthContextProvider)
};

type AuthContextProps = {
    children:React.ReactNode
}

const AuthContext = ({children}:AuthContextProps) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);

    const login = () => setAuthenticated(true)

  return (
    <AuthContextProvider.Provider value={{
        authenticated, 
        login
    }}>
        {children}
    </AuthContextProvider.Provider>
  )
}

export default AuthContext