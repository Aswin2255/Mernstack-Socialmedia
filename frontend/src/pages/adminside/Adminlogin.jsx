import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../Axios';
import Cards from '../../components/userside/Cards';

import { AuthActions } from '../../store/Authslice';
import Admintopbar from '../../components/adminside/admintopbar/Admintopbar';

function Adminlogin() {
  const Dispatch = useDispatch();
  const Navigate = useNavigate();

  // initial state represent the initial state of the form
  const initialstate = {
    email: '',
    pass: '',
    emailer: false,
    passer: false,
  };
  // generating error message
  const generateerror = (err) => {
    toast.error(err, {
      position: 'top-center',
    });
  };

  // reducer function it describe the logic for filling the formstate
  const formreducer = (state, action) => {
    switch (action.type) {
      case 'handelinput':
        return {
          ...state,
          [action.field]: action.payload,
        };

      default:
        break;
    }
  };

  // handel change function is used to fill the formstate using dispatch
  const handelchange = (e) => {
    dispatch({
      type: 'handelinput',
      field: e.target.name,
      payload: e.target.value,
    });
  };

  // handelsubmit is used to submit the form to backend
  const handelsubmit = async () => {
   try {
    console.log(formstate);
    let emailValid = formstate.email.match(
      /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
    );
    console.log(emailValid);
    dispatch({
      type: 'handelinput',
      field: 'emailer',
      payload: !emailValid,
    });
    let passvalid = formstate.pass.length >= 4;
    dispatch({
      type: 'handelinput',
      field: 'passer',
      payload: !passvalid,
    });
    if (emailValid && passvalid) {
      const { data } = await axios.post('/admin/adminlogin', formstate, {
        withCredentials: true,
      });
      console.log(data);
      if (data.status) {
        // Userlogin is set to true
        Dispatch(AuthActions.Adminlogin());

        Navigate('/admin');
      } else {
        generateerror(data.msg);
      }
    }
    
   } catch ({response}) {
    generateerror(response.data.msg)
    
   }
  };

  // calling the usereducer hook return value from the usereducer hook is assigned to formstate and dispatch
  const [formstate, dispatch] = useReducer(formreducer, initialstate);

  return (
    <div>
      <Admintopbar />
      <div className="h-screen flex items-center">
        <div className="max-w-md mx-auto grow ">
          <div className="flex">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-6 ml-3 mr-3 sm:h-9 "
              alt="Flowbite Logo"
            ></img>
            <span className="logoname"> Admipanel</span>
          </div>

          <p class="m-4">Please login to your Adminpanel</p>
          <Cards>
            <div>
              <input
                className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter the email"
                value={formstate.email}
                name="email"
                onChange={(e) => handelchange(e)}
                type="text"
              ></input>
              {formstate.emailer ? (
                <label className="text-red-700">Invalid email</label>
              ) : (
                ''
              )}
            </div>
            <div>
              <input
                className="block w-full p-2.5 mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter the password"
                value={formstate.pass}
                onChange={(e) => handelchange(e)}
                name="pass"
                type="password"
              ></input>
              {formstate.passer ? (
                <label className="text-red-700">password is to short</label>
              ) : (
                ''
              )}
            </div>
            <div>
              <button
                className="bg-socialblue text-white px-6 py-1 rounded-md m-3"
                onClick={handelsubmit}
              >
                Login
              </button>
            </div>
          </Cards>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Adminlogin;
