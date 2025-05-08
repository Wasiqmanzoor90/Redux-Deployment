import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import PrivateRoute from './Utils/PrivateRoute'
import Notfound from './Pages/Notfound'

function App() {
  return (
    <div>
<BrowserRouter>
<Routes>
<Route path="/" element={<Login/>} />
<Route path='/register' element={<Register/>}/>
<Route path='/home' element={<PrivateRoute><Home/></PrivateRoute>} />
{/* <Route path='*' element={<Notfound/>} /> */}
</Routes>
</BrowserRouter>


    </div>
  )
}

export default App