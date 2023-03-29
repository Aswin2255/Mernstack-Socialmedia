import React, { useEffect, useRef, useState } from 'react';
import axios from '../../Axios';
import Avatar from './Avatar';

function Messages({ message, own }) {
  const [user,setuser] = useState([])
  useEffect(() => {
    const senderid = message.senderid;
    const getuser = async () => {
      try {
        const { data } = await axios.get(`/user/getuser/${senderid}`);
        setuser(data.userdetails);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [message]);
  
  
  return (
    <>
      {own ? (
        <div>
          <div class="col-start-6 col-end-13 p-3 rounded-lg">
            <div class="flex items-center justify-start flex-row-reverse">
              <div class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                <Avatar img={user[0]?.propicpath} />
              </div>
              <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                <div>{message.text}</div>
                {/* <div class="absolute text-xs bottom-0 right-0 -mb-5 mr-2 text-gray-500">{message.createdAt}</div> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
          <div className="flex flex-row items-center">
          <div class="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                <Avatar img={user[0]?.propicpath} />
              </div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
              <div>{message.text}</div>
            </div>
           
          </div>
        </div>
      )}
    </>
  );
}

export default Messages;
