import React, { useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import Cards from '../../components/userside/Cards';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../Axios';
import { Audio, Circles } from 'react-loader-spinner';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../../store/Authslice';
import Topbar from '../../components/userside/topbar/Topbar';

function Signup() {
  const Usedispatch = useDispatch();

  const [loader, setloader] = useState(false);
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

  return (
    <>
      <ToastContainer />
      {loader ? (
        <div className="h-screen flex justify-center  bg-socialblue">
          <Circles
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
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
                  <h1 class="text-5xl  font-bold leading-normal mt-0 mb-2 text-white ">
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
              <section class="bg-gray-50 ">
                <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <div class="w-full  rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                    <div className="brand flex lg:hidden md:hidden items-center justify-center">
                      <img
                        className=" mr-4 h-10 w-auto"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OT_7ND-gEVZwvYx1--tEjdbrX6avwSJGTg&usqp=CAU"
                        alt="Your Company"
                      ></img>
                      <h1 class="text-5xl  font-bold leading-normal mt-0 mb-2 text-black ">
                        connect
                      </h1>
                    </div>

                    <form className="mt-4 space-y-6" action="#" method="POST">
                      <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                          <div className="mb-2">
                            <label className="font-medium ">Name</label>
                          </div>
                          <div className="mb-2">
                            <input
                              className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              value={formstate.name}
                              placeholder="Enter the Name"
                              name="name"
                              onChange={(e) => {
                                handelchange(e);
                              }}
                            ></input>
                            {formstate.nameer ? (
                              <label className="text-red-400">
                                Invalid username
                              </label>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label className="font-medium ">
                              Email address
                            </label>
                          </div>
                          <div className="mb-2">
                            <input
                              className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              value={formstate.email}
                              placeholder="Enter the email"
                              name="email"
                              onChange={(e) => {
                                handelchange(e);
                              }}
                            ></input>
                            {formstate.emailer ? (
                              <label className="text-red-400">
                                Invalid email
                              </label>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label className="font-medium ">
                              Mobile number
                            </label>
                          </div>
                          <div className="mb-2">
                            <input
                              className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              value={formstate.phone}
                              placeholder="Enter the mobile number"
                              name="phone"
                              onChange={(e) => {
                                handelchange(e);
                              }}
                              type="number"
                            ></input>
                            {formstate.phoneer ? (
                              <label className="text-red-400">
                                Invalid phone number
                              </label>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label className="font-medium ">password</label>
                          </div>
                          <div className="mb-2">
                            <input
                              className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              value={formstate.pass}
                              placeholder="Enter the password"
                              name="pass"
                              onChange={(e) => {
                                handelchange(e);
                              }}
                              type="password"
                            ></input>
                            {formstate.passer ? (
                              <label className="text-red-400">
                                Invalid password
                              </label>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="mb-2">
                            <label className="font-medium ">
                              Confirm password
                            </label>
                          </div>
                          <div className="mb-2">
                            <input
                              className="block w-full p-2.5 mb-2  text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              value={formstate.cpass}
                              placeholder="Enter password again"
                              name="cpass"
                              onChange={(e) => {
                                handelchange(e);
                              }}
                              type="password"
                            ></input>
                            {formstate.cpasser ? (
                              <label className="text-red-700">
                                Password not matched
                              </label>
                            ) : (
                              ''
                            )}
                          </div>
                        </div>
                      </div>

                      <div class="flex items-center justify-between">
                        <div class="flex items-center"></div>

                        <div class="text-sm">
                          <Link
                            to={'/login'}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Sign in
                          </Link>
                        </div>
                      </div>

                      <div>
                        <button
                          type="button"
                          onClick={handelsubmit}
                          class="group relative flex w-full justify-center rounded-md bg-socialblue px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
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

export default Signup;
