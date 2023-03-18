import React from 'react';

import Adminsidebar from '../../components/adminside/adminsidebar/Adminsidebar';
import Admintopbar from '../../components/adminside/admintopbar/Admintopbar';
import Table from '../../components/adminside/Posttable/Table';

function Postmanagement() {
  return (
    <div>
      <Admintopbar />
      <Adminsidebar>
        <Table />
      </Adminsidebar>
    </div>
  );
}

export default Postmanagement;
