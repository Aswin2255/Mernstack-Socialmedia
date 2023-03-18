import React from 'react';

import { useParams } from 'react-router-dom';

import Bottombar from '../../components/userside/botombar/Bottombar';

import Layout from '../../components/userside/Layout';
import Post from '../../components/userside/Post';
import Topbar from '../../components/userside/topbar/Topbar';
import Userdetails from '../../components/userside/userdetails/Userdetails';

function Profile() {
  const { id } = useParams();

  return (
    <div>
      <Topbar />
      <Layout>
        <Userdetails />
        <Post profile={id} />
      </Layout>
      <Bottombar />
    </div>
  );
}

export default Profile;
