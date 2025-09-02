import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../../components/userside/Avatar';
import Bottombar from '../../components/userside/botombar/Bottombar';
import Cards from '../../components/userside/Cards';
import Layout from '../../components/userside/Layout';
import Topbar from '../../components/userside/topbar/Topbar';
import axios from '../../Axios';
import { useSelector } from 'react-redux';

function Notification() {
  const logeduser = useSelector((state) => state.auth.userdetails._id);
  const [notifications, setnotifications] = useState([]);
  const updatenotification = async () => {
    const { data } = await axios.patch(
      `/user/updatenotifications/${logeduser}`,
      {},
      { withCredentials: true },
    );
    setnotifications(data.notifications);
  };
  useEffect(() => {
    updatenotification();
  }, []);
  return (
    <>
      <Topbar />
      <Layout>
        <h1 className="text-3xl mb-4 text-gray-400">Notifications</h1>

        <Cards nopading={true}>
          <div>
            {notifications?.map((e) => {
              return (
                <>
                  <div
                    key={e._id}
                    className="flex gap-2 items-center border-b border-b-gray-100 p-4"
                  >
                    <Avatar img={e.propicpath} />
                    <div>
                      <Link
                        className="font-semibold hover:underline"
                        to={`/profile/${e.likeduser}`}
                      >
                        {e.username}
                      </Link>{' '}
                      liked your post
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Cards>
      </Layout>
      <Bottombar />
    </>
  );
}

export default Notification;
