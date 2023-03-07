import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../../components/appcomponents/Avatar'
import Bottombar from '../../components/appcomponents/botombar/Bottombar'
import Cards from '../../components/appcomponents/Cards'
import Layout from '../../components/appcomponents/Layout'
import Topbar from '../../components/appcomponents/topbar/Topbar'


function Setings() {
  const value = useSelector((state)=>{
    return state
  })
  return (
    <div>
      <Topbar/>
        <Layout>
        <div className='h-screen flex md:items-center mt-4'>
        <div className='max-w-md mx-auto grow md:-mt-24'>
      
            <Cards>
            <div className='flex gap-4 items-center justify-start  m-4  '>
                <Avatar/>
                <div>
                <h3 className='font-bold text-xl'>{value.user}</h3>
               <Link className='hover:underline text-socialblue' to={'/propic'}>Change Profile Photo</Link>
            </div>
                </div>
                <div className='mb-4'>
                <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="name"
                    />
                </div>
                <div className='mb-4' >
                <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Username"
                    />
                </div>
                <div className='mb-4'>
                <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Email"
                    />
                </div>
                <div className='mb-4'>
                <input
                      type="text"
                      className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      id="exampleFormControlInput1"
                      placeholder="Phone number"
                    />
                </div>
               
                
                <Link className='flex gap-4 items-center justify-center m-4 p-4 border-b-gray-100 font-bold hover:bg-socialblue hover:text-white hover:scale-110 transition-all'>
                 Update
                </Link>
                <div className='grow text-right'>
                        <Link to={'/changepass'} className = 'font-semibold underline text-socialblue'>Change password</Link>
                    </div>
                
            </Cards>
        </div>
      
    </div>

        </Layout>
        <Bottombar/>
     
    </div>
  )
}

export default Setings
