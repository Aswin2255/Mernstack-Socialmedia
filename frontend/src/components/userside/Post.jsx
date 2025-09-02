import React, { useEffect, useReducer } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from '../../Axios';

import { postaction } from '../../store/Postslice';
import { AuthActions } from '../../store/Authslice';
import Avatar from './Avatar';
import Cards from './Cards';
import Modaledit from './modals/editmodal/Modaledit';
import Confirmmodal from './modals/confirmmodal/Confirmmodal';
import Reportmodal from './modals/reportmodal/Reportmodal';
import Loader from './Loader';
import { format } from 'timeago.js';

function Post({ profile, saved }) {
  // this props contain the specfic user id for viewing the userprofile

  // state for dropdown
  const initialdropdownstate = {};
  // this is to set initiallikestate
  const initiallikestate = {};
  // state for show comment
  const initialshowcomment = {};

  const dispatch = useDispatch();
  // to display loading component when data is fetching
  const [loading, setloading] = useState(true);
  //to get the id of logged in user
  const userid = useSelector((state) => state.auth.userdetails._id);
  const Username = useSelector((state) => state.auth.userdetails.name);
  const propicpath = useSelector((state) => state.auth.userdetails.propicpath);
  console.log(propicpath);
  // this will fetch all post from the postslice
  const Postdata = useSelector((state) => state.post.allpost);
  // this will fetch userpost if any if we are on users time line
  const Userpost = useSelector((state) => state.post.userpost);

  // to open and close modal
  const [showmodal, setshowmodal] = useState(false);
  // this to set editpost is
  const [editpostid, seteditpostid] = useState('');

  const [delmsg, setdelmsg] = useState(false);
  const [delpostid, setdelpostid] = useState('');

  const [reportmodal, setreportmodal] = useState(false);
  const [reportid, setreportid] = useState('');

  const report = async (postid) => {
    try {
      console.log(postid);
      setreportmodal(true);
      setreportid(postid);
      dis({
        type: 'dropdown',
        field: null,
        value: null,
      });
    } catch (error) {}
  };

  const savepost = async (postid) => {
    try {
      console.log('clicked');
      const { data } = await axios.patch(`/post/savepost/${postid}`, {
        withCredentials: true,
      });
      if (data.status) {
        let userpost = data.updatedpost.filter((e) => e.userid === profile);
        dispatch(postaction.Getallpost(data.updatedpost));
        dispatch(postaction.Getuserpost(userpost));
      }
    } catch (error) {
      alert(error.message);
      dispatch(AuthActions.UserLogout());
    }
  };

  const manageModal = (postid) => {
    console.log(postid);
    setshowmodal(true);
    seteditpostid(postid);
  };
  // api call to delete a post

  const delpost = async (postid) => {
    try {
      setdelmsg(true);
      setdelpostid(postid);
      console.log(editpostid);
    } catch (error) {
      alert(error.message);
      dispatch(AuthActions.UserLogout());
    }
  };

  if (profile) {
    // this will set the liked state for the users time line
    Userpost.forEach((e) => {
      initiallikestate[e._id] = e.likes[userid];
    });
  } else {
    // this will set the liked state for the home page
    Postdata.forEach((e) => {
      initiallikestate[e._id] = e.likes[userid];
    });
  }

  // setting initial state for dropdown menu

  Postdata.forEach((e) => {
    initialdropdownstate[e._id] = false;
  });

  //managing the dropdown state (dropdown state logic)
  const formreducer = (state, action) => {
    switch (action.type) {
      case 'dropdown':
        return {
          [action.field]: !action.value,
        };

      default:
        break;
    }
  };
  // managing the like state (like state logic)
  const likereducer = (state, action) => {
    switch (action.type) {
      case 'like':
        return {
          ...state,
          [action.field]: !action.value,
        };

      default:
        break;
    }
  };

  useEffect(() => {
    console.log('refreshed');
    const FetchallPost = async () => {
      try {
        // all post are fetched from backend and store in post state redux
        const { data } = await axios.get('/post/getpost', {
          withCredentials: true,
        });
        console.log(data);
        if (data.status) {
          console.log(data.post);
          dispatch(postaction.Getallpost(data.post));
          setloading(false);
        } else {
          // when the jwt is expired user is log outt
          alert('error happend');
          setloading(false);
          dispatch(AuthActions.UserLogout());
        }
      } catch (error) {
        console.log(error);
        // any other error happends like no jwt user is log outt
        alert('error happend');
        setloading(false);
        dispatch(AuthActions.UserLogout());
      }
    };
    const Fetchuserpost = async () => {
      try {
        const { data } = await axios.get(`/post/userpost/${profile}`, {
          withCredentials: true,
        });

        if (data.status) {
          dispatch(postaction.Getuserpost(data.userpost));
          setloading(false);
        } else {
          // when the jwt is expired user is log outt
          alert('error happend');
          setloading(false);
          dispatch(AuthActions.UserLogout());
        }
      } catch (error) {}
    };
    FetchallPost();
    if (profile) {
      Fetchuserpost();
    }
  }, [profile]); //eslint-disable-line
  const showcreducer = (state, action) => {
    switch (action.type) {
      case 'showcomment':
        return {
          [action.field]: action.value,
        };

      default:
        break;
    }
  };
  const showc = (id) => {
    const value = showcomment[id];
    dis3({
      type: 'showcomment',
      field: id,
      value: !value,
    });
  };

  // form reducer for dropdown state
  const [dropstate, dis] = useReducer(formreducer, initialdropdownstate);
  const [likestate, dis2] = useReducer(likereducer, initiallikestate);
  const [showcomment, dis3] = useReducer(showcreducer, initialshowcomment);

  const handeldropdown = (id, state) => {
    console.log('uigwc');
    console.log(state);
    let value = state[id];
    console.log(value);
    dis({
      type: 'dropdown',
      field: id,
      value: value,
    });
  };
  const postcomment = async (newcoment, id, username, propicpath) => {
    console.log('helowww');
    console.log(propicpath);
    console.log(id);
    const { data } = await axios.patch(
      `post/comment/${id}`,
      { newcoment, username, propicpath },
      { withCredentials: true },
    );
    if (profile) {
      let userpost = data.updatedpost.filter((e) => e.userid === profile);
      dispatch(postaction.Getuserpost(userpost));
    }
    dispatch(postaction.Getallpost(data.updatedpost));
  };

  const likepost = async (postid, userid, state) => {
    let value = state[postid];

    try {
      dis2({
        type: 'like',
        field: postid,
        value: value,
      });
      const { data } = await axios.patch(`/post/like/${postid}`);

      if (profile) {
        let userpost = data.updatedpost.filter((e) => e.userid === profile);
        dispatch(postaction.Getuserpost(userpost));
      }
      dispatch(postaction.Getallpost(data.updatedpost));
    } catch (error) {
      alert('unexpectd error occured');
      dispatch(AuthActions.UserLogout());
    }
  };
  const Postcomponet = () => {
    if (profile) {
      // if there is userid is passed  then we are at the profile page of the user so the  the post component will only  display userpost not all post
      const Content = loading ? (
        <Loader />
      ) : (
        Userpost.slice(0)
          .reverse()
          .map((e) => {
            return (
              <Cards key={e._id}>
                <div className="flex gap-3">
                  <div>
                    <Link to={'/profile'}>
                      <Avatar img={e.userpicturepath} />
                    </Link>
                  </div>
                  <div className="grow">
                    <p>
                      <Link
                        to={`/profile/${e.userid}`}
                        className="font-semibold cursor-pointer hover:underline"
                      >
                        {e.name}{' '}
                      </Link>
                      shared a{' '}
                      <Link to={`/profile/${e.userid}`} className="text-socialblue">
                        Post
                      </Link>
                    </p>
                    <p className="text-gray-500 text-sm m-1 ">{format(e.createdAt)}</p>
                    {e.taggeduser.length ? (
                      <div className="flex">
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
                            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6h.008v.008H6V6z"
                          />
                        </svg>
                        {e.taggeduser.map((e) => {
                          return (
                            <Link to={`/profile/${e._id}`} className="text-socialblue text-sm m-2">
                              {e.name}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    {!saved ? (
                      <button
                        className="text-gray-400"
                        onClick={() => handeldropdown(e._id, dropstate)}
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
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </button>
                    ) : (
                      ''
                    )}
                    <div className="relative">
                      {dropstate[e._id] && (
                        <div
                          key={e._id}
                          className="absolute -right-6 bg-white shadow-gray-300 p-3 rounded-sm border border-gray-300 w-52"
                        >
                          <p
                            onClick={() => {
                              savepost(e._id);
                            }}
                            className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
                          >
                            {e.saved[userid] ? (
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
                                  d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                                />
                              </svg>
                            ) : (
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
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                              </svg>
                            )}

                            {e.saved[userid] ? 'unsavepost' : 'savepost'}
                          </p>
                          {userid === e.userid ? (
                            <p
                              href="#"
                              onClick={() => manageModal(e._id)}
                              className="flex py-2 px-2 gap-2 cursor-pointer  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110"
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
                              Edit post
                            </p>
                          ) : (
                            ''
                          )}

                          {userid === e.userid ? (
                            <p
                              onClick={() => {
                                delpost(e._id);
                              }}
                              className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              Delete
                            </p>
                          ) : (
                            ''
                          )}

                          {userid !== e.userid ? (
                            <p
                              onClick={() => report(e._id)}
                              className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                              </svg>
                              Report
                            </p>
                          ) : (
                            ''
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {e.description ? (
                    <p className="my-3 text-sm ">{e.description}</p>
                  ) : (
                    <p className="my-3 text-sm "></p>
                  )}

                  <div className="rounded-md overflow-hidden">
                    {e.picturepath ? (
                      <img src={`/assets/${e.picturepath}`} alt="postimg"></img>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="mt-5 flex gap-8">
                  <button
                    onClick={() => likepost(e._id, userid, likestate)}
                    className="flex gap-2 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={e.likes[userid] || likestate[userid] ? 'red' : 'none'}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    {Object.keys(e.likes).length}
                  </button>
                  <button onClick={() => showc(e._id)} className="flex gap-2 items-center">
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
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    {e.comments.length}
                  </button>
                </div>
                {showcomment[e._id] ? (
                  <>
                    <div className="flex mt-4 gap-3 ">
                      <div>
                        <Avatar img={propicpath} />
                      </div>
                      <div className="border grow rounded-full relative  ">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            if (event.target[0].value) {
                              postcomment(event.target[0].value, e._id, Username, propicpath);
                            }
                          }}
                        >
                          <textarea
                            className=" block w-full p-3 overflow-hidden px-4 h-12 "
                            placeholder="Leave a comment."
                          ></textarea>
                          <button type="submit" className="absolute right-3 top-3 text-gray-400 ">
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
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                              />
                            </svg>
                          </button>
                        </form>
                      </div>
                    </div>
                    {e.comments.length ? (
                      <div className="overflow-scroll  max-h-80">
                        {e.comments
                          ? e.comments
                              .slice(0)
                              .reverse()
                              .map((data) => {
                                return (
                                  <div
                                    key={e.comments._id}
                                    className="flex-col  w-full py-4  mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm "
                                  >
                                    <div className="flex flex-row md-10 w-full">
                                      <Link to={`/profile/${data.userid}`}>
                                        <Avatar img={data.propicpath} />
                                      </Link>
                                      <div className="flex-col mt-1">
                                        <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                                          <Link to={`/profile/${data.userid}`}>
                                            <p className="font-semibold cursor-pointer hover:underline">
                                              {data.username}
                                            </p>
                                          </Link>
                                          {/*
                                        <span className="ml-2 text-xs font-normal text-gray-500">
                                          3 days ago
                                        </span>
                              */}
                                          {/*
                                        <button
                                          className="text-dark-400 ml-3"
                                          onClick={() =>
                                            handeldropdown(e._id, dropstate)
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
                                              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                            />
                                          </svg>
                                        </button>
                                        */}
                                        </div>
                                        <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                          {data.comment}
                                        </div>
                                        {/*
                                      <button className="inline-flex items-center px-1 m-1 -ml-1 flex-column">
                                        <svg
                                          className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                          ></path>
                                        </svg>
                                        2
                                      </button>
                                        */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                          : ''}
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
              </Cards>
            );
          })
      );
      return Content;
    } else if (saved) {
      // if there is no user id passed it means that we are in home page and it will render all the post inside the database
      const Content = loading ? (
        <Loader />
      ) : (
        Postdata.map((e) => {
          return (
            <>
              {e.saved[userid] ? (
                <Cards key={e._id}>
                  <div className="flex gap-3">
                    <div>
                      <Link to={`/profile/${e.userid}`}>
                        <Avatar img={e.userpicturepath} />
                      </Link>
                    </div>
                    <div className="grow">
                      <p>
                        <Link
                          to={`/profile/${e.userid}`}
                          className="font-semibold cursor-pointer hover:underline"
                        >
                          {e.name}{' '}
                        </Link>
                        shared a{' '}
                        <Link to={`/profile/${e.userid}`} className="text-socialblue">
                          Post
                        </Link>
                      </p>
                      <p className="text-gray-500 text-sm m-1 ">{format(e.createdAt)}</p>

                      {e.taggeduser.length ? (
                        <div className="flex">
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
                              d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 6h.008v.008H6V6z"
                            />
                          </svg>
                          {e.taggeduser.map((e) => {
                            return (
                              <Link
                                to={`/profile/${e._id}`}
                                className="text-socialblue text-sm m-2"
                              >
                                {e.name}
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                    <div>
                      {!saved ? (
                        <button
                          className="text-gray-400"
                          onClick={() => handeldropdown(e._id, dropstate)}
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
                              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                        </button>
                      ) : (
                        ''
                      )}
                      <div className="relative">
                        {dropstate[e._id] && (
                          <div
                            key={e._id}
                            className="absolute -right-6 bg-white shadow-gray-300 p-3 rounded-sm border border-gray-300 w-52 z-20"
                          >
                            <p
                              onClick={() => {
                                savepost(e._id);
                              }}
                              className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
                            >
                              {e.saved[userid] ? (
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
                                    d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                                  />
                                </svg>
                              ) : (
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
                                    d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                  />
                                </svg>
                              )}
                              {e.saved[userid] ? 'unsavepost' : 'savepost'}
                            </p>
                            {userid === e.userid ? (
                              <p
                                onClick={() => manageModal(e._id)}
                                className="flex py-2 px-2 gap-2 cursor-pointer  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110"
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  />
                                </svg>
                                Edit post
                              </p>
                            ) : (
                              ''
                            )}

                            {userid === e.userid ? (
                              <p
                                onClick={() => {
                                  delpost(e._id);
                                }}
                                className="flex py-2 px-2 gap-2   hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  />
                                </svg>
                                Delete
                              </p>
                            ) : (
                              ''
                            )}

                            {userid !== e.userid ? (
                              <p
                                onClick={() => report(e._id)}
                                className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth={1.5}
                                  stroke="currentColor"
                                  className="w-6 h-6 cursor-pointer"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                  />
                                </svg>
                                Report
                              </p>
                            ) : (
                              ''
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    {e.description ? (
                      <p className="my-3 text-sm ">{e.description}</p>
                    ) : (
                      <p className="my-3 text-sm "></p>
                    )}

                    <div className="rounded-md overflow-hidden">
                      {e.picturepath ? (
                        <img src={`/assets/${e.picturepath}`} alt="postimg"></img>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="mt-5 flex gap-8">
                    <button
                      onClick={() => likepost(e._id, userid, likestate)}
                      className="flex gap-2 items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={e.likes[userid] ? 'red' : 'none'}
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                      {Object.keys(e.likes).length}
                    </button>
                    <button onClick={() => showc(e._id)} className="flex gap-2 items-center">
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
                          d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>

                      {e.comments.length}
                    </button>
                  </div>
                  {showcomment[e._id] ? (
                    <>
                      <div className="flex mt-4 gap-3 ">
                        <div>
                          <Avatar img={propicpath} />
                        </div>
                        <div className="border grow rounded-full relative  ">
                          <form
                            onSubmit={(event) => {
                              event.preventDefault();
                              if (event.target[0].value) {
                                postcomment(event.target[0].value, e._id, Username, propicpath);
                              }
                            }}
                          >
                            <textarea
                              className=" block w-full p-3 overflow-hidden px-4 h-12 "
                              placeholder="Leave a comment."
                            ></textarea>
                            <button type="submit" className="absolute right-3 top-3 text-gray-400 ">
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
                                  d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                              </svg>
                            </button>
                          </form>
                        </div>
                      </div>
                      {e.comments.length ? (
                        <div className="overflow-scroll  max-h-80">
                          {e.comments
                            ? e.comments
                                .slice(0)
                                .reverse()
                                .map((data) => {
                                  return (
                                    <div
                                      key={e.comments._id}
                                      className="flex-col  w-full py-4  mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm "
                                    >
                                      <div className="flex flex-row md-10 w-full">
                                        <Link to={`/profile/${data.userid}`}>
                                          <Avatar img={data.propicpath} />
                                        </Link>
                                        <div className="flex-col mt-1">
                                          <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                                            <Link to={`/profile/${data.userid}`}>
                                              <p className="font-semibold cursor-pointer hover:underline">
                                                {data.username}
                                              </p>
                                            </Link>
                                            {/*
                                            <span className="ml-2 text-xs font-normal text-gray-500">
                                              3 days ago
                                            </span>
                                  */}
                                            {/* <button
                                              className="text-dark-400 ml-3"
                                              onClick={() =>
                                                handeldropdown(e._id, dropstate)
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
                                                  d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                                />
                                              </svg>
                                            </button>
                                            */}
                                          </div>
                                          <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                            {data.comment}
                                          </div>

                                          <button className="inline-flex items-center px-1 m-1 -ml-1 flex-column">
                                            <svg
                                              className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                                              fill="none"
                                              stroke="currentColor"
                                              viewBox="0 0 24 24"
                                              xmlns="http://www.w3.org/2000/svg"
                                            >
                                              <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                stroke-width="2"
                                                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                              ></path>
                                            </svg>
                                            2
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })
                            : ''}
                        </div>
                      ) : (
                        ''
                      )}
                    </>
                  ) : (
                    ''
                  )}
                </Cards>
              ) : (
                ''
              )}
            </>
          );
        })
      );

      return Content;
    } else {
      // if there is no user id passed it means that we are in home page and it will render all the post inside the database
      const Content = loading ? (
        <Loader />
      ) : (
        Postdata.slice(0)
          .reverse(0)
          .map((e) => {
            return (
              <Cards key={e._id}>
                <div className="flex gap-3">
                  <div>
                    <Link to={`/profile/${e.userid}`}>
                      <Avatar img={e.userpicturepath} />
                    </Link>
                  </div>
                  <div className="grow">
                    <p>
                      <Link
                        to={`/profile/${e.userid}`}
                        className="font-semibold cursor-pointer hover:underline"
                      >
                        {e.name}{' '}
                      </Link>
                      shared a{' '}
                      <Link to={`/profile/${e.userid}`} className="text-socialblue">
                        Post
                      </Link>
                    </p>
                    <p className="text-gray-500 text-sm m-1 ">{format(e.createdAt)}</p>
                    {e.taggeduser.length ? (
                      <div className="flex">
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
                            d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 6h.008v.008H6V6z"
                          />
                        </svg>
                        {e.taggeduser.map((e) => {
                          return (
                            <Link to={`/profile/${e._id}`} className="text-socialblue text-sm m-2">
                              {e.name}
                            </Link>
                          );
                        })}
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                  <div>
                    {!saved ? (
                      <button
                        className="text-gray-400"
                        onClick={() => handeldropdown(e._id, dropstate)}
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
                            d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                          />
                        </svg>
                      </button>
                    ) : (
                      ''
                    )}
                    <div className="relative">
                      {dropstate[e._id] && (
                        <div
                          key={e._id}
                          className="absolute -right-6 bg-white shadow-gray-300 p-3 rounded-sm border border-gray-300 w-52 z-20"
                        >
                          <p
                            onClick={() => {
                              savepost(e._id);
                            }}
                            className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
                          >
                            {e.saved[userid] ? (
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
                                  d="M3 3l1.664 1.664M21 21l-1.5-1.5m-5.485-1.242L12 17.25 4.5 21V8.742m.164-4.078a2.15 2.15 0 011.743-1.342 48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185V19.5M4.664 4.664L19.5 19.5"
                                />
                              </svg>
                            ) : (
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
                                  d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"
                                />
                              </svg>
                            )}
                            {e.saved[userid] ? 'unsavepost' : 'savepost'}
                          </p>
                          {userid === e.userid ? (
                            <p
                              onClick={() => manageModal(e._id)}
                              className="flex py-2 px-2 gap-2 cursor-pointer  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110"
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
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                />
                              </svg>
                              Edit post
                            </p>
                          ) : (
                            ''
                          )}

                          {userid === e.userid ? (
                            <p
                              onClick={() => {
                                delpost(e._id);
                              }}
                              className="flex py-2 px-2 gap-2   hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
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
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              Delete
                            </p>
                          ) : (
                            ''
                          )}

                          {userid !== e.userid ? (
                            <p
                              onClick={() => report(e._id)}
                              className="flex py-2 px-2 gap-2  hover:bg-blue-400 hover:bg-opacity-20  rounded-md  transition-all hover:scale-110 cursor-pointer"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6 cursor-pointer"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                                />
                              </svg>
                              Report
                            </p>
                          ) : (
                            ''
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {e.description ? (
                    <p className="my-3 text-sm ">{e.description}</p>
                  ) : (
                    <p className="my-3 text-sm "></p>
                  )}

                  <div className="rounded-md overflow-hidden">
                    {e.picturepath ? (
                      <img src={`/assets/${e.picturepath}`} alt="postimg"></img>
                    ) : (
                      ''
                    )}
                  </div>
                </div>
                <div className="mt-5 flex gap-8">
                  <button
                    onClick={() => likepost(e._id, userid, likestate)}
                    className="flex gap-2 items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={e.likes[userid] ? 'red' : 'none'}
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 "
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                      />
                    </svg>
                    {Object.keys(e.likes).length}
                  </button>
                  <button onClick={() => showc(e._id)} className="flex gap-2 items-center">
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
                        d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                      />
                    </svg>

                    {e.comments.length}
                  </button>
                </div>
                {showcomment[e._id] ? (
                  <>
                    <div className="flex mt-4 gap-3 ">
                      <div>
                        <Avatar img={propicpath} />
                      </div>
                      <div className="border grow rounded-full relative  ">
                        <form
                          onSubmit={(event) => {
                            event.preventDefault();
                            if (event.target[0].value) {
                              postcomment(event.target[0].value, e._id, Username, propicpath);
                            }
                          }}
                        >
                          <textarea
                            className=" block w-full p-3 overflow-hidden px-4 h-12 "
                            placeholder="Leave a comment."
                          ></textarea>
                          <button type="submit" className="absolute right-3 top-3 text-gray-400 ">
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
                                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                              />
                            </svg>
                          </button>
                        </form>
                      </div>
                    </div>
                    {e.comments.length ? (
                      <div className="overflow-scroll  max-h-80">
                        {e.comments
                          ? e.comments
                              .slice(0)
                              .reverse()
                              .map((data) => {
                                return (
                                  <div
                                    key={e.comments._id}
                                    className="flex-col  w-full py-4  mt-3 bg-white border-b-2 border-r-2 border-gray-200 sm:px-4 sm:py-4 md:px-4 sm:rounded-lg sm:shadow-sm "
                                  >
                                    <div className="flex flex-row md-10 w-full">
                                      <Link to={`/profile/${data.userid}`}>
                                        <Avatar img={data.propicpath} />
                                      </Link>
                                      <div className="flex-col mt-1">
                                        <div className="flex items-center flex-1 px-4 font-bold leading-tight">
                                          <Link to={`/profile/${data.userid}`}>
                                            <p className="font-semibold cursor-pointer hover:underline">
                                              {data.username}
                                            </p>
                                          </Link>
                                          {/* <span className="ml-2 text-xs font-normal text-gray-500">
                                          3 days ago
                              </span> */}
                                          {/*
                                        <button
                                          className="text-dark-400 ml-3"
                                          onClick={() =>
                                            handeldropdown(e._id, dropstate)
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
                                              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                            />
                                          </svg>
                                        </button>
                                        */}
                                        </div>
                                        <div className="flex-1 px-2 ml-2 text-sm font-medium leading-loose text-gray-600">
                                          {data.comment}
                                        </div>
                                        {/*   
                                     <button className="inline-flex items-center px-1 m-1 -ml-1 flex-column">
                                        <svg
                                          className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-700"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                          ></path>
                                        </svg>
                                        2
                                      </button>
                                       */}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                          : ''}
                      </div>
                    ) : (
                      ''
                    )}
                  </>
                ) : (
                  ''
                )}
              </Cards>
            );
          })
      );

      return Content;
    }
  };

  return (
    <div>
      {showmodal && setshowmodal ? (
        <Modaledit
          closemodal={setshowmodal}
          postdata={
            profile
              ? Userpost.filter((e) => e._id === editpostid)
              : Postdata.filter((e) => e._id === editpostid)
          }
          loader={setloading}
        />
      ) : (
        ''
      )}
      {delmsg ? <Confirmmodal showmodal={setdelmsg} postid={delpostid} /> : ''}
      {reportmodal ? <Reportmodal showmodal={setreportmodal} postid={reportid} /> : ''}

      <Postcomponet />
    </div>
  );
}

export default Post;
