import React from 'react'
import Adminlayout from '../../components/Topbar/Adminlayout'
import Userslist from '../../components/Topbar/Userslist'

function Alluser() {
  return (
    <div>
        <Adminlayout>
        <h1 className='text-3xl mb-4 text-gray-400'>All users</h1>
            <div className='bg-white  justify-center'>
               <Userslist/>
            </div>
        </Adminlayout>
      
    </div>
  )
}

export default Alluser
