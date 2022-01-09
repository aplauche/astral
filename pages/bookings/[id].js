
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import Image from "next/image";
import Link from "next/link";
import ReactDatePicker from "react-datepicker";
import { signIn, useSession } from "next-auth/react";
import { convertToLocal } from "../../utils/timezoneCorrections";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";
import BookingCalendar from "../../components/destination/BookingCalendar";

export default function SingleBookingPage() {

    const [booking, setBooking] = useState(null)
    const router = useRouter()

    useEffect(() => {
        (async() => {

            console.log(router);
            const {data} = await axios.get(`/api/bookings/${router.query.id}`)
            console.log(data);

            setBooking(data.booking)

        })()
    },[])

    return (
        <>
            <Layout title={`Booking Details`}>

                

                <section className="container my-3r">
                    {booking === null
                    ?
                        <p>Loading...</p>
                    : 
                    <>

                        <div style= {{height: "25vw", maxHeight: 450}} className="w-full relative mb-2r">
                            <Image className="w-full" src="/images/astral-banner.jpg" priority layout="fill" objectFit="cover"/>
                        </div>
                        <h1>{booking.destination.name}</h1>
                        <p><strong>{convertToLocal(new Date(booking.checkInDate)).toDateString()} - {convertToLocal(new Date(booking.checkOutDate)).toDateString()}</strong></p>
                        <hr />   
                        <p><strong>Guest Name:</strong> {booking.user.name}</p>
                        <p><strong>Guest Email:</strong> {booking.user.email}</p>
                        <p><strong>Length of Stay:</strong> {booking.daysOfStay} night(s)</p>
                        <p><strong>Cost Per Night:</strong> ${booking.destination.pricePerNight} / night</p>
                        <hr />
                        <h3><strong>Total Price:</strong> ${booking.amountPaid}.00</h3>
                        <hr />
                        <Link  href="/bookings">
                            <a>Back To All Bookings</a>
                        </Link>


                    </>            
                    }


                </section> 
      
     
            </Layout>
        </>
    )
}


// export async function getServerSideProps(context) {

//     dbConnect()

//     const result = await Booking.findById(context.params.id)
//     const booking = result.toObject()
//     booking._id = booking._id.toString()
//     booking.createdAt = null
  
//     return { props: { booking: booking } }
// }