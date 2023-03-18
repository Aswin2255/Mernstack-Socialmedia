import React from 'react'
import Admincards from './Admincards'

function Usercards() {
  return (
    <div>
        <Admincards>
         <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
                <h1>Users</h1>
            </div>
            <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
                <p>100</p>
            </div>
         </Admincards>
    </div>
  )
}

export default Usercards
