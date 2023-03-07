import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import axios from '../../Axios'
import Cards from '../../components/appcomponents/Cards'

function Verifyemail() {
  const [cookies,setcookie] = useCookies()
    const [otp,setotp] = useState('')
    const Navigate = useNavigate()
    /*-------------------------------change to redux --------------------------------------------*/
      useEffect(()=>{
        console.log(cookies)
       if(!cookies.jwt){
        Navigate('/login')
       }
       else{
        axios.get('user/getuser',{withCredentials:true}).then((response)=>{
            Navigate('/')
        }).catch((er)=>{

        })
       }
      },[])
      /*-------------------------------------------------------------------------------------------------*/
  

    const handelsubmit = async (e)=>{
           if(otp){
            await axios.post('/user/verifyemail',{otp},{withCredentials:true}).then((response)=>{
                if(response.status){
                    Navigate('/')
                }
                else{
                    console.log('hiii')
                    console.log(response)
                }
            }).catch((er)=>{
                Navigate('/login')
            })
           }
           else{
            alert('otp cannote be empty')
           }
    }
  return (
    <div>
        <div className='h-screen flex items-center'>
      <div className='max-w-md mx-auto grow '>
        <h1 className='text-6xl mb-4  text-gray-400  text-center justify-center m-4'>Verify-Email</h1>
        <Cards>
          <div>
            <input className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter verification code'  name='otp' value={otp} onChange={(e)=>setotp(e.target.value)} type='text'></input>

          </div>
        
          <div>
            <button className='bg-socialblue text-white px-6 py-1 rounded-md m-3' onClick={handelsubmit} >Submit</button>
          </div>
        
       

        </Cards>
        <ToastContainer />
      </div>

    </div>
    </div>
  )
}

export default Verifyemail
