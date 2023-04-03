import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from '../../Axios';
import Cards from '../../components/userside/Cards';
import Topbar from '../../components/userside/topbar/Topbar';
import { AuthActions } from '../../store/Authslice';

function Verifyemail() {
  console.log('hiii');
  const [otp, setotp] = useState('');
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const isverified = useSelector((state) => state.auth.userdetails);
  useEffect(() => {
    if (isverified.verified) {
      Navigate('/');
    }
  }, []);

  const handelsubmit = async (e) => {
    if (otp) {
      await axios
        .post('/user/verifyemail', { otp }, { withCredentials: true })
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
  return (
    <div>
      <Topbar />
      <div className="h-screen flex items-center">
        <div className="max-w-md mx-auto grow ">
          <h1 className="text-6xl mb-4  text-gray-400  text-center justify-center m-4">
            Verify-Email
          </h1>
          <Cards>
            <div>
              <input
                className="block w-full p-2.5  mb-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                placeholder="Enter verification code"
                name="otp"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
                type="text"
              ></input>
            </div>

            <div>
              <button
                className="bg-socialblue text-white px-6 py-1 rounded-md m-3"
                onClick={handelsubmit}
              >
                Submit
              </button>
            </div>
          </Cards>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default Verifyemail;
