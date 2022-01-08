import React, {useState, useEffect} from 'react'
import axios from "axios";
import absoluteUrl from "next-absolute-url";
import ReactDatePicker from "react-datepicker";
import { signIn, useSession } from "next-auth/react";
import { convertToUTC } from "../../utils/timezoneCorrections";

import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const BookingCalendar = ({bookingDestination}) => {

    const destination = bookingDestination
    const router = useRouter()
    const {data: session, status} = useSession()

    const [checkInDate, setCheckInDate] = useState(new Date());
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [validRange, setValidRange] = useState(null)
    const [excludedDates, setExcludedDates] = useState([]);
    const [loading, setLoading] = useState(true)
    const [daysOfStay, setDaysOfStay] = useState(3);


    // Pull in booked dates for calendar
    useEffect(()=>{
        (async() => {
            const {data} = await axios.get(`/api/bookings/booked-dates?destinationId=${destination._id}`)

            const exclude = data.bookedDates.map(day => {
                return new Date(day)
            })

            setExcludedDates(exclude)
        })()
    }, [])

    // Update days of stay and check if room is available for selected dates
    useEffect(()=> {

        if(checkInDate && checkOutDate){
            (async () => {
                const days = Math.floor(((new Date(checkOutDate) - new Date(checkInDate)) / 86400000) + 1)
                setDaysOfStay(days)
                setLoading(true)
                const link = `/api/bookings/check-valid-dates?destinationId=${destination._id}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`
    
                const {data} = await axios.get(link)
    
                if(data.isAvailable){
                    setValidRange(true)
    
                } else {
                    setValidRange(false)
                }
                setLoading(false)

            })()
        }


    }, [checkInDate, checkOutDate])


    // Handle the date change and convert to appropriate time handling
    const onDateChange = (dates) => {
        const [start, end] = dates;
        if(start){
            start.setHours(15, 0, 0, 0);
            start = convertToUTC(start);
        } 
        if(end){
            end.setHours(15, 0, 0, 0);
            end = convertToUTC(end)
        }
        setCheckInDate(start);
        setCheckOutDate(end);
    };


    // Create a booking
    const newBookingHandler = async() => {

        const bookingData = {
            destination: router.query.id,
            checkInDate: checkInDate,
            checkOutDate: checkOutDate,
            daysOfStay,
            amountPaid: 100,
            paymentInfo: {
                id: 'temp_stripe_id',
                status: 'temp_stripe_status'
            },
            paidAt: Date.now()
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const {data} = await axios.post('/api/bookings', bookingData, config)
            // router.push('/account/bookings')
        } catch (error) {
            console.log(error.response);
        }

    }


    return (
        <div className='text-center p1-r md:p-2r'>

            <h3>Choose your dates:</h3>

           <ReactDatePicker 
                className="w-100"
                selected={checkInDate}
                onChange={onDateChange}
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                excludeDates={excludedDates}
                selectsRange
                inline
            />

            {!loading && checkInDate && checkOutDate && !validRange &&
                <p>Selected Dates Not Available</p>
            }
            {!loading && checkInDate && checkOutDate && validRange && !session?.user &&
                <button className="button-primary" onClick={() => signIn()}>Log in to book!</button>
            } 
            {!loading && checkInDate && checkOutDate && validRange && session?.user &&
                <button className="button-primary w-full" onClick={newBookingHandler}>Book Now!</button>
            }
        </div>
    )
}

export default BookingCalendar
