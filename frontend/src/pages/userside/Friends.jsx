import React from 'react';

import Bottombar from '../../components/userside/botombar/Bottombar';
import Cards from '../../components/userside/Cards';
import Friendinfo from '../../components/userside/Friendinfo';
import Layout from '../../components/userside/Layout';
import Topbar from '../../components/userside/topbar/Topbar';
import Userdetails from '../../components/userside/userdetails/Userdetails';

function Friends() {
  return (
    <div>
      <Topbar />
      <Layout>
        <Userdetails />
        <div>
          <Cards>
            <h1 className="text-3xl mb-2">Friends</h1>
            <div className="border-b p-4">
              <Friendinfo />
            </div>
            <div className="border-b p-4">
              <Friendinfo />
            </div>
            <div className="border-b p-4">
              <Friendinfo />
            </div>
            <div className="border-b p-4">
              <Friendinfo />
            </div>
          </Cards>
        </div>
      </Layout>
      <Bottombar />
    </div>
  );
}

export default Friends;
