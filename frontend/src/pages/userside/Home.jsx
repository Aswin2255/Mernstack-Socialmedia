import React, { useEffect, useRef } from 'react';
import Createpost from '../../components/userside/Createpost';
import Layout from '../../components/userside/Layout';
import Post from '../../components/userside/Post';
import { io } from 'socket.io-client';
import Topbar from '../../components/userside/topbar/Topbar';
import Bottombar from '../../components/userside/botombar/Bottombar';


function Home() {
  const socketconect = useRef();
  useEffect(() => {
    socketconect.current = io('ws://localhost:3001');
  }, []);
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
