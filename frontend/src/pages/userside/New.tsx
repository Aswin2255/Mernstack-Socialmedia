import React, { useEffect, useRef, useState } from 'react';
import { AuthActions } from '../../store/Authslice';
import axios from '../../Axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function New() {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isverified = useSelector((state) => state.auth.userdetails);
  const [otpvalues, setotpvalues] = useState('');
  const inputref = [useRef(null), useRef(null), useRef(null), useRef(null)];
  useEffect(() => {
    if (isverified.verified) {
      Navigate('/');
    }
  }, []);

  const handelsubmit = async (e) => {
    if (otpvalues) {
      alert(otpvalues);
      await axios
        .post('/user/verifyemail', { otpvalues }, { withCredentials: true })
        .then((response) => {
          if (response.status) {
            console.log(response.data.userdetails);
            dispatch(AuthActions.Userlogin(response.data.userdetails));
            Navigate('/');
          } else {
            console.log('hiii');
            alert('invalid otp');
          }
        })
        .catch((er) => {
          alert('invalid');
        });
    } else {
      alert('otp cannote be empty');
    }
  };
  const handelchange = (e, index) => {
    try {
      if (e.target.value !== null || e.target.value !== '' || e.target.value !== undefined) {
        const inputvalue = e.target.value;
        const newotpvalue = [...otpvalues];
        newotpvalue[index] = inputvalue;
        setotpvalues(newotpvalue.join(''));
        if (inputvalue.length === 1 && index < inputref.length - 1) {
          inputref[index + 1].current.focus();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-socialblue">
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-socialblue py-12">
        <div className="captions mb-4">
          <div className="heading flex items-center justify-center  ">
            <img
              className=" mr-4 h-10 w-auto"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7OT_7ND-gEVZwvYx1--tEjdbrX6avwSJGTg&usqp=CAU"
              alt="Your Company"
            ></img>
            <h1 className="text-5xl  font-bold leading-normal mt-0 mb-2 text-white ">connect</h1>
          </div>
          <p className="font-light text-white text-center mt-4  text-2xl lg:block md:block  ">
            {' '}
            you need to verify the email before using connect
          </p>
        </div>

        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
              <div className="flex flex-col text-sm font-medium text-gray-400">
                <p>We have sent a code to your email ba**@dipainhouse.com</p>
                <p>if not found just check your spam box </p>
              </div>
            </div>

            <div>
              <div className="flex flex-col space-y-16">
                <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                  {inputref.map((inputrefs, index) => {
                    return (
                      <>
                        <div className="w-16 h-16 ">
                          <input
                            className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                            ref={inputrefs}
                            key={index}
                            type="number"
                            maxLength={1}
                            onChange={(e) => handelchange(e, index)}
                          ></input>
                        </div>
                      </>
                    );
                  })}
                </div>

                <div className="flex flex-col space-y-5">
                  <div>
                    <button
                      onClick={handelsubmit}
                      className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-socialblue border-none text-white text-sm shadow-sm"
                    >
                      Verify Account
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default New;
