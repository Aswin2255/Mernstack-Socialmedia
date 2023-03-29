import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../../../Axios';
import { AuthActions } from '../../../../store/Authslice';

function Propicmodal({ modal }) {
  const [image, setimage] = useState(false);
  const [viewimage, setviewimage] = useState(false);
  const dispatch = useDispatch();
  const fileref = useRef(null);
  const handelchange = (e) => {
    console.log(e.target.files[0]);
    setimage(e.target.files[0]);
    const url = URL.createObjectURL(e.target.files[0]);
    setviewimage(url);
  };
  const resetfile = () => {
    setimage('');
    setviewimage('');
    fileref.current.value = null;
  };
  const generatesucess = (msg) => {
    toast.success(msg, {
      position: 'top-center',
    });
  };
  const submithandel = async () => {
    try {
      if (image) {
        const formdata = new FormData();
        formdata.append('image', image);
        const { data } = await axios.patch(
          '/user/changeprofile',
          formdata,
          { headers: { 'content-type': 'multipart/form-data' } },
          { withCredentials: true }
        );
        if (data.status) {
          dispatch(AuthActions.Userupdate(data.updateduser));
          modal(false);
          generatesucess('profilepicture updated')
        } else {
          alert('unexpected error ocuured');
          dispatch(AuthActions.UserLogout());
          modal(false);
        }
      }
    } catch (error) {
      alert(error.message);
      dispatch(AuthActions.UserLogout());
      modal(false);
    }
  };
  return (
    <div>
      <>
      <ToastContainer/>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
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
                <p className="ml-4 ">Change profile Picture</p>

                <button
                  onClick={() => modal(false)}
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {/*body*/}

              <div className="relative p-6 flex-auto">
                {image ? (
                  <>
                    <div className="float-right" onClick={resetfile}>
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
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                      <img src={viewimage} alt="post"></img>
                    </div>

                    <div></div>
                  </>
                ) : (
                  ''
                )}
              </div>

              {/*footer*/}

              <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                <div>
                  <input
                    type="file"
                    ref={fileref}
                    onChange={(e) => {
                      handelchange(e);
                    }}
                    id="editfile"
                    style={{ display: 'none' }}
                  ></input>
                  <label htmlFor="editfile">
                    {' '}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6 cursor-pointer"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </label>
                </div>
                <div>
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => modal(false)}
                  >
                    Close
                  </button>
                  <button
                    onClick={submithandel}
                    disabled={image  ? false : true}
                    className={
                      image 
                        ? 'bg-socialblue text-white  md:px-6 py-1 rounded-md '
                        : 'bg-blue-400  text-white  md:px-6 py-1 rounded-md opacity-50 '
                    }
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default Propicmodal;
