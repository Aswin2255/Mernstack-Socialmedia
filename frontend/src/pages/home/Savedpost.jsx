import React from 'react'
import Layout from '../../components/appcomponents/Layout'
import Post from '../../components/appcomponents/Post'
import Topbar from '../../components/appcomponents/topbar/Topbar'


function Savedpost() {
  return (
    <div>
      <Topbar/>
      <Layout>
        <h1 className='text-3xl mb-4 text-gray-400'>Saved posts</h1>
        <Post/>
      </Layout>
    </div>
  )
}

export default Savedpost
