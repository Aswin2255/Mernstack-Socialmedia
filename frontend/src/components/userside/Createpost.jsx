import React, { useRef } from 'react';

import { useState } from 'react';

import { ProgressBar } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../Axios';
import { postaction } from '../../store/Postslice';
import { AuthActions } from '../../store/Authslice';
import { ToastContainer, toast } from 'react-toastify';

import Avatar from './Avatar';
import Cards from './Cards';
import { Link } from 'react-router-dom';

function Createpost() {
  const dispatch = useDispatch();
  const fileref = useRef(null);
  const [image, setimage] = useState('');
  const [caption, setcaption] = useState('');
  const [loading, setloading] = useState(false);
  const logedinuser = useSelector((state) => state.auth.userdetails._id);
  const [viewimage, setviewimage] = useState('');
  const handelchange = (e) => {
    console.log('trigered');
    e.preventDefault();
    console.log(e.target.files[0]);
    setimage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setviewimage(url);
  };

  const handelsubmit = async (e) => {
    try {
      setloading(true);
      e.preventDefault();
      if (image || caption) {
        const formdata = new FormData();
        formdata.append('image', image);
        formdata.append('caption', caption);
        const { data } = await axios.post(
          '/post/createpost',
          formdata,

          { headers: { 'content-type': 'multipart/form-data' } },
          { withCredentials: true }
        );
        if (data.status) {
          setimage('');
          setcaption('');
          dispatch(postaction.Addnewpost(data.post));
          generatesucess('post created succefully');
          setloading(false);
        } else {
          generateerror('log in again');
          dispatch(AuthActions.UserLogout());
          setloading(false);
        }
        console.log('refrdsk');
        console.log(data);
      } else {
        alert('some error occured');
      }
    } catch (error) {
      generateerror('unexpected error');
      dispatch(AuthActions.UserLogout());
    }
  };
  const resetfile = () => {
    setimage('');
    setviewimage('');
    fileref.current.value = null;
  };
  const generateerror = (err) => {
    toast.error(err, {
      position: 'top-center',
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
      {loading ? (
        <div className="flex gap-3 items-center">
          <ProgressBar
            height="80"
            width="100"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass="progress-bar-wrapper"
            borderColor="#F4442E"
            barColor="#51E5FF"
          />
        </div>
      ) : (
        <Cards>
          <div className="flex gap-3 items-center">
            <div>
              <Link to={`/profile/${logedinuser}`}>
                <Avatar />
              </Link>
            </div>

            <textarea
              className="grow p-3 h-14"
              onChange={(e) => setcaption(e.target.value)}
              value={caption}
              placeholder={`whats on your mind.`}
            />
          </div>

          {image ? (
            <div className="relative p-6 flex-auto">
              <div className="float-right" onClick={resetfile}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="rounded-md overflow-hidden  flex items-center shadow-md">
                <img src={viewimage} alt="post"></img>
              </div>

              <div></div>
            </div>
          ) : (
            ''
          )}

          <div className="flex gap-5 items-center mt-2">
            <div>
              <button className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                  />
                </svg>
                People
              </button>
            </div>
            <div>
              <button className="flex gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Checkin
              </button>
            </div>
            <div>
              <input
                type="file"
                ref={fileref}
                id="file upload"
                style={{ display: 'none' }}
                onChange={handelchange}
              ></input>
              <label htmlFor="file upload">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
              </label>
            </div>
            <div></div>
            <div className="grow text-right">
              <button
                disabled={image || caption ? false : true}
                className={
                  image || caption
                    ? 'bg-socialblue text-white  md:px-6 py-1 rounded-md '
                    : 'bg-blue-400  text-white  md:px-6 py-1 rounded-md opacity-50 '
                }
                onClick={handelsubmit}
              >
                Share
              </button>
            </div>
          </div>
        </Cards>
      )}
    </div>
  );
}

export default Createpost;
