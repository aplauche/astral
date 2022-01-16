import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const DestinationCard = ({destination}) => {
    return (
        <article className="w-full p-1r bg-white flex flex-col">
            <div className='relative h-48 w-full bg-light mb-2r'>
                <Image className="w-full" layout="fill" objectFit="cover" src={destination.images[0].url} />
            </div>
            <h3>{destination.name}</h3>
            <p>${destination.pricePerNight} / night</p>
            <Link href={`/destinations/${destination._id}`}>
                <a className='button-primary'>View Details</a>
            </Link>
        </article>
    )
}

export default DestinationCard
