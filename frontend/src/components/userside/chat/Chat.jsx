import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link, useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from '../../../Axios';
import Avatar from '../Avatar';
import Bottombar from '../botombar/Bottombar';
import Chathistory from '../Chathistory';
import Layout from '../Layout';
import Messages from '../Messages';
import Topbar from '../topbar/Topbar';
import './chat.css';
import Chatsearch from './Chatsearch';
import Chattopbar from './Chattopbar';
import ScrollToBottom from 'react-scroll-to-bottom';
import { Comment } from 'react-loader-spinner';
function Chat() {
  const [message, setmessage] = useState('');
  const [sendmessage, setsendmessage] = useState(['']);
  const [socket, setsocket] = useState(null);
  const [chat, setchat] = useState(['']);
  const [typing, settyping] = useState(false);
  const [typingtime, settypingtime] = useState(false);
  const [conversattion, setconversation] = useState([]);
  const [currentchat, setcurrentchat] = useState();
  const [chatmessage, setchatmessage] = useState([]);
  const logedinuserid = useSelector((state) => state.auth.userdetails._id);
  const [arrivalmsg, setarrivalmsg] = useState();
  const scrollref = useRef(null);
  const socketconect = useRef();
  useEffect(() => {
    socketconect.current = io('ws://localhost:3001');
  }, []);
  useEffect(() => {
    socketconect.current.on('getmessage', (data) => {
      console.log('message reached frontend');
      console.log(data);
      setarrivalmsg({
        senderid: data.senderid,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalmsg &&
      currentchat?.members.includes(arrivalmsg.senderid) &&
      setchatmessage((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg]);
  useEffect(() => {
    const getconversation = async () => {
      try {
        const { data } = await axios.get('/chat/getchat', {
          withCredentials: true,
        });
        console.log(data.userchat);
        setconversation(data.userchat);
      } catch (error) {
        console.log(error);
      }
    };
    getconversation();
  }, [currentchat]);

  useEffect(() => {
    const getmessages = async () => {
      try {
        console.log('worked');
        const { data } = await axios.get(
          `/message/getmessage/${currentchat?._id}`,
          { withCredentials: true }
        );

        setchatmessage(data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getmessages();
  }, [currentchat]);

  useEffect(() => {
    socketconect.current.emit('adduser', logedinuserid);
    socketconect.current.on('getusers', (users) => {
      console.log(users);
    });
  }, [logedinuserid]);

  useEffect(() => {
    if (socketconect) {
      /*socket.on('message-from-server', (data) => {
        setchat((prev) => [...prev, data]);
        console.log(chat);
        console.log(data);
      });*/
      socketconect.current.on('istyping', () => {
        settyping(true);
      });
       socketconect.current.on('server-stoptyping', () => {
        settyping(false);
      });
    }
  }, [socketconect]);
  console.log('.......................');
  console.log(chat);

  const handelsubmit = async (e) => {
    e.preventDefault();
    /* socket.emit('send-message', message);
    setsendmessage([...sendmessage, message]);
    
    setmessage('');*/
    try {
      if (message) {
        const messageobj = {
          chatid: currentchat._id,
          text: message,
        };
        const receiverid = currentchat.members.find(
          (member) => member !== logedinuserid
        );
        socketconect.current.emit('sendmessage', {
          senderid: logedinuserid,
          receiverid,
          text: message,
        });
        const { data } = await axios.post('message/newmessage', messageobj, {
          withCredentials: true,
        });

        setmessage('');
        setchatmessage([...chatmessage, data.newmessage]);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handelchange = (e) => {
    setmessage(e.target.value);
    const receiverid = currentchat.members.find(
      (member) => member !== logedinuserid
    );
    const typingobj = {
      chatid: currentchat._id,
      receiverid,
    };
    socketconect.current.emit('typing', typingobj);
    if (typingtime) clearTimeout(typingtime);

    settypingtime(
      setTimeout(() => {
        socketconect.current.emit('stoptyping',typingobj);
      }, 1000)
    );
  };

  const [dropdown, setdropdown] = useState(false);
  const [showuserchat, setuserchat] = useState(false);

  return (
    <div className="chatpages">
      <Topbar />

      <Layout chat={true}>
        <div className="chat-container">
          <div className="chathistory">
            <Chatsearch currentchat={setcurrentchat} />
            <div className="overflow-auto">
              {conversattion.map((e) => (
                <div className="items" onClick={() => setcurrentchat(e)}>
                  <Chathistory conversation={e} currentuser={logedinuserid} />
                </div>
              ))}
            </div>
          </div>
          <div className="showchat">
            {currentchat ? (
              <>
                <div className="topbar bg-socialblue">
                  <Chattopbar
                    conversation={currentchat}
                    currentuser={logedinuserid}
                  />
                  <div className="float-right">
                    {typing ? (
                      <>
                        <Comment
                          visible={true}
                          height="50"
                          width="50"
                          ariaLabel="comment-loading"
                          wrapperStyle={{}}
                          wrapperClass="comment-wrapper"
                          color="#fff"
                          backgroundColor="#F4442E"
                        />
                      </>
                    ) : (
                      ''
                    )}
                  </div>
                </div>

                <ScrollToBottom
                  ref={scrollref}
                  className="flex flex-col overflow-y-auto chatdisplay"
                >
                  {chatmessage?.map((e) => (
                    <Messages
                      message={e}
                      own={e.senderid === logedinuserid}
                      setmessage={setchatmessage}
                    />
                  ))}
                </ScrollToBottom>

                <div className="bottom-bar">
                  <div class="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                    <div></div>
                    <div class="flex-grow ml-4">
                      <div class="relative w-full">
                        <input
                          onChange={(e) => handelchange(e)}
                          type="text"
                          value={message}
                          class="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
                        />
                      </div>
                    </div>
                    <div class="ml-4">
                      <button
                        onClick={handelsubmit}
                        class="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                      >
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                  }}
                >
                  <div>
                    <h1>NO chat are selected</h1>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Layout>
      <Bottombar />
    </div>
  );
}

export default Chat;
