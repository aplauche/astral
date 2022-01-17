import React, { useEffect, useContext, useState } from 'react'
import Link from 'next/link'
import { useSession, signOut, signIn } from "next-auth/react"
import { UserContext, UserContextProvider } from "../../context/UserContext";

const Header = () => {

    const {data: session, status} = useSession()
    const [userHover, setUserHover] = useState(false)



    return (
        <header className='w-full bg-black py-1r '>
            <div className="container flex justify-between items-center h-full">
            <Link href="/">
              
            <a><svg className='w-36 h-12' width="315" height="74" viewBox="0 0 315 74" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M115.925 43.1345H125.749L120.853 31.2305L115.925 43.1345ZM112.565 51.1985H109.877L119.733 28.5425H121.973L131.829 51.1985H129.141L126.645 45.2465H115.061L112.565 51.1985ZM148.454 39.7745C148.134 39.1558 147.708 38.6652 147.174 38.3025C146.641 37.9398 145.99 37.7585 145.222 37.7585C144.86 37.7585 144.486 37.8012 144.102 37.8865C143.74 37.9718 143.409 38.1105 143.11 38.3025C142.812 38.4732 142.566 38.6972 142.374 38.9745C142.204 39.2518 142.118 39.5932 142.118 39.9985C142.118 40.7025 142.364 41.2145 142.854 41.5345C143.345 41.8545 144.081 42.1318 145.062 42.3665L147.206 42.8785C148.252 43.1132 149.116 43.5932 149.798 44.3185C150.502 45.0225 150.854 45.9078 150.854 46.9745C150.854 47.7852 150.684 48.4892 150.342 49.0865C150.022 49.6625 149.585 50.1425 149.03 50.5265C148.497 50.8892 147.878 51.1558 147.174 51.3265C146.47 51.4972 145.756 51.5825 145.03 51.5825C143.878 51.5825 142.801 51.3692 141.798 50.9425C140.817 50.4945 139.974 49.7372 139.27 48.6705L141.094 47.4225C141.521 48.1052 142.054 48.6492 142.694 49.0545C143.356 49.4598 144.134 49.6625 145.03 49.6625C145.457 49.6625 145.884 49.6198 146.31 49.5345C146.737 49.4278 147.11 49.2785 147.43 49.0865C147.772 48.8732 148.038 48.6065 148.23 48.2865C148.444 47.9665 148.55 47.5932 148.55 47.1665C148.55 46.4198 148.273 45.8865 147.718 45.5665C147.164 45.2252 146.492 44.9585 145.702 44.7665L143.654 44.2865C143.398 44.2225 143.046 44.1158 142.598 43.9665C142.172 43.8172 141.745 43.5932 141.318 43.2945C140.913 42.9958 140.561 42.6118 140.262 42.1425C139.964 41.6518 139.814 41.0545 139.814 40.3505C139.814 39.5825 139.964 38.9105 140.262 38.3345C140.582 37.7585 140.998 37.2892 141.51 36.9265C142.044 36.5638 142.641 36.2972 143.302 36.1265C143.964 35.9345 144.646 35.8385 145.35 35.8385C146.396 35.8385 147.366 36.0412 148.262 36.4465C149.158 36.8518 149.852 37.5452 150.342 38.5265L148.454 39.7745ZM168.287 38.1425H163.967V46.9745C163.967 47.5292 164.021 47.9878 164.127 48.3505C164.234 48.6918 164.383 48.9585 164.575 49.1505C164.767 49.3425 164.991 49.4812 165.247 49.5665C165.525 49.6305 165.823 49.6625 166.143 49.6625C166.506 49.6625 166.879 49.6092 167.263 49.5025C167.647 49.3958 167.999 49.2572 168.319 49.0865L168.415 51.0385C167.626 51.4012 166.677 51.5825 165.567 51.5825C165.162 51.5825 164.735 51.5292 164.287 51.4225C163.861 51.3158 163.466 51.1132 163.103 50.8145C162.741 50.5158 162.442 50.1105 162.207 49.5985C161.973 49.0865 161.855 48.4145 161.855 47.5825V38.1425H158.687V36.2225H161.855V31.9985H163.967V36.2225H168.287V38.1425ZM177.792 40.8945C177.792 40.2332 177.771 39.5612 177.728 38.8785C177.707 38.1958 177.686 37.3105 177.664 36.2225H179.744V39.0065H179.808C179.958 38.6012 180.171 38.2172 180.448 37.8545C180.726 37.4705 181.056 37.1292 181.44 36.8305C181.846 36.5318 182.304 36.2972 182.816 36.1265C183.35 35.9345 183.947 35.8385 184.608 35.8385C185.206 35.8385 185.728 35.9025 186.176 36.0305L185.76 38.1105C185.483 38.0038 185.078 37.9505 184.544 37.9505C183.734 37.9505 183.04 38.1105 182.464 38.4305C181.888 38.7292 181.408 39.1238 181.024 39.6145C180.64 40.0838 180.352 40.5958 180.16 41.1505C179.99 41.7052 179.904 42.2385 179.904 42.7505V51.1985H177.792V40.8945ZM203.105 43.7425C202.572 43.7425 201.9 43.7745 201.089 43.8385C200.3 43.8812 199.532 44.0092 198.785 44.2225C198.06 44.4145 197.431 44.7238 196.897 45.1505C196.385 45.5772 196.129 46.1638 196.129 46.9105C196.129 47.4012 196.225 47.8278 196.417 48.1905C196.631 48.5318 196.908 48.8198 197.249 49.0545C197.591 49.2678 197.964 49.4278 198.369 49.5345C198.796 49.6198 199.223 49.6625 199.649 49.6625C200.417 49.6625 201.079 49.5345 201.633 49.2785C202.209 49.0225 202.689 48.6812 203.073 48.2545C203.457 47.8065 203.735 47.2945 203.905 46.7185C204.097 46.1212 204.193 45.4918 204.193 44.8305V43.7425H203.105ZM204.193 42.0145V41.6305C204.193 39.0492 202.913 37.7585 200.353 37.7585C198.604 37.7585 197.079 38.3452 195.777 39.5185L194.497 38.0145C195.905 36.5638 198.017 35.8385 200.833 35.8385C201.559 35.8385 202.252 35.9452 202.913 36.1585C203.596 36.3718 204.183 36.7025 204.673 37.1505C205.164 37.5772 205.559 38.1212 205.857 38.7825C206.156 39.4438 206.305 40.2332 206.305 41.1505V47.8385C206.305 48.4145 206.327 49.0225 206.369 49.6625C206.433 50.2812 206.497 50.7932 206.561 51.1985H204.513C204.449 50.8358 204.396 50.4412 204.353 50.0145C204.332 49.5878 204.321 49.1718 204.321 48.7665H204.257C203.639 49.7692 202.903 50.4945 202.049 50.9425C201.217 51.3692 200.193 51.5825 198.977 51.5825C198.316 51.5825 197.676 51.4865 197.057 51.2945C196.439 51.1238 195.884 50.8572 195.393 50.4945C194.924 50.1105 194.54 49.6518 194.241 49.1185C193.964 48.5638 193.825 47.9238 193.825 47.1985C193.825 45.9825 194.135 45.0332 194.753 44.3505C195.393 43.6465 196.183 43.1238 197.121 42.7825C198.081 42.4412 199.095 42.2278 200.161 42.1425C201.249 42.0572 202.241 42.0145 203.137 42.0145H204.193ZM220.179 51.1985H218.067V27.0065H220.179V51.1985ZM266.405 47.6145C266.021 48.1905 265.541 48.7345 264.965 49.2465C264.41 49.7585 263.77 50.2065 263.045 50.5905C262.319 50.9532 261.53 51.2412 260.677 51.4545C259.845 51.6678 258.959 51.7745 258.021 51.7745C256.335 51.7745 254.767 51.4758 253.317 50.8785C251.887 50.2812 250.639 49.4598 249.573 48.4145C248.527 47.3478 247.706 46.0892 247.109 44.6385C246.511 43.1878 246.213 41.5985 246.213 39.8705C246.213 38.1425 246.511 36.5532 247.109 35.1025C247.706 33.6518 248.527 32.4038 249.573 31.3585C250.639 30.2918 251.887 29.4598 253.317 28.8625C254.767 28.2652 256.335 27.9665 258.021 27.9665C259.429 27.9665 260.837 28.2438 262.245 28.7985C263.653 29.3532 264.858 30.2705 265.861 31.5505L263.845 33.0545C263.61 32.6918 263.29 32.3292 262.885 31.9665C262.479 31.6038 262.01 31.2838 261.477 31.0065C260.965 30.7292 260.41 30.5052 259.813 30.3345C259.215 30.1638 258.618 30.0785 258.021 30.0785C256.57 30.0785 255.269 30.3452 254.117 30.8785C252.965 31.4118 251.983 32.1265 251.173 33.0225C250.383 33.9185 249.775 34.9638 249.349 36.1585C248.922 37.3318 248.709 38.5692 248.709 39.8705C248.709 41.1718 248.922 42.4198 249.349 43.6145C249.775 44.7878 250.383 45.8225 251.173 46.7185C251.983 47.6145 252.965 48.3292 254.117 48.8625C255.269 49.3958 256.57 49.6625 258.021 49.6625C258.618 49.6625 259.205 49.6092 259.781 49.5025C260.378 49.3958 260.954 49.2145 261.509 48.9585C262.085 48.7025 262.618 48.3612 263.109 47.9345C263.621 47.4865 264.09 46.9318 264.517 46.2705L266.405 47.6145ZM288.744 43.7105C288.744 42.8785 288.605 42.0998 288.328 41.3745C288.072 40.6492 287.699 40.0198 287.208 39.4865C286.717 38.9532 286.12 38.5372 285.416 38.2385C284.733 37.9185 283.955 37.7585 283.08 37.7585C282.205 37.7585 281.416 37.9185 280.712 38.2385C280.029 38.5372 279.443 38.9532 278.952 39.4865C278.483 40.0198 278.109 40.6492 277.832 41.3745C277.576 42.0998 277.448 42.8785 277.448 43.7105C277.448 44.5425 277.576 45.3212 277.832 46.0465C278.109 46.7718 278.483 47.4012 278.952 47.9345C279.443 48.4678 280.029 48.8945 280.712 49.2145C281.416 49.5132 282.205 49.6625 283.08 49.6625C283.955 49.6625 284.733 49.5132 285.416 49.2145C286.12 48.8945 286.717 48.4678 287.208 47.9345C287.699 47.4012 288.072 46.7718 288.328 46.0465C288.605 45.3212 288.744 44.5425 288.744 43.7105ZM291.048 43.7105C291.048 44.8412 290.845 45.8865 290.44 46.8465C290.056 47.8065 289.512 48.6385 288.808 49.3425C288.104 50.0465 287.261 50.6012 286.28 51.0065C285.32 51.3905 284.253 51.5825 283.08 51.5825C281.928 51.5825 280.861 51.3905 279.88 51.0065C278.92 50.6012 278.088 50.0465 277.384 49.3425C276.68 48.6385 276.125 47.8065 275.72 46.8465C275.336 45.8865 275.144 44.8412 275.144 43.7105C275.144 42.5798 275.336 41.5345 275.72 40.5745C276.125 39.6145 276.68 38.7825 277.384 38.0785C278.088 37.3745 278.92 36.8305 279.88 36.4465C280.861 36.0412 281.928 35.8385 283.08 35.8385C284.253 35.8385 285.32 36.0412 286.28 36.4465C287.261 36.8305 288.104 37.3745 288.808 38.0785C289.512 38.7825 290.056 39.6145 290.44 40.5745C290.845 41.5345 291.048 42.5798 291.048 43.7105ZM305.153 49.6625C305.153 50.1105 304.993 50.5158 304.673 50.8785C304.353 51.2198 303.937 51.3905 303.425 51.3905C302.913 51.3905 302.497 51.2198 302.177 50.8785C301.857 50.5158 301.697 50.1105 301.697 49.6625C301.697 49.2145 301.857 48.8198 302.177 48.4785C302.497 48.1158 302.913 47.9345 303.425 47.9345C303.937 47.9345 304.353 48.1158 304.673 48.4785C304.993 48.8198 305.153 49.2145 305.153 49.6625Z" fill="white"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M11.7219 62.967C32.4281 62.967 49.2139 46.1812 49.2139 25.475C49.2139 15.639 45.4262 6.68766 39.2298 0C54.1953 4.92153 65 19.0106 65 35.6232C65 56.3294 48.2142 73.1152 27.508 73.1152C16.6377 73.1152 6.84792 68.489 0 61.0981C3.68777 62.3109 7.62819 62.967 11.7219 62.967Z" fill="white"/>
            </svg></a>
    
            </Link>
            {status == 'authenticated' && session.user && (
                <div onMouseLeave={() => setUserHover(false)}    className='relative h-full'>
                    <button onMouseOver={() => setUserHover(true)} className='text-white'>{session.user.name}</button>
                    {userHover && 
                        <ul className='absolute bg-black text-white w-64 right-0 p-1r text-right'>
                            {status == 'authenticated' && session.user && session.user.role === 'admin' && (
                                <>
                                <li className='py-0p5r'>
                                    <Link href="/admin/destinations">
                                        <a className='text-white text-center'>Manage Destinations</a>
                                    </Link>
                                </li>
                                <hr className='m-0'/>
                                </>
                            )}
                            <li className='py-0p5r'>
                                <Link href="/bookings">
                                    <a className='text-white text-center'>My Bookings</a>
                                </Link>
                            </li>
                            <li>
                                <button onClick={() => signOut()}>Sign out</button>
                            </li>
                       </ul>
                    }
             
                </div>
            )}
            {status == 'unauthenticated' && (
                <>
                    <button className="text-white" onClick={() => signIn()}>Sign In</button>
                </>
            )}
            </div>
            
        </header>
    )
}

export default Header
