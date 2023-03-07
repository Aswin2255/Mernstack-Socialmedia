import React from 'react'
import Bottombar from '../../components/appcomponents/botombar/Bottombar'
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
      <Bottombar/>
    </div>
  )
}

export default Savedpost
