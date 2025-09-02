import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../Axios';
import Avatar from '../../components/userside/Avatar';
import Bottombar from '../../components/userside/botombar/Bottombar';
import Cards from '../../components/userside/Cards';
import Layout from '../../components/userside/Layout';
import Propicmodal from '../../components/userside/modals/profilepicmodal/Propicmodal';
import Topbar from '../../components/userside/topbar/Topbar';
import { AuthActions } from '../../store/Authslice';

function Setings() {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.auth.userdetails);
  const [modal, setmodal] = useState(false);
  const initialformstate = {
    username: userdetails.name,
    email: userdetails.email,
    phone: `${userdetails.phone}`,
    nameer: false,
    emailer: false,
    phoneer: false,
  };

  const formreducer = (state, action) => {
    switch (action.type) {
      case 'form':
        return {
          ...state,
          [action.field]: action.payload,
        };

      default:
        break;
    }
  };
  const [formstate, dis] = useReducer(formreducer, initialformstate);

  const handelupdate = async (e) => {
    try {
      e.preventDefault();
      console.log(formstate.username);
      let uservalid = formstate.username.match(/^[a-zA-Z\-]+$/); //eslint-disable-line
      console.log(!uservalid);
      console.log(formstate);
      let phonevalid = formstate.phone.match(/^[789]\d{9}$/);
      let emailvalid = formstate.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      dis({
        type: 'form',
        field: 'emailer',
        payload: !emailvalid,
      });
      dis({
        type: 'form',
        field: 'phoneer',
        payload: !phonevalid,
      });
      dis({
        type: 'form',
        field: 'nameer',
        payload: !uservalid,
      });
      console.log(!uservalid);
      console.log(formstate);
      if (uservalid && phonevalid && emailvalid) {
        const { data } = await axios.patch(`/user/updateuser/${userdetails._id}`, formstate, {
          withCredentials: true,
        });
        if (data.status) {
          generatesucess('user details updated');
          dispatch(AuthActions.Userupdate(data.updateduser));
        } else {
          alert('error ocured');
          dispatch(AuthActions.UserLogout());
        }
      }
    } catch (error) {
      alert('error ocured');
      dispatch(AuthActions.UserLogout());
      console.log(error);
    }
  };
  const handelchange = async (field, value) => {
    dis({
      type: 'form',
      field: field,
      payload: value,
    });
  };
  const generatesucess = (msg) => {
    toast.success(msg, {
      position: 'top-center',
    });
  };

  return (
    <div>
      <ToastContainer />
      {modal ? <Propicmodal modal={setmodal} /> : ''}
      <Topbar />
      <Layout>
        <div className="h-screen flex md:items-center mt-4">
          <div className="max-w-md mx-auto grow md:-mt-24">
            <Cards>
              <div className="flex gap-4 items-center justify-start  m-4  ">
                <Avatar img={userdetails.propicpath} />
                <div className="float-right">
                  <p
                    onClick={() => {
                      setmodal(true);
                    }}
                    className="hover:underline text-socialblue cursor-pointer"
                  >
                    Change profile picture
                  </p>
                </div>
              </div>
              <form onSubmit={(e) => handelupdate(e)}>
                <div className="mb-4">
                  <input
                    type="text"
                    name="username"
                    value={formstate.username}
                    onChange={(e) => handelchange(e.target.name, e.target.value)}
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Username"
                  />
                  {formstate.nameer ? <label className="text-red-500">invalid username</label> : ''}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Email"
                    name="email"
                    value={formstate.email}
                    onChange={(e) => handelchange(e.target.name, e.target.value)}
                  />
                  {formstate.emailer ? <label className="text-red-500">invalid email</label> : ''}
                </div>
                <div className="mb-4">
                  <input
                    type="text"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="exampleFormControlInput1"
                    placeholder="Phone number"
                    name="phone"
                    value={formstate.phone}
                    onChange={(e) => handelchange(e.target.name, e.target.value)}
                  />
                  {formstate.phoneer ? <label className="text-red-500">invalid phone</label> : ''}
                </div>

                <button
                  type="submit"
                  className="flex gap-4 items-center justify-center m-4 p-4 border-b-gray-100 font-bold hover:bg-socialblue hover:text-white hover:scale-110 transition-all"
                >
                  Update
                </button>
              </form>
              {/* <div className="grow text-right">
                <Link
                  to={'/changepass'}
                  className="font-semibold underline text-socialblue"
                >
                  Change password
                </Link>
                  </div>*/}
            </Cards>
          </div>
        </div>
      </Layout>
      <Bottombar />
    </div>
  );
}

export default Setings;
