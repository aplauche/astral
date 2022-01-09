import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { convertToLocal } from '../../utils/timezoneCorrections'
import Layout from '../../components/layout/Layout'
import CustomTable from '../../components/CustomTable'
import Link from 'next/link'


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

    const handleDelete = (id) => {
        console.log(id);
    }

    return (
        <Layout title="My Bookings">
        <section className="container my-32">
            <h1 className='text-center'>My Bookings</h1>
            {loading ? 
                <div>
                    <p>Loading...</p>
                </div>
            : 
            <div>
                <CustomTable 
                    columns={[
                        {
                            title: "Check In",
                            selector: row => convertToLocal(new Date(row.checkInDate)).toDateString()
                        },
                        {
                            title: "Check Out",
                            selector: row => convertToLocal(new Date(row.checkOutDate)).toDateString()
                        },
                        {
                            title: "Days Of Stay",
                            selector: row => row.daysOfStay
                        },
                        {
                            title: "Total Billed",
                            selector: row => `$${row.amountPaid * row.daysOfStay}`
                        },
                        {
                            title: "",
                            selector: row => (
                                <Link href={`/bookings/${row._id}`}>
                                    <a>View Details</a>
                                </Link>
                            )
                        },
                        {
                            title: "",
                            selector: row => (
                                <button className="underline">Download Invoice</button>
                            )
                        },
                    ]}
                    rows={bookings}
                />
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