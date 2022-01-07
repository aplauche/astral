
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import { getSession, signIn } from 'next-auth/react'

const LoginPage = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLoginSubmit = async (e) => {
        e.preventDefault()
        signIn("credentials", { username: email, password: password })
    }

    return (
        <Layout>
        <section className='bg-light my-32 px-1r'>
            <h1 className='text-center'>Login</h1>
            <div className="container bg-white rounded-1r p-3r max-w-md mx-auto">   
                <form method="POST" onSubmit={handleLoginSubmit} className='flex flex-col '>
                    <input 
                        id="email"
                        name="email"
                        type="email" 
                        placeholder='Email Address'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input 
                        id="password"
                        name="password"
                        type="password" 
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button
                    id="login_button"
                    type="submit"
                    disabled={loading ? true : false}
                    >
                        {loading ? <ButtonLoader /> : "Login"}
                    </button>                
                </form>
                <div className='text-center my-1r'>

                <Link href="/account/register">
                    <a>Register</a>
                </Link>
                </div>
            </div>
        </section>
        </Layout>
    )
}

export default LoginPage


export async function getServerSideProps(context){

    const session = await getSession({req: context.req})
    
    if(session){
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