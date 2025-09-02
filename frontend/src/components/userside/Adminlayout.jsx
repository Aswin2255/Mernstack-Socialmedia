import React from 'react';
import Adminsidebar from './adminsidebar/Adminsidebar';

import Admintopbar from './Admintopbar';

function Adminlayout({ children }) {
  return (
    <div>
      <div>
        <Admintopbar />
      </div>
      <div className="md:flex  max-w-3xl  gap-6">
        <div className=" sticky md:w-3/12">
          <Adminsidebar />
        </div>
        <div className="mx-4 md:mx-0 md:w-9/12">{children}</div>
      </div>
    </div>
  );
}

export default Adminlayout;
