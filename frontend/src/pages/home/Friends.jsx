import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Avatar from '../../components/appcomponents/Avatar'
import Bottombar from '../../components/appcomponents/botombar/Bottombar'
import Cards from '../../components/appcomponents/Cards'
import Friendinfo from '../../components/appcomponents/Friendinfo'
import Layout from '../../components/appcomponents/Layout'
import Topbar from '../../components/appcomponents/topbar/Topbar'


function Friends() {
   
    const tabclases = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white'
    const activeclase = 'flex gap-1 px-4 py-1 items-center border-socialblue font-bold'
    return (
        <div>
            <Topbar/>
            <Layout>
                <Cards nopading={true}>
                    <div className='relative overflow-hidden rounded-md'>
                        <div className='h-36 overflow-hidden flex justify-center items-center'>
                            <img src='https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60' alt='cover'></img>
                        </div>
                        <div className='absolute top-24 left-4'>
                            <Avatar size={'big'} />
                        </div>
                        <div className='p-4 '>
                            <div className='ml-40 '>
                                <h1 className='text-3xl font-bold'>
                                    
                                </h1>
                                <div className='text-gray-500 leading-4'>Kochi,Aluva

                                </div>
                                <div className='float-right'>
                            <a  href='/setings' className='bg-white md:px-6 py-1 rounded-md'>Settings</a>
                            </div>

                            </div>
                            <div className='mt-10 flex gap-5'>
                                <Link to={'/profile/post'} className={tabclases}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                    </svg>

                                    Post</Link>


                                <Link to={'/profile/about'} className={tabclases}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                    </svg>

                                    About  </Link>


                                <Link to={'/profile/friends'} className={activeclase}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                    </svg>
                                    Friends</Link>


                                <Link to={'/profile/photos'} className='flex gap-1 items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg>
                                    Photos</Link>
                            </div>

                        </div>
                    </div>

                </Cards>
                <div>
                    <Cards>
                        <h1 className='text-3xl mb-2'>Friends</h1>
                        <div className='border-b p-4'>
                            <Friendinfo/>
                           
                        </div>
                        <div className='border-b p-4'>
                            <Friendinfo/>
                           
                        </div>
                        <div className='border-b p-4'>
                            <Friendinfo/>
                           
                        </div>
                        <div className='border-b p-4'>
                            <Friendinfo/>
                           
                        </div>
                        
                        
                    </Cards>
                </div>
                
                  
               
            </Layout>
            <Bottombar/>
        </div>
    )
}

export default Friends
