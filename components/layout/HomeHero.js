import React from 'react'

const HomeHero = () => {
    return (
        <div 
            style={{
                backgroundImage: `linear-gradient(90deg, #00000099, #00000088), url(/images/astral-banner.jpg)`, 
                height: 500,
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}
            className='w-full text-white flex flex-col items-center justify-center'
        >
            <h1 className='text-white text-center tracking-widest font-thin'>Destinations for Astral Alignment</h1>
            <p className='tracking-widest font-mono'>EXPLORE CURATED DESTINATIONS TO ACCOMPLISH YOUR GOALS</p>
        </div>
    )
}

export default HomeHero
