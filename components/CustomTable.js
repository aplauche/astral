import React from 'react'


const CustomTable = ({columns, rows}) => {
    return (
        <table className='w-full'>
            <thead>
                <tr>
                {columns.map(col => (
                    <th key={col.title}>{col.title}</th>
                ))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                  
                    <tr key={row._id}>
                        {columns.map(col=>(
                            <td key={col.title + row._id}>{col.selector(row)}</td>
                        ))}
                    </tr>
                 
                ))}
            </tbody>
        </table>
    )
}

export default CustomTable
