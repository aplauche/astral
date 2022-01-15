import React from 'react'

import signsData from '../data/signs.js'

const SignsSelector = ({onSignChange, selectedSigns}) => {

    return (
        <div className='flex flex-wrap w-full justify-center gap-2r px-2'>
        {signsData.map(sign => (
            <div key={`${sign.name}-selector`}>
            <input
                type="checkbox"
                id={`custom-checkbox-${sign.name}`}
                name={sign.name}
                value={sign.name}
                defaultChecked={() => selectedSigns.includes(sign.name) ? true : false}
                className='hidden'
                />
            <label 
                htmlFor={`custom-checkbox-${sign.name}`}
                className='cursor-pointer text-center flex flex-col items-centerfont-mono text-dark text-sm'
                onClick={() => onSignChange(sign.name)}
            >
                <div 
                    style={{strokeWidth: 8, borderWidth: 1}} 
                    className={`${selectedSigns.includes(sign.name) ? 'gradient-bg stroke-white' : 'stroke-dark'} mb-2 mx-auto w-16 h-16 stroke-2 fill-transparent border-dark rounded-2r p-4 hover:bg-dark hover:stroke-white`}
                >
                    {sign.output()}
                </div>
                {sign.name}
                
            </label>
            </div>
        ))}


        </div>
    )
}

export default SignsSelector
