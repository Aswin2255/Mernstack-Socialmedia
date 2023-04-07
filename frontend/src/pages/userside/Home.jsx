import React from 'react';
import Createpost from '../../components/userside/Createpost';
import Layout from '../../components/userside/Layout';
import Post from '../../components/userside/Post';
import Topbar from '../../components/userside/topbar/Topbar';
import Bottombar from '../../components/userside/botombar/Bottombar';

function Home() {
  return (
    <>
      <Topbar />
      <Layout>
        <Createpost />
        <Post />
      </Layout>
      <Bottombar />
    </>
  );
}

export default Home;
