import React from 'react'

function Admincards({children,nopading}) {
  let clases = 'bg-white shadow-md w-3/12 shadow-gray-300 rounded-lg  mb-5'
  if(!nopading){
    clases += ' p-4'
    
  }
  return (
    <div className={clases}>
        
      {children}

    </div>
   


  )
}

export default Admincards