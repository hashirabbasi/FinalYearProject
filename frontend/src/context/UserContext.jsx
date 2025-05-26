import React from 'react'
import { useState } from 'react'
import { createContext } from 'react'
export const userDataContext = createContext()
const UserContext = ({children}) => {
    
    const [user, setUser] = useState({
        fullName: {
            firstname: "",
            lastname: ""
        },
        email: "",
        password: ""
        
    })

  return (
    <div>
        <userDataContext.Provider  value={{user,setUser}}>
        {children}
        </userDataContext.Provider>
    </div>
  )
}

export default UserContext