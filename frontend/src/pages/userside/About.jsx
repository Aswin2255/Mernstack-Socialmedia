import React from 'react';
import Bottombar from '../../components/userside/botombar/Bottombar';
import Cards from '../../components/userside/Cards';
import Layout from '../../components/userside/Layout';
import Topbar from '../../components/userside/topbar/Topbar';
import Userdetails from '../../components/userside/userdetails/Userdetails';

function About() {
  return (
    <div>
      <Topbar />
      <Layout>
        <Userdetails />

        <div>
          <Cards>
            <h1 className="text-3xl mb-2">About me</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus possimus sint odit consequuntur ipsa officiis, in
              quas labore cumque aliquam magnam at, aperiam fuga, sapiente
              suscipit magni praesentium assumenda accusamus!
            </p>
          </Cards>
        </div>
      </Layout>
      <Bottombar />
    </div>
  );
}

export default About;
