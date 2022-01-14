import axios from 'axios'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import EditDestinationForm from '../../../components/destination/EditDestinationForm'
import Layout from '../../../components/layout/Layout'


const EditDestinationPage = () => {

    const router = useRouter()

    const [destinationData, setDestinationData] = useState(false)

    useEffect(() => {
        
        (async()=>{

            if(router.isReady){
                const {data} = await axios.get(`/api/destinations/${router.query.id}`)
                setDestinationData(data.destination)
            }

        })()

    }, [router])

    return (
        <Layout>
            <section className="container my-3r">
                <h1 className='text-center'>Edit Destination</h1>
                {destinationData &&
                    <EditDestinationForm id={router.query.id} data={destinationData} />
                }
            </section> 
        </Layout>
          
    )
}

export default EditDestinationPage
