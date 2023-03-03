import React from 'react'

function Chatscreen({children}) {
  return (
    <div>
         <div className='bg-white shadow-md  shadow-gray-300 box-border w-full grow h-62'>
      {children}

    </div>
   
      
    </div>
  )
}

export default Chatscreen
