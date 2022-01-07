// import {createContext, useState } from 'react'
// import { useSession, signOut, signIn } from "next-auth/react"

// export const UserContext = createContext()

// export const UserContextProvider = ({children}) => {

//     const {data: session, status}  = useSession()
    
//     // const [user, setUser] = useState(null)



//     return (
//         <UserContext.Provider value={{user: session.user, status}}>
//             {children}
//         </UserContext.Provider>
//     )

// }