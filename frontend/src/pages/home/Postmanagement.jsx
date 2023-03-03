import React from 'react'

import Adminsidebar from '../../components/appcomponents/adminsidebar/Adminsidebar'
import Admintopbar from '../../components/appcomponents/admintopbar/Admintopbar'
import Table from '../../components/appcomponents/Posttable/Table'




function Postmanagement() {
  return (
    <div>
      <Admintopbar/>
      <Adminsidebar>
        <Table/>
      </Adminsidebar>
   
    </div>
  )
}

export default Postmanagement
