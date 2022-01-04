import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import absoluteUrl from 'next-absolute-url'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DestinationCard from '../components/destination/DestinationCard'
import HomeHero from '../components/layout/HomeHero'



export default function Home({}) {

  const [destinations, setDestinations] = useState([])
  const [signFilter, setSignFilter] = useState("")
  const [benefitsFilter, setBenefitsFilter] = useState("")

  useEffect(() => {

    // We need async function inside because useEffect does not handle promises

    // isSubscribed makes sure the function can not get called twice and have the first call resolve after the second, messing up state.

    let isSubscribed = true

    const fetchDestinations = async () => {
    
      let link = `/api/destinations/`
      let firstParam = true
  
      if(signFilter && signFilter !== ""){
        link = link.concat(`?signs=${signFilter}`)
        firstParam = false
      }

      if(benefitsFilter && benefitsFilter !== ""){
        link = link.concat(`${firstParam ? "?" : "&"}benefits=${benefitsFilter}`)
        firstParam = false
      }
  
      const {data} = await axios.get(link)
      
      if(isSubscribed){
        setDestinations(data.destinations)
      }
    }

    fetchDestinations().catch(err => console.log(err.message))

    return () => {
      isSubscribed = false
    }

  }, [signFilter, benefitsFilter])



  return (
    <>   
        <Layout title="Astral | Home">
          <HomeHero />
          <div style={{marginTop: -48}} className="container">
            <div className='bg-white py-3r rounded-1r mb-3r flex flex-col items-center'>
              <p>Browse by sign</p>
              <select value={signFilter} onChange={e => setSignFilter(e.target.value)}>
                <option value="">Any</option>
                <option value="Taurus">Taurus</option>
                <option value="Leo">Leo</option>
                <option value="Gemini">Gemini</option>
              </select>
              <p>Browse by benefits</p>
              <select value={benefitsFilter} onChange={e => setBenefitsFilter(e.target.value)}>
                <option value="">Any</option>
                <option value="Focus">Focus</option>
                <option value="Calm">Calm</option>
                <option value="Fertility">Fertility</option>
              </select>
            </div>
          </div>

          <div className='container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1r my-2r'>
            {destinations && destinations.map(destination => (
              <DestinationCard key={destination._id} destination={destination} />
            ))}
          </div>
        </Layout>
      </>
  )
}

// export async function getServerSideProps(context){


//   console.log(origin);
//   const { data } = await axios.get(`${origin}/api/destinations`)
//   console.log(data.destinations);

//   return {
//     props: {
//       destinations : data.destinations
//     }
//   }
// }
