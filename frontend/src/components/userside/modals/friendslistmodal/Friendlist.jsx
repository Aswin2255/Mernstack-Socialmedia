import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Friendinfo from '../../../userside/Friendinfo';
import axios from '../../../../Axios';

import Cards from '../../Cards';
import Avatar from '../../Avatar';
import Loader from '../../Loader';
import { ColorRing } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

function Friendlist({ show, close, userid }) {
  const dispatch = useDispatch();
  const [loaders, setloaders] = useState(true);
  const [followers, setfollowers] = useState([]);

  const logedinuser = useSelector((state) => state.auth.userdetails);

  useEffect(() => {
    const fetchFriends = async () => {
      const { data } = await axios.get(`/user/${show}/${userid}`, {
        withCredentials: true,
      });
      console.log(data);
      setfollowers(data.followers);
      setloaders(false);
    };
    fetchFriends();
  }, []);

  return (
    <div>
      <div className="justify-center w-full items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <p className="flex">
            
                {show}
              </p>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => close(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="black"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            {/*body*/}
            {loaders ? (
              <>
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={[
                    '#e15b64',
                    '#f47e60',
                    '#f8b26a',
                    '#abbd81',
                    '#849b87',
                  ]}
                />
              </>
            ) : (
              <>
                <div className="relative p-6  m-3 overflow-y-scroll">
                  {followers.map((e) => {
                    return (
                      <div className="flex justify-between">
                        <>
                          <div className="m-3">
                            <Avatar />
                            </div>
                            <div className='m-3'>
                            <Link onClick={()=>close(false)}
                              to={`/profile/${e._id}`}
                              className="font-semibold cursor-pointer hover:underline"
                            >
                              {e.name}
                            </Link>
                            </div>
                          
                        </>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => close(false)}
              >
                close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default Friendlist;
