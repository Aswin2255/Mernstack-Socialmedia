import React from 'react'
import Admincards from '../../components/appcomponents/Admincards'


function Dashboard() {
  return (
    <div>
      <h1 className='text-3xl mb-4 text-gray-400'>Dashboard</h1>
      <div className='md:flex justify-around '>

        
      <Admincards nopading={true}>
         <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
                <h1 className='font-bold'>Users</h1>
            </div>
            <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
                <p>100</p>
            </div>
         </Admincards>
         <Admincards nopading={true}>
         <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
         <h1 className='font-bold'>All posts</h1>
            </div>
            <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
                <p>100</p>
            </div>
         </Admincards>
         <Admincards nopading={true}>
         <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
         <h1 className='font-bold'>All comments</h1>
            </div>
            <div className='flex gap-2 items-center border-b border-b-gray-100 p-4'>
                <p>100</p>
            </div>
         </Admincards>


      </div>
      
         
    </div>
  )
}

export default Dashboard
