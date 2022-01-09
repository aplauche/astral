import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import Layout from '../../../components/layout/Layout'
import CustomTable from '../../../components/CustomTable'
import Link from 'next/link'



const AdminDestinationsPage = () => {

    const [loading, setLoading] = useState(true)
    const [destinations, setDestinations] = useState([])

    useEffect(()=>{
        (async ()=>{

            const {data} = await axios.get('/api/destinations')

            setDestinations(data.destinations)

            setLoading(false)

        })()
    }, [])

    

    return (
        <Layout title="Manage Destinations">
        <section className="container my-32">
            <h1 className='text-center'>Manage Destinations</h1>
            {loading ? 
                <div>
                    <p>Loading...</p>
                </div>
            : 
            <div>
                <CustomTable 
                    columns={[
                        {
                            title: "Destination",
                            selector: row => row.name
                        },
                        {
                            title: "pricePerNight",
                            selector: row => row.pricePerNight
                        },
                        {
                            title: "Recommended Signs",
                            selector: row => row.signs.join(', ')
                        },
                        {
                            title: "Benefits",
                            selector: row => row.benefits.join(', ')
                        },
                        {
                            title: "",
                            selector: row => (
                                <>
                                <Link href={`/bookings/${row._id}`}>
                                    <a className="inline-block mr-4 my-4">Edit</a>
                                </Link>
                                <button onClick={() => console.log('delete')} className="underline">Delete</button>
                                </>
                            )
                        },

                    ]}
                    rows={destinations}
                />
            </div>
            }
        </section>
  
        </Layout>
    )
}

export default AdminDestinationsPage


export async function getServerSideProps(context){

    const session = await getSession({req: context.req})
    
    if(!session || session.user.role !== 'admin'){
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