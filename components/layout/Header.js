import React, { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut, signIn } from "next-auth/react"
import { UserContext, UserContextProvider } from "../../context/UserContext";

const Header = () => {

    const {data: session, status} = useSession()
    const [userHover, setUserHover] = useState(false)



    return (
        <header className='w-full bg-black py-1r '>
            <div className="container flex justify-between items-center h-full">
            <Link href="/">
                <a className='text-white text-center'>Astral Co.</a>
            </Link>
            {status == 'authenticated' && session.user && (
                <div onMouseLeave={() => setUserHover(false)}    className='relative h-full'>
                    <button onMouseOver={() => setUserHover(true)} className='text-white'>{session.user.name}</button>
                    {userHover && 
                        <div className='absolute bg-black text-white w-32 right-0 p-1r text-right'>
                           <button onClick={() => signOut()}>Sign out</button>
                       </div>
                    }
             
                </div>
            )}
            {status == 'unauthenticated' && (
                <>
                    <button class="text-white" onClick={() => signIn()}>Sign In</button>
                </>
            )}
            </div>
            
        </header>
    )
}

export default Header
