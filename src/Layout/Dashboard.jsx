import React from 'react'
import Navbar from '../Pages/Navbar'
import { Outlet } from 'react-router-dom'

function Dashboard() {


  return (
    <div className='d-flex' style={{minHeight:'100vh'}}>
<div style={{width:'250px', backgroundColor: '#f8f9fa'}}>
<Navbar/>
</div>
<div style={{ flex: 1, padding: '20px' }}>
    <Outlet/>
</div>
    </div>
  )
}

export default Dashboard