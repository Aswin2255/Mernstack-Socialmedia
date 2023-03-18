import React, { useEffect, useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../../Axios';
import { AuthActions } from '../../../store/Authslice';
import { Useraction } from '../../../store/Userslice';

function Usertable() {
  const userdata = useSelector((state) => state.user.alluser);

  const blockUnblock = async (id, status) => {
    try {
      const { data } = await await axios.patch(
        `/admin/changestatus/${id}`,
        { status },
        { withCredentials: true }
      );
      if (data.status) {
        dispatch(Useraction.Getalluser(data.userdata));
      } else {
        dispatch(AuthActions.UserLogout());
        alert('unexpected error happen');
      }
    } catch ({ response }) {
      dispatch(AuthActions.UserLogout());
      alert(response.data.msg);
    }
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get('/admin/getalluser', {
          withCredentials: true,
        });
        if (data.status) {
          dispatch(Useraction.Getalluser(data.userdata));
        }
      } catch (error) {
        alert(error.message);
        dispatch(AuthActions.Adminlogout());
      }
    };
    fetchUser();
  }, []);
  return (
    <div className="m-5">
      {userdata.length ? (
        <>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Username
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    change status
                  </th>
                </tr>
              </thead>
              {userdata.map((e) => {
                return (
                  <tbody>
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {e.name}
                      </th>
                      <td className="px-6 py-4">{e.email}</td>
                      <td className="px-6 py-4">{e.phone}</td>
                      <td
                        className={
                          e.status
                            ? 'px-6 py-4 text-green-600'
                            : 'px-6 py-4 text-red-700'
                        }
                      >
                        {e.status ? 'active' : 'block'}
                      </td>
                      <td class="px-6 py-4">
                        <label className="inline-flex relative items-center mr-5 cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={e.status}
                            readOnly
                          />
                          <div
                            onClick={() => {
                              blockUnblock(e._id, e.status);
                            }}
                            className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                          ></div>
                        </label>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </>
      ) : (
        <h1>No user data</h1>
      )}
    </div>
  );
}

export default Usertable;
