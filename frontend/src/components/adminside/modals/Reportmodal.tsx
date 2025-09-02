import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Reportmodal({ show, postdetails }) {
  console.log(postdetails);

  return (
    <div>
      <>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">post details</h3>
                <button className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"></button>
              </div>
              {/*body*/}
              <div className="p-2">
                {
                  <textarea
                    className="grow p-3 h-14 w-full"
                    value={postdetails.description}
                  ></textarea>
                }
              </div>

              {postdetails.picturepath ? (
                <>
                  <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
                    <img src={`/assets/${postdetails.picturepath}`} alt="postimg"></img>
                  </div>
                </>
              ) : (
                ''
              )}
              <div className="m-2">
                <h1>No of reports : {postdetails.report.length}</h1>
              </div>
              <div className="m-2 overflow-auto">
                <h1 className="m-5">Reasons for reporting</h1>
                {postdetails.report.map((e) => {
                  return <li className="flex flex-col">{e.reason}</li>;
                })}
              </div>

              {/*footer*/}

              <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                <div>
                  <button
                    onClick={() => show(false)}
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                  >
                    Close
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

export default Reportmodal;
