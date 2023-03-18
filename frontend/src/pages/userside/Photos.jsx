import React from 'react';

import Bottombar from '../../components/userside/botombar/Bottombar';

import Layout from '../../components/userside/Layout';
import Topbar from '../../components/userside/topbar/Topbar';
import Userdetails from '../../components/userside/userdetails/Userdetails';

function Photos() {
  return (
    <div>
      <Topbar />
      <Layout>
        <Userdetails />
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
            <img
              src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="pic"
            ></img>
          </div>
          <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
            <img
              src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="pic"
            ></img>
          </div>
          <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
            <img
              src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="pic"
            ></img>
          </div>
          <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
            <img
              src="https://images.unsplash.com/photo-1601581875039-e899893d520c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
              alt="pic"
            ></img>
          </div>
        </div>
      </Layout>
      <Bottombar />
    </div>
  );
}

export default Photos;
