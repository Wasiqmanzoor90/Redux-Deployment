import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Home from './Pages/Home'
import PrivateRoute from './Utils/PrivateRoute'
import Notfound from './Pages/Notfound'
import Dashboard from './Layout/Dashboard'
import Comment from './Pages/comment'


function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route element={<PrivateRoute />}>
                        <Route element={<Dashboard />}>
                            <Route path="/home" element={<Home />} />
                            {/* <Route path="/comment/:id" element={<comment/>} /> */}
                            <Route path='/comment/:id' element={<Comment/>}/>
                        </Route>
                    </Route>
                    <Route path="*" element={<Notfound />} />
                </Routes>
            </BrowserRouter>


        </div>
    )
}

export default App