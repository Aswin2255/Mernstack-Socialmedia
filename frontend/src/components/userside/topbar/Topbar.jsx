import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthActions } from '../../../store/Authslice';
import Avatar from '../Avatar';
import Cards from '../Cards';
import './topbar.css';

function Topbar() {
  const ismobile = useMediaQuery({ query: '(max-width:770px)' });
  const [cookies, setcookie, removeCookie] = useCookies();
  const [toggle, settoggle] = useState(false);
  let location = useLocation();
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const activeclase = 'active';
  const nonactiveclase = 'noactive';
  const logedinuser = useSelector((state) => state.auth.userdetails);
  const logout = () => {
    removeCookie('jwt');
    Dispatch(AuthActions.UserLogout());
    Navigate('/login');
  };

  return (
    <>
      <div className="topbar-container bg-socialblue">
        <div className="left">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-6 mr-3 sm:h-9"
            alt="Flowbite Logo"
          ></img>
          <span className="logoname">Connect</span>
        </div>
        {logedinuser.name ? (
          <>
            <div className="middle ">
              <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                />
              </div>
            </div>

            <div className="right flex ">
              <Link to={`/profile/${logedinuser._id}`}>
                <Avatar img={logedinuser.propicpath} />
              </Link>
              <Link to={`/profile/${logedinuser._id}`}>
                <p className="font-semibold cursor-pointer hover:underline ml-3 text-white">
                  {logedinuser.name}
                </p>
              </Link>
            </div>
            <a
              href="#/"
              onClick={() => settoggle(!toggle)}
              className="toggle-button"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </a>
          </>
        ) : (
          ''
        )}
      </div>
      <div className="navbar">
        {ismobile && toggle && (
          <div className="nav-links">
            <Cards>
              <div
                className="friends"
                style={{
                  display: 'flex',
                  margin: '1rem',
                  alignItems: 'center',
                  backgroundColor:
                    location.pathname === '/profile/friends' ? 'blue' : '',
                }}
              ></div>
              <div
                className="alert"
                style={{
                  display: 'flex',
                  margin: '1rem',
                  alignItems: 'center',
                  backgroundColor:
                    location.pathname === '/notifications' ? 'blue' : '',
                }}
              >
                <div style={{ marginRight: '1rem' }}>
                  <Link
                    to={'/notifications'}
                    className={
                      location.pathname === '/notifications'
                        ? activeclase
                        : nonactiveclase
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                      />
                    </svg>
                  </Link>
                </div>
                <div>
                  <p>Alert</p>
                </div>
              </div>
              <div
                className="logout"
                onClick={logout}
                style={{ display: 'flex', margin: '1rem' }}
              >
                <div>
                  <p className="flex gap-2 py-3  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                      />
                    </svg>
                    Logout
                  </p>
                </div>

                <div></div>
              </div>

              <div className="relative mb-2 flex items-center w-full h-12 rounded-lg focus-within:shadow-lg bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>

                <input
                  className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                  type="text"
                  id="search"
                  placeholder="Search something.."
                />
              </div>
            </Cards>
          </div>
        )}
      </div>
    </>
  );
}

export default Topbar;
