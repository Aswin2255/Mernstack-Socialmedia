import React, { useEffect, useReducer, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cards from '../../components/appcomponents/Cards'
import { ToastContainer, toast } from 'react-toastify'
import axios from '../../Axios'
import { Audio } from 'react-loader-spinner'
import { useCookies } from "react-cookie";



function Signup() {
  /*------------------------------change to redux -------------------------------------------------*/
  const [cookies,setcookie] = useCookies()
  const Navigate = useNavigate()
  useEffect(()=>{
    console.log(cookies)
   if(cookies.jwt){
    Navigate('/')
   }
  },[])
  /*----------------------------------------------------------------------------------*/

  const [loader,setloader] = useState(false)
  // handelchange function for filling the formstate
  const handelchange = (e) => {
    dispatch({
      type: 'handelinput',
      field: e.target.name,
      payload: e.target.value
    })
  }
  // initial state represent the initial state of the form
  const initialstate = {
    name: '',
    email: '',
    phone: '',
    pass: '',
    cpass: '',
    nameer: false,
    emailer: false,
    phoneer:false,
    passer: false,
    cpasser: false
  }
  // Error display toast container
  const generateerror = (err)=>{
    toast.error(err,{
      position:"top-center"
    })
  }
  //  handelsubmit is used to trigger submitting action
  const handelsubmit =  async() => {
    let emailValid = formstate.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    console.log(emailValid)
    dispatch({
      type: 'handelinput',
      field: 'emailer',
      payload: !emailValid
    })
    let usernamevalid = formstate.name.match(/^[a-zA-Z\-]+$/);
    dispatch({
      type: 'handelinput',
      field: 'nameer',
      payload: !usernamevalid
    })
    let phonevalid = formstate.phone.match(/^[789]\d{9}$/)
    dispatch({
      type: 'handelinput',
      field: 'phoneer',
      payload: !phonevalid
    })
    let passvalid = formstate.pass.length >= 4
    dispatch({
      type: 'handelinput',
      field: 'passer',
      payload: !passvalid
    })
    let passmatch = formstate.pass === formstate.cpass
    dispatch({
      type: 'handelinput',
      field: 'cpasser',
      payload: !passmatch
    })
    if (emailValid && passvalid && passmatch && usernamevalid) {
      setloader(true)
         await axios.post('/auth/register',formstate,{withCredentials:true}).then((response)=>{
          if(response.data.status){
              setloader(false)
               Navigate('/verifyemail')
          }
          else{
            setloader(false)
            generateerror('email/phone already register')
          }
         })
         
    }
  }
  // it is the function used to manage the state it describe how to fill the the form state
  const reducer = (state, action) => {
    switch (action.type) {
      case 'handelinput':
        return {
          ...state,
          [action.field]: action.payload
        }


      default:
        break;
    }
  }
  // calling use reducer hook return value from the usereducer hook is assigned to formstate and dispatch respectively
  const [formstate, dispatch] = useReducer(reducer, initialstate)
  console.log(formstate)

  return (
    <div className='h-screen flex items-center'>
        <ToastContainer />
    {
      loader ? <div className='mx-auto'>
        <Audio
      height="80"
      width="80"
      radius="9"
      color="green"
      ariaLabel="loading"
      wrapperStyle
      wrapperClass
    />
      </div> :   <div className='max-w-md mx-auto grow '>


      <Cards>
        <h1 className='text-5xl mb-4  text-gray-400  text-center justify-center '>Signup</h1>
        <div>
          <input className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={formstate.name} placeholder='Enter the Name' name='name' onChange={(e) => { handelchange(e) }} type='text'></input>
          {formstate.nameer ? <label className='text-red-700'>Invalid username</label> : ''}

        </div>
        <div>

          <input className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={formstate.email} placeholder='Enter the email' name='email' onChange={(e) => { handelchange(e) }} type='text'></input>
          {formstate.emailer ? <label className='text-red-700'>Invalid email</label> : ''}
        </div>
        <div>

          <input className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={formstate.phone} placeholder='Enter the phone number' name='phone' onChange={(e) => { handelchange(e) }} type='text'></input>
          {formstate.phoneer ? <label className='text-red-700'>Invalid phone number</label> : ''}
        </div>
        <div>
          <input className="block w-full p-2.5 mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={formstate.pass} placeholder='Enter the password' name='pass' onChange={(e) => { handelchange(e) }} type='password'></input>
          {formstate.passer ? <label className='text-red-700'>Invalid password</label> : ''}
        </div>
        <div>
          <input className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" value={formstate.cpass} placeholder='Confirm password' name='cpass' onChange={(e) => { handelchange(e) }} type='password'></input>
          {formstate.cpasser ? <label className='text-red-700'>Password not matched</label> : ''}
        </div>
        <div className='flex gap-4 items-center justify-center m-4'>
          <button onClick={handelsubmit} className='bg-socialblue text-white px-6 py-1 rounded-md'>Signup</button>
        </div>
        <Link className=' hidden  gap-4 items-center justify-center m-4 p-4 border-b-gray-100 hover:bg-socialblue hover:text-white hover:scale-110 transition-all'>
          <svg className='h-8' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" /></svg>Signup with Google
        </Link>
        

      </Cards>
    
    </div>
    }

    </div>
  )
}

export default Signup
