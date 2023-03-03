import React from 'react'
import Admindash from '../../components/appcomponents/admindashboard/Admindash'
import Adminsidebar from '../../components/appcomponents/adminsidebar/Adminsidebar'

import Admintopbar from '../../components/appcomponents/admintopbar/Admintopbar'


function Admin() {
  return (
    <div>
     <Admintopbar/>
     <Adminsidebar>
     <Admindash/>
     </Adminsidebar>
    
     
    </div>
  )
}

export default Admin

