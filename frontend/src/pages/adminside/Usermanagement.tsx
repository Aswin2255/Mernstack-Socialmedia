import React from 'react';
import Adminsidebar from '../../components/adminside/adminsidebar/Adminsidebar';
import Admintopbar from '../../components/adminside/admintopbar/Admintopbar';
import Usertable from '../../components/adminside/usertable/Usertable';

function Usermanagement() {
  return (
    <div>
      <Admintopbar />
      <Adminsidebar>
        <Usertable />
      </Adminsidebar>
    </div>
  );
}

export default Usermanagement;
