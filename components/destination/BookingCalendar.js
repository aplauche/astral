import React from 'react'

const BookingCalendar = () => {
    return (
        <>
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
            {checkInDate && checkOutDate && session?.user &&
                <button onClick={newBookingHandler}>Book Now!</button>
            }
            {checkInDate && checkOutDate && !session?.user &&
                <button onClick={() => signIn()}>Log in to book!</button>
            } 
        </>
    )
}

export default BookingCalendar
