import React, {useState, useEffect} from 'react'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import Layout from '../../../components/layout/Layout'
import CustomTable from '../../../components/CustomTable'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'



const AdminDestinationsPage = () => {

    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [destinations, setDestinations] = useState([])
    const [refresh, setRefresh] = useState(1)

    useEffect(()=>{
        (async ()=>{

            const {data} = await axios.get('/api/destinations')

            setDestinations(data.destinations)

            setLoading(false)

        })()
    }, [refresh])


    const handleDelete = async(idToDelete) => {
        const {success} = await axios.delete(`/api/destinations/${idToDelete}`)


        setRefresh(refresh + 1)

    }
    

    return (
        <Layout title="Manage Destinations">
        <section className="container my-32">
            <h1 className='text-center'>Manage Destinations</h1>
            <Link href="/admin/destinations/create">
                <a className="button-pill text-center mb-2r  max-w-sm block mx-auto">Create New</a>
            </Link>
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
                            selector: row => 
                            (
                                <div style= {{height: 64, width:64}} className="relative ">
                                    <Image className="w-full" src={row.images[0].url} priority layout="fill" objectFit="cover"/>
                                </div>
                            )
                        },
                        {
                            title: "Name",
                            selector: row => row.name
                        },
                        {
                            title: "Price",
                            selector: row => `$${row.pricePerNight}`
                        },
                        {
                            title: "Signs",
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
                                <Link href={`/admin/destinations/${row._id}`}>
                                    <a className="inline-block mr-4 my-4 mb-0">Edit</a>
                                </Link>
                                <button onClick={() => handleDelete(row._id)} className="underline m-0 p-0">Delete</button>
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