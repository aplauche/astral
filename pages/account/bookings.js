import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { convertToLocal } from '../../utils/timezoneCorrections'
import Layout from '../../components/layout/Layout'
import CustomTable from '../../components/CustomTable'

const BookingsPage = () => {

    const [loading, setLoading] = useState(true)
    const [bookings, setBookings] = useState([])

    useEffect(()=>{
        (async ()=>{

            const {data} = await axios.get('/api/bookings')

            setBookings(data.bookings)

            setLoading(false)

        })()
    }, [])



    return (
        <Layout title="My Bookings">
        <section className="container my-32">
            <h1>My Bookings</h1>
            {loading ? 
                <div>
                    <p>Loading...</p>
                </div>
            : 
            <div>
                <CustomTable 
                    titles={['Check In Date', 'Check Out Date', 'Total Days', 'Price']}
                    rows={bookings}
                />
                {bookings.map(booking => {
                    // const start = new Date(booking.checkInDate)
                    const start = convertToLocal(new Date(booking.checkInDate))
                    const end = convertToLocal(new Date(booking.checkOutDate))
                    return (
                        <p key={booking._id}>{start.toDateString()} - {end.toDateString()}</p>
                    )
                   
                    // <p>{new Date(booking.checkInDate.toString())} - {booking.checkOutDate}</p>
                })}
            </div>
            }
        </section>
  
        </Layout>
    )
}

export default BookingsPage


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