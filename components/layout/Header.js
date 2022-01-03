import React from 'react'
import Link from 'next/link'


const Header = () => {
    return (
        <header className='w-full bg-black flex py-1r justify-center items-center'>
            <Link href="/">
            <a className='text-white text-center'>Astral Co.</a>
            </Link>
            
        </header>
    )
}

export default Header
