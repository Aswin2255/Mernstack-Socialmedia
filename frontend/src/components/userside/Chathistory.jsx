import React, { useEffect, useState } from 'react'
import axios from '../../Axios'
import Avatar from './Avatar'


function Chathistory({conversation,currentuser}) {
  const [user,setuser] = useState([])
  useEffect(()=>{
    const friendid = conversation.members.find((e)=>e!==currentuser)
    const getuser = async() =>{
      try {
        const {data} = await axios.get(`/user/getuser/${friendid}`)
        setuser(data.userdetails)
        
      } catch (error) {
        console.log(error)
        
      }
    }
    getuser()

  },[currentuser,conversation])
  return (
    
   <>
   {
    user.length ?  <div className="userchat cursor-pointer hover:bg-gray-300" >
    <div className="avatar">
      <Avatar img={user[0].propicpath}  />
    </div>
    <div className="content">
      <h1>{user[0].name}</h1>

    </div>
  </div> : ''
   }
   </>
    
  )
}

export default Chathistory
