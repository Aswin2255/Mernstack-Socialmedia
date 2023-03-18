import React from 'react';
import Bottombar from '../../components/userside/botombar/Bottombar';
import Layout from '../../components/userside/Layout';
import Post from '../../components/userside/Post';
import Topbar from '../../components/userside/topbar/Topbar';

function Savedpost() {
  return (
    <div>
      <Topbar />
      <Layout>
        <h1 className="text-3xl mb-4 text-gray-400">Saved posts</h1>
        <Post saved={true} />
      </Layout>
      <Bottombar />
    </div>
  );
}

export default Savedpost;
