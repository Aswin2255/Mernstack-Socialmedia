import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../Axios';
import { AuthActions } from '../../../store/Authslice';
import Avatar from '../Avatar';

function Chatsearch({ currentchat }) {
  const [fetcheduser, setfetcheduser] = useState([]);
  const [searchvalues, setsearch] = useState('');
  const [searchresult, setsearchresult] = useState([]);
  const logedinuser = useSelector((state) => state.auth.userdetails._id);
  const dispatch = useDispatch()
  useEffect(() => {
    // this will fetch the users
    const getusers = async () => {
      const { data } = await axios.get('/user/alluser', {
        withCredentials: true,
      });
      setfetcheduser(data.allusers);
    };
    getusers();
  }, []);
  const handelchange = async (e) => {
    try {
      setsearch(e.target.value);
      if (e.target.value !== '') {
        const result = fetcheduser.filter(
          (event) =>
            event.name.includes(e.target.value) && event._id !== logedinuser
        );

        setsearchresult(result);
      } else {
        setsearchresult([]);
      }
    } catch (error) {
        dispatch(AuthActions.UserLogout())
        alert('unexpected error ocured')
    }
  };
  const handelclick = async (users) => {
    try {
      const { data } = await axios.get(`chat/getchat/${users._id}`);
      currentchat(...data.chat);
      setsearch('');
      setsearchresult('')
    } catch (error) {

    }
  };
  return (
    <div>
      <div className="chatsearch m-1">
        <form>
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only text-white"
          >
            Search
          </label>
          <div className="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-gray-500 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              onChange={handelchange}
              type="search"
              id="default-search"
              class="block w-full p-4 pl-10 text-sm text--900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              required
              value={searchvalues}
            ></input>
          </div>
        </form>
        <div className="results fixed " style={{ width: '34%' }}>
          {searchresult.length ? (
            <>
              {searchresult.map((e) => {
                return (
                  <ul
                    onClick={() => handelclick(e)}
                    class="bg-white border border-gray-100 w-full mt-2 p-4"
                  >
                    <li class="pl-8 pr-2 py-1 border-b-2 border-gray-100 relative cursor-pointer hover:bg-yellow-50 hover:text-gray-900">
                      <div className="stroke-current absolute w-4 h-4 left-2 top-2">
                        <Avatar img={e.propicpath} />
                      </div>
                      <b className="ml-8">{e.name}</b>
                    </li>
                  </ul>
                );
              })}
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default Chatsearch;
