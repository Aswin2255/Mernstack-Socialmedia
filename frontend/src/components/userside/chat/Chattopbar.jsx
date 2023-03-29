import React, { useEffect, useState } from 'react';
import axios from '../../../Axios';
import Avatar from '../Avatar';

function Chattopbar({ conversation, currentuser }) {
  const [user, setuser] = useState('');
  useEffect(() => {
    const friendid = conversation.members.find((e) => e !== currentuser);
    const getuser = async () => {
      try {
        const { data } = await axios.get(`/user/getuser/${friendid}`);
        setuser(data.userdetails);
      } catch (error) {
        console.log(error);
      }
    };
    getuser();
  }, [conversation]);

  console.log(conversation);
  return (
    <div className="chatavatar">
      <Avatar img={user[0]?.propicpath} />
      <div className="username">
        <p>{user[0]?.name}</p>
      </div>
    </div>
  );
}

export default Chattopbar;
