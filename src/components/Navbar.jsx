import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const [nav, setNav] = useState(false);
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/user_register';
  const access = localStorage.getItem('access');
  const admin = localStorage.getItem('admin')
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const openNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    localStorage.removeItem('refresh');
    localStorage.removeItem('access');
    localStorage.removeItem('id');
    localStorage.removeItem('user')

    navigate('/login');
    toast.success('Logout Successful');
  };

  return (
    <>
      <nav>
        {/* mobile */}
        <div className={`mobile-navbar ${nav ? 'open-nav' : ''}`}>
          <div onClick={openNav} className="mobile-navbar__close">
            <i className="fa-solid fa-xmark"></i>
          </div>
          <ul className="mobile-navbar__links">
            <li>
              <Link onClick={openNav} to="/">
                Home
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/about">
                About
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/models">
                Models
              </Link>
            </li>
            {/* <li>
              <Link onClick={openNav} to="/testimonials">
                Testimonials
              </Link>
            </li>
            <li>
              <Link onClick={openNav} to="/team">
                Our Team
              </Link>
            </li> */}
            <li>
              <Link onClick={openNav} to="/contact">
                Contact
              </Link>
            </li>
            <li>
            {isLoginPage ? null : (
              <>
                {access ? (
                  <>  
                  <li >
                  <Link className="testi-link" to="">
                    {user  ? <>Hi, {user.username}</> : <></> }
                  </Link>
                  </li>
                  {admin == 'true' && <>
                  <li className='my-8'>
                  <Link className="navbar__buttons__sign-in " to="/AdminDash">  
                  <button>ADMINPANEL</button>
                  </Link>
                  </li>
                  </>}
                  <li className='my-8'>
                    <Link className="navbar__buttons__sign-in " to='/profile' >
                  <i class="fa-solid fa-user m-1"></i>Profile
                  </Link>
                  </li>
                  <li className='my-8'>
                  <button  className="navbar__buttons__sign-in" onClick={handleLogout}>
                    Logout
                  </button >
                  </li>
                  
                  </>

                ) : (
                  <Link to="/login">
                    <button className="navbar__buttons__sign-in">Login</button>
                  </Link>
                )}
              </>
            )}
            {isRegisterPage || access ? null : (
              <li className='my-8'>
              <Link className="navbar__buttons__register" to="/user_register">
                Register
              </Link>
              </li>
            )}
            </li>
          </ul>
          
        </div>

        {/* desktop */}
        <div className="navbar">
          <div className="navbar__img">
            <Link to="/" onClick={() => window.scrollTo(0, 0)} type="button">
              <h1 className="text-4xl font-extrabold mb-8 text-center text-red-500 my-3">PureDrive.</h1>
            </Link>
          </div>
          <ul className="navbar__links">
            <li>
              <Link className="home-link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="about-link" to="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="models-link" to="/models">
                Vehicle Models
              </Link>
            </li>
            <li>
              <Link className="testi-link" 
              to="/news"
              >
                EV News
              </Link>
            </li>
            {/* <li>
              <Link className="team-link" to="/team">
                Our Team
              </Link>
            </li> */}
            <li>
              <Link className="contact-link" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <div className="navbar__buttons">
            {isLoginPage ? null : (
              <>
                {access ? (
                  <>  
                  
                  <Link className="testi-link" to="">
                    {user  ? <>Hi, {user.username}</> : <> </> }
                  </Link>
                  {admin == 'true' && <>
                  <Link className="navbar__buttons__sign-in " to="/AdminDash">  
                  <button>ADMINPANEL</button>
                  </Link>
                  </>}
                  <Link className="navbar__buttons__sign-in " to='/profile' >
                  <i class="fa-solid fa-user m-1"></i>Profile
                  </Link>
                  <button  className="navbar__buttons__sign-in" onClick={handleLogout}>
                    Logout
                  </button >
                  </>

                ) : (
                  <Link to="/login">
                    <button className="navbar__buttons__sign-in">Login</button>
                  </Link>
                )}
              </>
            )}

            {isRegisterPage || access ? null : (
              <Link className="navbar__buttons__register" to="/user_register">
                Register
              </Link>
            )}
          </div>

          {/* mobile */}
          <div className="mobile-hamb" onClick={openNav}>
            <i className="fa-solid fa-bars"></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
