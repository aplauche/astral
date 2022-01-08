import React from 'react'

const BookingRow = (row) => {
    return (
        <tr>
            <td>{row.checkInDate}</td>
            <td>{row.checkOutDate}</td>
            <td>{row.daysOfStay}</td>
            <td>{row.amountPaid}</td>
        </tr>
    )
}


const CustomTable = ({titles, rows, component}) => {
    return (
        <table>
            <thead>
                {titles.map(title => (
                    <td>{title}</td>
                ))}
            </thead>
            <tbody>
                {rows.map(row => (
                  
                    React.cloneElement('BookingRow', {row})
                 
                ))}
            </tbody>
        </table>
    )
}

export default CustomTable
