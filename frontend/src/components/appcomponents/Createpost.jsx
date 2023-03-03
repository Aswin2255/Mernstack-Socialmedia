import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useDispatch, useSelector } from 'react-redux'

import Avatar from './Avatar'
import Cards from './Cards'

function Createpost() {
  
   
    return (
        <div>
            <Cards>
                <div className='flex gap-3 items-center'>
                    <div>
                        <Avatar/>
                      
                    </div>

                    <textarea className='grow p-3 h-14' placeholder={`whats on your mind.`}
                  
                     />
                    
                    
                </div>
              
                <div className='flex gap-5 items-center mt-2'>
                    <div>
                        <button className='flex gap-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>

                            People</button>

                    </div>
                    <div>
                        <button className='flex gap-1' >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                            </svg>
                            Checkin</button>

                    </div>
                    <div>
                        <input type='file' id='file upload' style={{display:'none'}} ></input>
                        <label htmlFor='file upload'>  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
</svg></label>
                    </div>
                    <div className='grow text-right'>
                        <button className='bg-socialblue text-white  md:px-6 py-1 rounded-md'>Share</button>
                    </div>



                </div>

            </Cards>

        </div>
    )
}

export default Createpost
