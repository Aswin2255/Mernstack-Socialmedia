import React from 'react'
import Createpost from '../../components/appcomponents/Createpost'
import Layout from '../../components/appcomponents/Layout'
import Post from '../../components/appcomponents/Post'
import { useCookies } from 'react-cookie'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Topbar from '../../components/appcomponents/topbar/Topbar'
import Bottombar from '../../components/appcomponents/botombar/Bottombar'
import axios from '../../Axios'





function Home() {
  const [cookies,setcookie] = useCookies()
  const Navigate = useNavigate()
  useEffect(()=>{
    if(!cookies.jwt){
      Navigate('/login')
    }
    else{
      axios.get('/user/getuser',{withCredentials:true}).then((response)=>{
        

      }).catch((er)=>{
        Navigate('/verifyemail')
      })
    }
  },[])
  
  
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
