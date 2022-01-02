import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Head from 'next/head'

const Layout = ({children, title}) => {
    return (
        <>
        <Head>
          <title>{title}</title>
        </Head>  
        <Header />
            <main>
              {children}
            </main>
        <Footer />
        </>
    )
}

export default Layout
