import React from 'react'
import { useDispatch } from 'react-redux'
import { HandleLogin } from '../Redux/Action/UserAction';

function Login() {
const [form, setForm] = React.useState({
  email:'',
  Password:''
})
 
const dispatch = useDispatch();
const handleChange =(e)=>{
setForm({...form, [e.target.name]:e.target.value})
}
const HandleSubmit=(e)=>{
  e.preventDefault()
dispatch(HandleLogin(e, form))
setForm({email:'', Password:''})
}

  return (
    <div className='container w-25 mt-5 p-5' style={{border:'1px solid lightgrey'}}>
       <h1>Log in</h1>
       <form onSubmit={(e)=>{
        HandleSubmit(e)
       }} >
       
          <div className="form-group mb-3">
            <input
              placeholder="Enter Email"
              style={{ backgroundColor: '#f0f0f0', fontSize: '0.8rem' }}
              type="text"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group mb-3">
            <input
              style={{ backgroundColor: '#f0f0f0', fontSize: '0.8rem' }}
              placeholder="Password"
              type="Password"
              className="form-control"
              name="Password"
              value={form.Password}
              onChange={handleChange}
            />
            <p className="my-3" style={{ fontSize: '0.8rem', opacity: '0.8' }}>
              People who use our service may have uploaded your contact information to Instagram.
              <a style={{ textDecoration: 'none' }} href="#"> Learn More</a>
            </p>
            <p style={{ fontSize: '0.8rem', opacity: '0.8' }}>
              By signing up, you agree to our Terms,
              <a style={{ textDecoration: 'none' }} href="#"> Privacy Policy and Cookies Policy</a>
            </p>
          </div>
          <button style={{ opacity: '0.8' }} type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>
    </div>
  )
}

export default Login