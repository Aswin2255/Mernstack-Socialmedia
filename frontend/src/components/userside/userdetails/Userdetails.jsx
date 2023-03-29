import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import axios from '../../../Axios';
import { AuthActions } from '../../../store/Authslice';
import { Useraction } from '../../../store/Userslice';
import Avatar from '../Avatar';
import Cards from '../Cards';
import Friendlist from '../modals/friendslistmodal/Friendlist';

function Userdetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const logedinuserid = useSelector((state) => state.auth.userdetails._id);
  const [showfmodal, setfmodal] = useState(false);
  
  const showfollowers = (value) => {
    if (Object.keys(User[0].followers).length) {
      setfmodal(value);
    }
  };
  const showfollowing = (value) => {
    if (Object.keys(User[0].following).length) {
      setfmodal(value);
    }
  };

  const setfriends = async (id) => {
    try {
      const { data } = await await axios.patch(
        `/user/addremovefriends/${id}`,
        {},
        { withCredentials: true }
      );
      if (data.status) {
        console.log('----------------------------');
        console.log(data);

        dispatch(Useraction.Getuser(data.updateuser));
      }
    } catch (error) {
      console.log(error.message);
      dispatch(AuthActions.UserLogout());
    }
  };
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`/user/getuser/${id}`, {
          withCredentials: true,
        });
        if (data.status) {
          console.log(data.userdetails);
          
          dispatch(Useraction.Getuser(data.userdetails));
        } else {
          alert('user not verified');
          dispatch(AuthActions.UserLogout());
        }
      } catch (error) {
        alert('unexpected error occcured log in to continue');
        dispatch(AuthActions.UserLogout());
      }
    };
    fetchUser();
  }, [id]); // eslint-disable-next-line
  let location = useLocation();
  let User = useSelector((state) => state.user.userdetails);
  if (User.length) {
    const isfriend = User[0].friends;
    console.log(isfriend);
  }

  return (
    <div>
      <ToastContainer/>
      {User.length ? (
        <div className="flex  w-full items-center mb-4 ">
          <div className="w-full rounded-xl p-12 shadow-2xl shadow-blue-200  bg-white">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="grid-cols-1 lg:col-span-3">
                <Avatar pc={true} img = {User[0].propicpath} />
              </div>

              <div className="col-span-1 lg:col-span-9">
                <div className="text-center lg:text-left m-1">
                  <h2 className="text-2xl font-bold text-zinc-700">
                    {User[0].name}
                  </h2>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-6 text-center lg:text-left m-1">
                  <div style={{display:'none'}}>
                    <p className="font-bold text-zinc-700"></p>
                    <p className="text-sm font-semibold text-zinc-700">Posts</p>
                  </div> 

                  <div
                    className="cursor-pointer"
                    onClick={() => showfollowers('Followers')}
                  >
                    <p className="font-bold text-zinc-700">
                      {Object.keys(User[0].followers).length}
                    </p>
                    <p className="text-sm font-semibold text-zinc-700">
                      Followers
                    </p>
                  </div>

                  <div
                    className="cursor-pointer"
                    onClick={() => showfollowing('Following')}
                  >
                    <p className="font-bold text-zinc-700">
                      {Object.keys(User[0].following).length}
                    </p>
                    <p className="text-sm font-semibold text-zinc-700">
                      Following
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4 m-1">
                  {User[0]._id === logedinuserid ? (
                    <a href={`/setings/${User._id}`}>
                      <button className="w-full rounded-xl text-center border-2 border-blue-500 bg-white px-3 py-2  font-semibold text-blue-500 hover:bg-blue-500 hover:text-white">
                        {' '}
                        Settings
                      </button>
                    </a>
                  ) : (
                    <button
                      onClick={() => setfriends(User[0]._id)}
                      className="w-full rounded-xl border-2 border-blue-500 bg-white px-3 py-2 font-semibold text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      {' '}
                      {User[0].followers[logedinuserid] ? 'unfollow' : 'follow'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1>Loading....</h1>
      )}
      {showfmodal ? (
        <Friendlist show={showfmodal} close={setfmodal} userid={User[0]._id} />
      ) : (
        ''
      )}
    </div>
  );
}

export default Userdetails;
