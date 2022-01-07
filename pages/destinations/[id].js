import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import Destination from "../../models/destination";
import Image from "next/image";
import ReactDatePicker from "react-datepicker";
import { signIn, useSession } from "next-auth/react";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

export default function SingleDestinationPage({destination}) {

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [daysOfStay, setDaysOfStay] = useState(1)
    const {data: session, status} = useSession()

    const router = useRouter()

    useEffect(()=> {

        if(checkInDate && checkOutDate){
            const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)
            setDaysOfStay(days)
        }

    }, [checkInDate, checkOutDate])

    const onDateChange = (dates) => {
        const [start, end] = dates;
        // if(start){
        //     start.setHours(0, 0, 0, 0);
        // } 
        // if(end){
        //     end.setHours(0, 0, 0, 0);

        // }
        setCheckInDate(start);
        setCheckOutDate(end);
    };

    const newBookingHandler = async() => {

        const bookingData = {
            destination: router.query.id,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            daysOfStay,
            amountPaid: 100,
            paymentInfo: {
                id: 'temp_stripe_id',
                status: 'temp_stripe_status'
            },
            paidAt: Date.now()
        }

        try {
            console.log(bookingData)
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('/api/bookings', bookingData, config)
            console.log(data)
        } catch (error) {
            console.log(error.response);
        }

    }

    return (
        <>
            <Layout title="Details">

                <article className="container my-3r">
                    <h1>{destination.name}</h1>
                    <div style= {{height: 500}} className="w-full relative mb-2r">
                        <Image className="w-full" src="/images/astral-banner.jpg" priority layout="fill" objectFit="cover"/>
                    </div>

                    <div className="flex flex-row mb-3r">
                        <div className="w-2/3">
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
                        <div className="w-1/3 bg-white p-1r rounded-1r">
                            <ReactDatePicker 
                                className="w-100"
                                selected={checkInDate}
                                onChange={onDateChange}
                                startDate={checkInDate}
                                endDate={checkOutDate}
                                minDate={new Date()}
                                // excludeDates={excludedDates}
                                selectsRange
                                inline
                            />
                            {checkInDate && checkOutDate && session?.user &&
                                <button onClick={newBookingHandler}>Book Now!</button>
                            }
                            {checkInDate && checkOutDate && !session?.user &&
                                <button onClick={() => signIn()}>Log in to book!</button>
                            }
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