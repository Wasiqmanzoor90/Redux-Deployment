import React from 'react';
import { useDispatch } from 'react-redux';
import { HandleLogin } from '../Redux/Action/UserAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import screenshot from '../Root/Img/Screenshot (181).png';

function Login() {
  const [form, setForm] = React.useState({
    email: '',
    Password: ''
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const HandleSubmit = (e) => {
    e.preventDefault();
    dispatch(HandleLogin(e, form));
    setForm({ email: '', Password: '' });
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className='me-5'>
        <img src={screenshot} alt="Login" style={{ width: '600px' }} />
      </div>
      <div>
        <div className='text-center mb-3'>
          <span
            style={{
              fontFamily: '"Poppins", sans-serif',
              fontSize: '28px',
              fontWeight: '400',
              lineHeight: '32px',
              color: 'rgb(38, 38, 38)',
            }}
          >
            Instagram
          </span>
        </div>
        <div className="container p-lg-5">
          <div className="row">
            <div className="col-md-12">
              <form onSubmit={HandleSubmit}>
                <div className="form-group mb-3">
                  <input
                    placeholder='Phone number, username, or email'
                    type="email"
                    name="email"
                    className="form-control"
                    style={{ backgroundColor: '#f0f0f0', fontSize: '0.8rem', width: '280px' }}
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    placeholder='Password'
                    type="password"
                    name="Password"
                    className="form-control"
                    style={{ backgroundColor: '#f0f0f0', fontSize: '0.8rem' }}
                    value={form.Password}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  style={{ opacity: '0.8' }}
                >
                  Login
                </button>
              </form>

              <div className="text-center my-3">
                <hr style={{ width: '40%', display: 'inline-block', margin: '0 10px' }} />
                <span>or</span>
                <hr style={{ width: '40%', display: 'inline-block', margin: '0 10px' }} />
              </div>

              <div className="d-flex justify-content-center mb-3">
                <FontAwesomeIcon icon={faFacebookF} style={{ color: "#5F9BF7", fontSize: '1rem', marginRight: '10px' }} />
                <a style={{ textDecoration: 'none', fontWeight: '500', opacity: '0.8' }} href="#">
                  Login with Facebook
                </a>
              </div>

              <div className='text-center mt-4'>
                <a style={{ textDecoration: 'none', color: 'black' }} href="#">
                  Forget Password?
                </a>
              </div>

              <div className='mt-5 text-center'>
                <p>
                  Don't you have an account?{' '}
                  <Link to='/Register' style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>
                    Sign up
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
