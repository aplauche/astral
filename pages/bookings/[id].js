
import Layout from "../../components/layout/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { getSession } from "next-auth/react";
import { convertToLocal } from "../../utils/timezoneCorrections";

import { useRouter } from "next/router";

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

                        
                        <h1>{booking.destination.name}</h1>
                        {/* <div style= {{height: "25vw", maxHeight: 450}} className="w-full relative mb-2r">
                            <Image className="w-full" src={booking.destination.images[0].url} priority layout="fill" objectFit="cover"/>
                        </div> */}
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



export async function getServerSideProps(context){

    const session = await getSession({req: context.req})
    
    if(!session){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }
}