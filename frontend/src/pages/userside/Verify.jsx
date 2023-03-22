import React from 'react';
import Avatar from '../../components/userside/Avatar';
import postSlice from '../../store/api/Postapislice';

function Verify() {


  return (
    <div className="flex  w-full items-center ">
    <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200  bg-white">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="grid-cols-1 lg:col-span-3">
         <Avatar pc = {true}/>
        </div>
  
        <div className="col-span-1 lg:col-span-9">
          <div className="text-center lg:text-left m-1">
            <h2 className="text-2xl font-bold text-zinc-700">XYZ User</h2>
          
          </div>
  
          <div className="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left m-1">
            <div>
              <p className="font-bold text-zinc-700">345</p>
              <p className="text-sm font-semibold text-zinc-700">Posts</p>
            </div>
  
            <div>
              <p className="font-bold text-zinc-700">200k</p>
              <p className="text-sm font-semibold text-zinc-700">Followers</p>
            </div>
  
            <div>
              <p className="font-bold text-zinc-700">38</p>
              <p className="text-sm font-semibold text-zinc-700">Following</p>
            </div>
          </div>
  
          <div className="mt-6 grid grid-cols-2 gap-4 m-1">
            <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">Follow</button>
  
            <button className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">View Profile</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Verify;

/*  

  <div className="float-right">
                {User[0]._id === logedinuserid ? (
                  <a href={`/setings/${User._id}`}>
                    <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
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
                          d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </button>
                  </a>
                ) : (
                  <button
                    onClick={() => setfriends(User[0]._id)}
                    class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                  >
                    {User[0].friends[logedinuserid] ? 'friends' : 'Add friend'}
                  </button>
                )}
              </div>
 */