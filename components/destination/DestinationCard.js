import React from 'react'
import Link from 'next/link'

const DestinationCard = ({destination}) => {
    return (
        <article className="w-full p-1r bg-white flex flex-col">
            <div className='h-48 w-full bg-light mb-2r'></div>
            <h3>{destination.name}</h3>
            <p>${destination.pricePerNight} / night</p>
            <Link href={`/destinations/${destination._id}`}>
                <a className='button-primary'>View Details</a>
            </Link>
        </article>
    )
}

export default DestinationCard
