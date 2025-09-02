import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import axios from '../../../../Axios';
import { AuthActions } from '../../../../store/Authslice';

function Reportmodal({ showmodal, postid }) {
  const dispatch = useDispatch();
  const generateerror = (err) => {
    toast.error(err, {
      position: 'top-center',
    });
  };
  const generatesucess = (msg) => {
    toast.success(msg, {
      position: 'top-center',
    });
  };
  console.log(postid);
  const reportpost = async (reason) => {
    try {
      console.log(reason);
      const { data } = await axios.patch(
        `/post/reportpost/${postid}`,
        { reason },
        { withCredentials: true },
      );
      console.log(data);
      if (data.status) {
        generatesucess('post get reported ');
        showmodal(false);
      } else {
        generatesucess('post already reported');
        showmodal(false);
      }
    } catch (error) {
      generateerror(error.message);
      dispatch(AuthActions.UserLogout());
      console.log(error);
    }
  };
  const [showform, setform] = useState(false);
  const [report, setreport] = useState('');
  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <p className="flex">
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
                      d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5"
                    />
                  </svg>{' '}
                  <h1 className="ml-1 font-semibold">Report Post</h1>
                </p>
                <button
                  className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => showmodal(false)}
                >
                  <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              {/*body*/}
              <div className="relative p-6 flex-auto">
                {!showform ? (
                  <>
                    <button
                      onClick={() => {
                        reportpost('promotes violence');
                      }}
                      className="m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer w-full"
                    >
                      Promotes violence
                    </button>
                    <button
                      onClick={() => {
                        reportpost('promotes illegal activities');
                      }}
                      className=" m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer w-full"
                    >
                      Promotes illegal activities
                    </button>
                    <button
                      onClick={() => {
                        setform(true);
                      }}
                      className=" m-1 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow cursor-pointer w-full"
                    >
                      Something else..
                    </button>
                  </>
                ) : (
                  ''
                )}

                {showform ? (
                  <form>
                    <div>
                      <textarea
                        className="grow p-3 h-14 w-full"
                        onChange={(e) => setreport(e.target.value)}
                        value={report}
                        placeholder={`why are you reporting it..`}
                      ></textarea>
                    </div>
                  </form>
                ) : (
                  ''
                )}
              </div>
              {/*footer*/}
              <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                <button
                  className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => showmodal(false)}
                >
                  Close
                </button>
                {showform ? (
                  <button
                    disabled={report ? false : true}
                    className={
                      report
                        ? 'bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 '
                        : 'bg-red-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 opacity-50'
                    }
                    type="button"
                    onClick={() => {
                      reportpost(report);
                    }}
                  >
                    Report
                  </button>
                ) : (
                  ''
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        <ToastContainer />
      </>
      )
    </div>
  );
}

export default Reportmodal;
