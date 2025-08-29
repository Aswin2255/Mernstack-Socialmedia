import React from 'react';
import Admindash from '../../components/adminside/admindashboard/Admindash';
import Adminsidebar from '../../components/adminside/adminsidebar/Adminsidebar';
import Admintopbar from '../../components/adminside/admintopbar/Admintopbar';

function Admin() {
  return (
    <div>
      <Admintopbar />
      <Adminsidebar>
        <Admindash />
      </Adminsidebar>
    </div>
  );
}

export default Admin;
