import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import dbConnect from "../../utils/dbConnect";

import Destination from "../../models/destination";
import Image from "next/image";
import Link from "next/link";



import BookingCalendar from "../../components/destination/BookingCalendar";

export default function SingleDestinationPage({destination}) {

    return (
        <>
            <Layout title="Details">

                <article className="container my-3r">
                    <h1>{destination.name}</h1>
                    <div style= {{height: 500}} className="w-full relative mb-2r">
                        <Image className="w-full" src="/images/astral-banner.jpg" priority layout="fill" objectFit="cover"/>
                    </div>

                    <div className="flex flex-col md:flex-row mb-3r">
                        <div className="w-full md:w-1/2 lg:w-2/3 mb-3r">
                            <h3 className="accent-line">Destination Details:</h3>
                            <p>{destination.description}</p>

                            <h3 className="accent-line mt-3r">Recommended For:</h3>

                            <ul>
                                {destination.signs.map(sign => (
                                    <li key={sign}>{sign}</li>
                                ))}
                            </ul>


                            <h3 className="accent-line  mt-3r">Benefits:</h3>

                            <ul>
                                {destination.benefits.map(benefit => (
                                    <li key={benefit}>{benefit}</li>
                                ))}
                            </ul>
                            
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 bg-white p-1r rounded-1r">
                           <BookingCalendar bookingDestination={destination}/>
                        </div>
                    </div>

                    <hr />

                    <Link href="/" >
                        <a className="button-pill mt-2r">Back to all destinations</a>
                    </Link>

                </article>
 
            
     
            </Layout>
        </>
    )
}


export async function getServerSideProps(context) {

    dbConnect()

    const result = await Destination.findById(context.params.id)
    const destination = result.toObject()
    destination._id = destination._id.toString()
    destination.createdAt = null
  
    return { props: { destination: destination } }
}