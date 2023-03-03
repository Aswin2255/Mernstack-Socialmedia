import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import Avatar from '../Avatar'
import Bottombar from '../botombar/Bottombar'
import Layout from '../Layout'
import Topbar from '../topbar/Topbar'

function Mobchat() {
    const ismobile = useMediaQuery({query:'(max-width:770px)'})
    const [dropdown,setdropdown] = useState(false)
  return (
    <div className='chatpages' style={{display: !ismobile ? 'none' : 'block'}}>
 
    
    <Layout chat={true}>
        <div className='chat-container'>
       
            <div className='showchat' style={{display: ismobile  ? '' : 'none',width:'100%'}}>
                
                         <div className='topbar'>
                    <div className='chatavatar'>
                        <Avatar/>
                        <div className='username'>
                        <p>user</p>
                    </div>
                    </div>
                    
                    <div className='options'>
                    <button className='text-gray-400' onClick={()=>{setdropdown(!dropdown)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </button>
                    {
                        dropdown &&
                        <div className='absolute -right-6 bg-white shadow-gray-300 p-3 rounded-sm border border-gray-300 w-52'>
                        <a href='/save' className='flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                            </svg>

                            Clear chat</a>
                        
                        <a href='/save' className='flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>

                            Block & report</a>
                       
                       
                    </div>
                    }
                   
                    </div>
                </div>
                <div className='contents'>
                       <div className='send'>
                        <p>hii</p>
                       </div>
                       <div className='recieve'>
                        <p>heloow</p>
                       </div>
                    </div>
                <div className='bottom-bar'>
                    <div className='input-box'>
                        <input type='text'></input>
                    </div>
                   
                    <div className='sendbutton'>
                        <button>Send</button>
                    </div>
                </div>
                        
                   
                
               

            </div>
        </div>
    </Layout>
   
</div>
  )
}

export default Mobchat
