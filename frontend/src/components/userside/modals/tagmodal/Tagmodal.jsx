import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from '../../../../Axios';
import Avatar from '../../Avatar';
import { AuthActions } from '../../../../store/Authslice';

function Tagmodal({ modal, tagdata }) {
  const [alluser, setalluser] = useState([]);
  const logedinuser = useSelector((state) => state.auth.userdetails);
  const [tagdisabel, setdisabel] = useState(false);
  const dispatch = useDispatch();
  const [taged, setaged] = useState({
    tageduser: [],
    username: [],
  });

  const submittag = () => {
    try {
      tagdata(taged);
      modal(false);
    } catch (error) {}
  };
  const handelchange = (e, name) => {
    const { tageduser, username } = taged;

    if (e.target.checked) {
      if (tageduser.length > 1) {
        setdisabel(true);
        return;
      }
      setaged({
        tageduser: [...tageduser, e.target.value],
        username: [...username, name],
      });
    } else {
      setaged({
        tageduser: tageduser.filter((item) => item !== e.target.value),
        username: username.filter((item) => item !== name),
      });
      setdisabel(false);
    }
  };
  console.log(taged);
  let usertotag;
  const fetchalluser = async () => {
    try {
      const { data } = await axios.get(`/user/Following/${logedinuser._id}`, {
        withCredentials: true,
      });
      if (data.status) {
        usertotag = data.followers.slice(0, 3);
        setalluser(usertotag);
        console.log(data.allusers);
      }
    } catch (error) {
      alert('error ocured');
      dispatch(AuthActions.UserLogout());
    }
  };
  useEffect(() => {
    fetchalluser();
  }, []);
  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden  fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <p className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mr-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
                  </svg>{' '}
                  Tag people
                </p>

                <button
                  onClick={() => modal(false)}
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/*body*/}
              <div className="relative p-6  m-3 overflow-scroll h-1/2 ">
                {alluser.map((user) => {
                  return (
                    <div className="flex justify-between">
                      {user._id !== logedinuser._id ? (
                        <>
                          <div className="m-3">
                            <Avatar img={user.propicpath} />
                          </div>

                          <div className="m-3">
                            <Link
                              to={`/profile/${user._id}`}
                              className="font-semibold cursor-pointer hover:underline"
                            >
                              {user.name}
                            </Link>
                          </div>
                          <div className="grow text-right m-3 p-0.5">
                            <input
                              id="default-checkbox"
                              type="checkbox"
                              value={user._id}
                              onChange={(e) => {
                                handelchange(e, user.name);
                              }}
                              checked={taged.tageduser.includes(user._id) ? true : false}
                              disabled={taged.tageduser.includes(user._id) ? false : tagdisabel}
                              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            ></input>
                          </div>
                        </>
                      ) : (
                        ''
                      )}
                    </div>
                  );
                })}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="bg-socialblue text-white  md:px-6 py-1 rounded-md"
                  type="button"
                  onClick={submittag}
                >
                  Confirm
                </button>
                <button
                  onClick={() => modal(false)}
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        <ToastContainer />
      </>
    </div>
  );
}

export default Tagmodal;
