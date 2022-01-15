import React from 'react'

import signsData from '../../data/signs'

const RecommendedSigns = ({signs}) => {
    return (
        <div className='flex flex-wrap gap-4'>
            {signsData.map(sign => {
                if(signs.includes(sign.name)){
                    return (
                        <div key={sign.name} className='flex flex-col items-center'>
                            <div 
                                style={{strokeWidth: 8, borderWidth: 1}} 
                                className={`gradient-bg stroke-white mb-2 mx-auto w-16 h-16 border-black stroke-2 fill-transparent rounded-2r p-4 `}
                            >
                                {sign.output()}
                            </div>
                            {sign.name}
                        </div>
                    )
                } 
            })}
        </div>
    )
}

export default RecommendedSigns
