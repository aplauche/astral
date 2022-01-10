import React from 'react'
import EditDestinationForm from '../../../components/destination/EditDestinationForm'
import Layout from '../../../components/layout/Layout'


const CreateDestinationPage = () => {
    return (
        <Layout>
            <section className="container my-3r">
                <h1>Create a New Destination</h1>
                <EditDestinationForm create={true} />
            </section>
            
        </Layout>
          
    )
}

export default CreateDestinationPage
