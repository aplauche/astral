import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '../components/layout/Layout'
import absoluteUrl from 'next-absolute-url'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DestinationCard from '../components/destination/DestinationCard'
import HomeHero from '../components/layout/HomeHero'
import SignsSelector from '../components/SignsSelector'



export default function Home({}) {

  const [destinations, setDestinations] = useState([])
  const [signFilter, setSignFilter] = useState("")

  const [benefits, setBenefits] = useState(["Focus", "Calm", "Fertility"])
  const [benefitsFilter, setBenefitsFilter] = useState(new Array(benefits.length).fill(false))
  // const [benefitsFilter, setBenefitsFilter] = useState("")

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


      if(benefitsFilter && benefitsFilter.includes(true)){

        const filteredBenefits = benefits.filter((benefit, index) => {
          return benefitsFilter[index]
        })

        filteredBenefits.forEach(benefit => {
          link = link.concat(`${firstParam ? "?" : "&"}benefits[]=${benefit}`)
          firstParam = false
        })

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

  }, [signFilter, benefitsFilter, benefits])


  const handleBenefitsSelect = (position) => {

    // update checked state
    const updatedCheckedState = benefitsFilter.map((item, index) =>
      index === position ? !item : item
    );

    setBenefitsFilter(updatedCheckedState)
  }

  const handleSignsSelect = (selectedSign) => {
    setSignFilter(selectedSign)
  }

  return (
    <>   
        <Layout title="Astral | Home">
          <HomeHero />
          <div style={{marginTop: -48}} className="container">
            <div className='bg-white py-3r rounded-1r mb-3r flex flex-col items-center'>
              <h4 className='font-mono'>Select your sign</h4>
              <div className='h-0.5 bg-light w-32 mb-1r'></div>

              <div className='max-w-xl'>
                <SignsSelector onSignChange={handleSignsSelect} selectedSigns={[signFilter]} />
              </div>
              
            </div>

            <div className='py-2r text-center flex flex-col items-center'>
              <h4 className='font-mono'>Browse by benefits</h4>
              <div className='h-0.5 bg-light w-32 mb-1r'></div>
              <div className="flex flex-wrap gap-2">
                {benefits.map((benefit, index)=> (
                  <div key={benefit}>
                      <input
                          type="checkbox" 
                          id={`custom-checkbox-${benefit}`}
                          className='hidden'
                          name={benefit}
                          value={benefit}
                          checked={benefitsFilter[index]}
                          onChange={() => handleBenefitsSelect(index)}
                      />
                      <label 
                          className={`pill cursor-pointer hover:bg-dark hover:text-white ${benefitsFilter[index] ? 'gradient-bg text-white': ''}`}
                          htmlFor={`custom-checkbox-${benefit}`}
                      >

                          {benefit}
                      </label>
                  </div>
                ))}
              </div>
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
