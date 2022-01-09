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
                        <ul className='absolute bg-black text-white w-64 right-0 p-1r text-right'>
                            {status == 'authenticated' && session.user && session.user.role === 'admin' && (
                                <>
                                <li className='py-0p5r'>
                                    <Link href="/admin/destinations">
                                        <a className='text-white text-center'>Manage Destinations</a>
                                    </Link>
                                </li>
                                <hr className='m-0'/>
                                </>
                            )}
                            <li className='py-0p5r'>
                                <Link href="/bookings">
                                    <a className='text-white text-center'>My Bookings</a>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => signOut()}>Sign out</button>
                            </li>
                       </ul>
                    }
             
                </div>
            )}
            {status == 'unauthenticated' && (
                <>
                    <button className="text-white" onClick={() => signIn()}>Sign In</button>
                </>
            )}
            </div>
            
        </header>
    )
}

export default Header
