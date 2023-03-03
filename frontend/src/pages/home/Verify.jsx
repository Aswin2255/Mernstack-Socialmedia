import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import instance from '../../Axios'
import Cards from '../../components/Topbar/Cards'

function Verify() {
    const Navigate = useNavigate()
    const {id} = useParams()
    const [otp,setotp] = useState('')
   const handlesubmit = async (e)=>{
    console.log(id,otp)
    const {data} = await instance.post('/verifyotp',{id,otp})
    if(data.error){
        alert(data.error)
    }
    else{
        Navigate('/')
    }
   
   }
  return (
    <div className='grid h-screen place-items-center'>
        <div className='bg-white max-w-md mx-auto grow'>
        <h1 className='text-4xl mb-4  text-gray-400  text-start m-4'>Verify OTP</h1>
           <Cards>
           <div>
                <input  className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"  placeholder='Verify otp'  name = 'email' value={otp} onChange = {(e)=>setotp(e.target.value)} type='text'></input>
               
                </div>
                <div className='flex flex-col'>
                <button className='bg-socialblue text-white px-6 py-1 rounded-md m-3' onClick={handlesubmit}>Verify</button>
                <button className='bg-green-600 text-white px-6 py-1 rounded-md m-3'>Resend</button>
                </div>
           </Cards>
        </div>
      
    </div>
  )
}

export default Verify
