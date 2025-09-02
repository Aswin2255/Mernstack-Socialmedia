import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Authform from '../../components/feature/auth/Authform';
import { signupSchema } from '../../components/feature/auth/authValidationSchema';
import { useSignupMutation } from '../../components/feature/auth/authHooks';
/*
import Cards from '../../components/userside/Cards';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../Axios';
import { Audio, Circles } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../store/Authslice';
import Topbar from '../../components/userside/topbar/Topbar';
*/

function Signuppage() {
  const SignupFields = [
    { name: 'Username', label: 'Username', type: 'text' },
    { name: 'Email', label: 'Email', type: 'email' },
    { name: 'Phone', label: 'Phone', type: 'text' },
    { name: 'Password', label: 'Password', type: 'password' },
    { name: 'ConfirmPassword', label: 'Confirm Password', type: 'password' },
  ];
  const [loader, setloader] = useState(false);

  const signupMutation = useSignupMutation({
    onSuccess: (data) => {
      // handle success (e.g., show toast, redirect)
    },
    onError: (error) => {
      // handle error (e.g., show error toast)
    },
  });

  /*
  const Usedispatch = useDispatch();


  // handelchange function for filling the formstate
  const handelchange = (e) => {
    dispatch({
      type: 'handelinput',
      field: e.target.name,
      payload: e.target.value,
    });
  };
  // initial state represent the initial state of the form
  const initialstate = {
    name: '',
    email: '',
    phone: '',
    pass: '',
    cpass: '',
    nameer: false,
    emailer: false,
    phoneer: false,
    passer: false,
    cpasser: false,
  };
  // Error display toast container
  const generateerror = (err) => {
    toast.error(err, {
      position: 'top-center',
    });
  };
  //  handelsubmit is used to trigger submitting action
  const handelsubmit = async () => {
    let emailValid = formstate.email.match(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    );
    console.log(emailValid);
    dispatch({
      type: 'handelinput',
      field: 'emailer',
      payload: !emailValid,
    });
    let usernamevalid = formstate.name.match(/^[a-zA-Z ]{2,30}$/); //eslint-disable-line

    console.log(usernamevalid);
    dispatch({
      type: 'handelinput',
      field: 'nameer',
      payload: !usernamevalid,
    });
    let phonevalid = formstate.phone.match(/^[789]\d{9}$/);
    console.log(phonevalid);
    dispatch({
      type: 'handelinput',
      field: 'phoneer',
      payload: !phonevalid,
    });
    let passvalid = formstate.pass.length >= 4;
    dispatch({
      type: 'handelinput',
      field: 'passer',
      payload: !passvalid,
    });
    let passmatch = formstate.pass === formstate.cpass;
    dispatch({
      type: 'handelinput',
      field: 'cpasser',
      payload: !passmatch,
    });
    if (emailValid && passvalid && passmatch && usernamevalid && phonevalid) {
      setloader(true);
      await axios
        .post('/auth/register', formstate, { withCredentials: true })
        .then((response) => {
          if (response.data.status) {
            setloader(false);
            Usedispatch(AuthActions.Userlogin(response.data.userdetails));
          } else {
            setloader(false);
            generateerror('email/phone already register');
          }
        });
    }
  };
  // it is the function used to manage the state it describe how to fill the the form state
  const reducer = (state, action) => {
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
  // calling use reducer hook return value from the usereducer hook is assigned to formstate and dispatch respectively
  const [formstate, dispatch] = useReducer(reducer, initialstate);
  console.log(formstate);
  */

  return (
    <>
      {/* 
      <ToastContainer />
      */}

      {loader ? (
        <div className="h-screen flex justify-center  bg-socialblue">
          <h1>Loading...</h1>
        </div>
      ) : (
        <>
          <div className="main flex h-screen">
            <div
              className="leftside bg-socialblue w-2/6 hidden  md:flex lg:flex"
              style={{ marginLeft: 0 }}
            >
              <div className="heading  items-center justify-center align-middle ml-1  ">
                <div className="brand flex items-center justify-center">
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
                    Welcome
                  </h1>
                  <p className="font-light text-white text-center mt-4 mb-16 text-2xl lg:block md:block hidden ">
                    Please Enter your personal information to create an Account
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
              </div>
            </div>
            <div className="rightside w-full lg:w-4/6 md:w-4/5 ">
              <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div className="w-full  rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                    <div className="brand flex lg:hidden md:hidden items-center justify-center">
                      <img
                        className=" mr-4 h-10 w-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OT_7ND-gEVZwvYx1--tEjdbrX6avwSJGTg&usqp=CAU"
                        alt="Your Company"
                      ></img>
                      <h1 className="text-5xl  font-bold leading-normal mt-0 mb-2 text-black ">
                        connect
                      </h1>
                    </div>

                    <Authform
                      fields={SignupFields}
                      validationSchema={signupSchema}
                      onSubmit={(values: any) => {
                        console.log('kkkkkkkkkkk');
                        console.log(values);
                        signupMutation.mutate(values);
                      }}
                      buttonText="Sign Up"
                    />
                  </div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Signuppage;
