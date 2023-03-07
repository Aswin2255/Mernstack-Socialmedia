import React, { useEffect, useReducer, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../Axios'
import Cards from '../../components/appcomponents/Cards'


function Loging() {

  const Navigate = useNavigate()
  const [cookies,setcookie] = useCookies()
  useEffect(()=>{
    console.log(cookies)
   if(cookies.jwt){
    Navigate('/')
   }
  },[])

  // initial state represent the initial state of the form
  const initialstate = {
    email : '',
    pass : '',
    emailer: false,
    passer:false
  }
// generating error message
  const generateerror = (err)=>{
    toast.error(err,{
      position:"top-center"
    })
  }

  // reducer function it describe the logic for filling the formstate
  const formreducer = (state,action)=>{
       switch (action.type) {
        case 'handelinput':
          return {
            ...state,
            [action.field]:action.payload
          }
       
        default:
          break;
       }
  }

  // handel change function is used to fill the formstate using dispatch
   const handelchange = (e)=>{
    dispatch({
      type:'handelinput',
      field:e.target.name,
      payload:e.target.value
    })
   }

   // handelsubmit is used to submit the form to backend
   const handelsubmit = async ()=>{
    console.log(formstate)
    let emailValid = formstate.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    console.log(emailValid)
    dispatch({
      type:'handelinput',
      field:'emailer',
      payload:!emailValid
    })
    let passvalid = formstate.pass.length >= 4
    dispatch({
      type: 'handelinput',
      field: 'passer',
      payload: !passvalid
    })
    if(emailValid && passvalid){
      axios.post('/auth/login',formstate,{withCredentials:true}).then((response)=>{
        console.log(response.data.status)
        if(response.data.status){
          Navigate('/')
        }
        else{
            generateerror(response.data.msg)
        }
      })
    }
   }

  // calling the usereducer hook return value from the usereducer hook is assigned to formstate and dispatch
  const [formstate,dispatch] = useReducer(formreducer,initialstate)


  return (
    <div className='h-screen flex items-center'>
      <div className='max-w-md mx-auto grow '>
        <h1 className='text-6xl mb-4  text-gray-400  text-center justify-center m-4'>Login</h1>
        <Cards>
          <div>
            <input className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the email' value={formstate.email}  name='email' onChange={(e)=>handelchange(e)}  type='text'></input>
            {formstate.emailer ? <label className='text-red-700'>Invalid email</label> : ''}
          </div>
          <div>
            <input className="block w-full p-2.5 mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder='Enter the password' value={formstate.pass} onChange={(e)=>handelchange(e)}  name='pass' type='password'></input>
            {formstate.passer ? <label className='text-red-700'>password is to short</label> : ''}
          </div>
          <div>
            <button className='bg-socialblue text-white px-6 py-1 rounded-md m-3' onClick={handelsubmit} >Login</button>
          </div>
          <Link className='hidden gap-4 items-center justify-center m-4 p-4 border-b-gray-100 hover:bg-socialblue hover:text-white hover:scale-110 transition-all'>
            <svg className='h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>Login with Google
          </Link>
          <div className='grow text-right'>
            <Link to={'/signup'} className='font-semibold underline'>Create an account</Link>
          </div>

        </Cards>
        <ToastContainer/>
      </div>

    </div>
  )
}

export default Loging
