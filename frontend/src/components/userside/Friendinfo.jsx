import React from 'react'
import Avatar from './Avatar'

function Friendinfo({e}) {
    return (
        <div className='flex gap-2'>
            <Avatar />
            <div>
                <h3 className='font-bold text-xl'>{e.name}</h3>
                
            </div>
            <div className='grow text-right'>
                <button className='bg-socialblue text-white px-6 py-1 rounded-md'>Remove</button>
            </div>
        </div>
    )
}

export default Friendinfo
