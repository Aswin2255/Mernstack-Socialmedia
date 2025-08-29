/*import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../Axios';
import { AuthActions } from '../../store/Authslice';*/
import Authform from '../../components/feature/auth/Authform';
import { loginSchema } from '../../components/feature/auth/authValidationSchema';

function Loginpage() {
    const loginFields = [
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'password', label: 'Password', type: 'password' }
];
/*
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
    console.log(formstate);
    let emailValid = formstate.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
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
      const { data } = await axios.post('/auth/login', formstate, {
        withCredentials: true,
      });
      console.log(data);
      if (data.status) {
        // Userlogin is set to true
        Dispatch(AuthActions.Userlogin(data.userdetails));

        Navigate('/');
      } else {
        generateerror(data.msg);
      }
    }
  };

  // calling the usereducer hook return value from the usereducer hook is assigned to formstate and dispatch
  const [formstate, dispatch] = useReducer(formreducer, initialstate);
  */
  

  return (
    <>
      <div className="main flex h-screen ">
        {
          /* <ToastContainer /> */
        }
       
      <div className=" lg:w-1/2 ml-0 h-full bg-socialblue w-full ">
        <div className="heading flex items-center justify-center ">
          <img
            className=" mr-4 h-10 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OT_7ND-gEVZwvYx1--tEjdbrX6avwSJGTg&usqp=CAU"
            alt="Your Company"
          ></img>
          <h1 className="text-5xl  font-bold leading-normal mt-0 mb-2 text-white ">
            connect
          </h1>
        </div>
        <div className="captions mb-4">
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Hello ! Welcome back
          </h1>
          <p className="font-light text-white text-center mt-4 mb-16 text-2xl lg:block md:block hidden ">
            Login in with Your data entered during your registrationiiiiiiiiiiiii
          </p>
        </div>
        <div className="lg:flex md:flex  lg:flex-col  md:flex-col align-middle justify-center items-center  hidden">
          <div className="poster w-1/2">
            <img
              className=""
              src="https://rurutek.com/jio/assets/img/login-animate.gif"
            ></img>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center px-4 py-12 sm:px-6 lg:hidden md:hidden ">
          <div className="w-full  bg-white max-w-md space-y-8 shadow-sm shadow-white rounded-lg">
            <div></div>
        
          </div>
        </div>
      </div>
      <div className="lg:right lg:w-1/2 lg:h-full lg:block md:block hidden  ">
        <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img
                className="mx-auto h-14 w-auto"
                src="https://image.pngaaa.com/296/6917296-middle.png"
                alt="Your Company"
              ></img>
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600"></p>
            </div>
           <Authform
        fields={loginFields}
        validationSchema={loginSchema}
        onSubmit={async (values) => {
          console.log(values);
        }}
        buttonText="Sign In"
      />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}



export default Loginpage
