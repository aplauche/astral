
import { useState, useEffect } from 'react'
import { useRouter } from "next/router"
import axios from 'axios'

const useDestination = () => {

    const router = useRouter()

    const [destination, setDestination] = useState(false)

    useEffect(() => {
        
        (async()=>{

            if(router.isReady){
                const {data} = await axios.get(`/api/destinations/${router.query.id}`)
                setDestination(data.destination)
            }

        })()

    }, [router])

    return destination
}

export default useDestination
