import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../Axios';
import { AuthActions } from '../../store/Authslice';
function Verify() {
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
    let emailValid = formstate.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
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
  return (
    <div className="main flex h-screen ">
      <ToastContainer />
      <div className=" lg:w-1/2 ml-0 h-full bg-socialblue w-full ">
        <div className="heading flex items-center justify-center ">
          <img
            className=" mr-4 h-10 w-auto"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OT_7ND-gEVZwvYx1--tEjdbrX6avwSJGTg&usqp=CAU"
            alt="Your Company"
          ></img>
          <h1 className="text-5xl  font-bold leading-normal mt-0 mb-2 text-white ">connect</h1>
        </div>
        <div className="captions mb-4">
          <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
            Hello ! Welcome back
          </h1>
          <p className="font-light text-white text-center mt-4 mb-16 text-2xl lg:block md:block hidden ">
            Login in with Your data entered during your registration
          </p>
        </div>
        <div className="lg:flex md:flex  lg:flex-col  md:flex-col align-middle justify-center items-center  hidden">
          <div className="poster w-1/2">
            <img className="" src="https://rurutek.com/jio/assets/img/login-animate.gif"></img>
          </div>
          <div></div>
        </div>
        <div className="flex justify-center px-4 py-12 sm:px-6 lg:hidden md:hidden ">
          <div className="w-full  bg-white max-w-md space-y-8 shadow-sm shadow-white rounded-lg">
            <div></div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <div className="mb-2 ml-4">
                    <label className="font-medium ">Email address</label>
                  </div>
                  <div className="mb-2 p-4">
                    <input
                      className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter the Name"
                      value={formstate.email}
                      name="email"
                      onChange={(e) => handelchange(e)}
                      type="text"
                    ></input>
                    {formstate.emailer ? <label className="text-red-400">Invalid email</label> : ''}
                  </div>
                </div>
                <div>
                  <div className="mb-2 ml-4">
                    <label className="font-medium ">password</label>
                  </div>
                  <div className="mb-2 p-4">
                    <input
                      className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter the Password"
                      name="pass"
                      type="password"
                      value={formstate.pass}
                      onChange={(e) => handelchange(e)}
                    ></input>
                    {formstate.passer ? (
                      <label className="text-red-400">password is to short</label>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mr-4">
                <div className="flex items-center"></div>

                <div className="text-sm">
                  <Link
                    to={'/signup'}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Create an account
                  </Link>
                </div>
              </div>

              <div className="p-4">
                <button
                  type="button"
                  onClick={handelsubmit}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
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
            <form className="mt-8 space-y-6" action="#" method="POST">
              <div className="-space-y-px rounded-md shadow-sm">
                <div>
                  <div className="mb-2">
                    <label className="font-medium ">Email address</label>
                  </div>
                  <div className="mb-2">
                    <input
                      className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter the Name"
                      value={formstate.email}
                      name="email"
                      onChange={(e) => handelchange(e)}
                      type="text"
                    ></input>
                    {formstate.emailer ? <label className="text-red-400">Invalid email</label> : ''}
                  </div>
                </div>
                <div>
                  <div className="mb-2">
                    <label className="font-medium ">password</label>
                  </div>
                  <div className="mb-2">
                    <input
                      className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                      placeholder="Enter the Password"
                      name="pass"
                      type="password"
                      value={formstate.pass}
                      onChange={(e) => handelchange(e)}
                    ></input>
                    {formstate.passer ? (
                      <label className="text-red-400">password is to short</label>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center"></div>

                <div className="text-sm">
                  <Link
                    to={'/signup'}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Create an account
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={handelsubmit}
                  className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verify;
