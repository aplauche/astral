import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import Destination from "../../models/destination";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import { signIn, useSession } from "next-auth/react";
import { convertToUTC } from "../../utils/timezoneCorrections";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
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
                            <h2>Destination Details:</h2>
                            <p>{destination.description}</p>

                            <h2>Recommended For:</h2>

                            <ul>
                                {destination.signs.map(sign => (
                                    <li key={sign}>{sign}</li>
                                ))}
                            </ul>


                            <h2>Benefits:</h2>

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