import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cards from '../../components/appcomponents/Cards'
import { ToastContainer, toast } from 'react-toastify'



function Signup() {

  return (
    <div className='h-screen flex items-center'>
      <div className='max-w-md mx-auto grow '>


        <Cards>
          <h1 className='text-5xl mb-4  text-gray-400  text-center justify-center '>Signup</h1>
          <div>
            <input className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the Name'name='name' type='text'></input>


          </div>
          <div>

            <input className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the email' name='email'  type='text'></input>
          
          </div>
          <div>
            <input className="block w-full p-2.5 mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the password'  name='password'  type='password'></input>
           
          </div>
          <div>
            <input className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Confirm password' name='cpass'type='password'></input>
           
          </div>
          <div className='flex gap-4 items-center justify-center m-4'>
            <button className='bg-socialblue text-white px-6 py-1 rounded-md'>Signup</button>
          </div>
          <Link className='flex gap-4 items-center justify-center m-4 p-4 border-b-gray-100 hover:bg-socialblue hover:text-white hover:scale-110 transition-all'>
            <svg className='h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>Signup with Google
          </Link>

        </Cards>
        <ToastContainer />
      </div>

    </div>
  )
}

export default Signup
