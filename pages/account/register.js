
import React, {useState, useEffect} from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/router'
import Layout from '../../components/layout/Layout'
import { getSession } from 'next-auth/react'

const RegisterPage = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const router = useRouter()

    const handleRegisterSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const body = {
            name,
            email,
            password
        }
        const user = await axios.post('/api/users', body)

        if(user){
            setLoading(false)
            router.push('/')
        }
    }

    return (
        <Layout>
        <section className='bg-light my-32 px-1r'>
            <h1 className='text-center'>Register</h1>
            <div className="container bg-white rounded-1r p-3r max-w-md mx-auto">   
                <form method="POST" onSubmit={handleRegisterSubmit} className='flex flex-col '>
                    <input 
                        id="name"
                        name="name"
                        type="text" 
                        placeholder='Username'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
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
                    id="register_button"
                    type="submit"
                    disabled={loading ? true : false}
                    >
                        {loading ? "Working..." : "REGISTER"}
                    </button>                
                    
                </form>
                <div className='text-center my-1r'>
                    <Link href="/account/login">
                        <a >Login</a>
                    </Link>
                </div>
                
            </div>
        </section>
        </Layout>
    )
}

export default RegisterPage


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