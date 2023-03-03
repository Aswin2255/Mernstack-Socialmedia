import React from 'react'
import Createpost from '../../components/appcomponents/Createpost'
import Layout from '../../components/appcomponents/Layout'

import Post from '../../components/appcomponents/Post'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../../Axios'
import { useDispatch, useSelector } from 'react-redux'
import Topbar from '../../components/appcomponents/topbar/Topbar'
import Bottombar from '../../components/appcomponents/botombar/Bottombar'
import Friendinfo from '../../components/appcomponents/Friendinfo'



function Home() {
  
  return (
    <>
    <Topbar/>
       <Layout>
      
      <Createpost />
         <Post />
     </Layout>
     <Bottombar/>

     </>
    
   
    
   
  )
}

export default Home
