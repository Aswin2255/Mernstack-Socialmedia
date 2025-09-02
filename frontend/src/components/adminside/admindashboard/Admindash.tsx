import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from '../../../Axios';
import { AuthActions } from '../../../store/Authslice';

import './admindash.css';

function Admindash() {
  const [postcount, setpostcount] = useState(0);
  const [usercount, setusercount] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const { data } = await axios.get('/admin/getallcount', {
          withCredentials: true,
        });
        if (data.status) {
          setpostcount(data.postcount);
          setusercount(data.usercount);
        } else {
          dispatch(AuthActions.Adminlogout());
          alert('unexpected error occured');
        }
      } catch (error) {
        dispatch(AuthActions.Adminlogout());
        alert(error.message);
      }
    };
    fetchCount();
  }, []);
  return (
    <div className="dashboard-container">
      <div className="dashboard-heading">
        <h1 className="text-6xl mb-4  text-gray-400  text-center justify-center m-5">Dashboard</h1>
      </div>
      <div className="dashboard-card m-5">
        <div className="container mx-auto px-20">
          <div className="flex flex-col w-full">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
              <div className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full">
                <a
                  aria-label="Unsplash Downloads"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://stackdiary.com/"
                >
                  <div className="flex items-center text-gray-900 dark:text-gray-100">
                    Users
                    <svg
                      className="h-4 w-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </div>
                </a>
                <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
                  {usercount}
                </p>
              </div>
              <div className="metric-card bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-4 max-w-72 w-full">
                <a
                  aria-label="Unsplash Views"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://stackdiary.com/"
                >
                  <div className="flex items-center text-gray-900 dark:text-gray-100">
                    Post
                    <svg
                      className="h-4 w-4 ml-1"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      ></path>
                    </svg>
                  </div>
                </a>
                <p className="mt-2 text-3xl font-bold spacing-sm text-black dark:text-white">
                  {postcount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admindash;
