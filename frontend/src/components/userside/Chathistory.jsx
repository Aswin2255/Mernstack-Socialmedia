import React from 'react'
import Avatar from './Avatar'


function Chathistory() {
  return (
    <div>
        <div className='flex gap-2 mb-4'>
            <Avatar />
            <div>
                <h3 className='font-bold text-xl'>User</h3>
                <span className='text-sm '>Active 5m ago</span>
            </div>
           
        </div>
    </div>
  )
}

export default Chathistory
