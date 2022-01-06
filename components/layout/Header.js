import React, { useEffect } from 'react'
import Link from 'next/link'
import { useSession, signOut, signIn } from "next-auth/react"

const Header = () => {

    const {data: session, status} = useSession()

    useEffect(() => {
        console.log(session)
    }, [session])


    return (
        <header className='w-full bg-black flex py-1r justify-center items-center'>
            <Link href="/">
            <a className='text-white text-center'>Astral Co.</a>
            </Link>
            {status == 'loading' && (
                <p>loading...</p>
            )}
            {status == 'authenticated' && session.user && (
                <>
                    <p>Welcome {session.user.name}</p>
                    <button onClick={() => signOut()}>Sign out</button>
                </>
            )}
            {status == 'unauthenticated' && (
                <>
                    <button onClick={() => signIn()}>Sign In</button>
                </>
            )}

            
        </header>
    )
}

export default Header
