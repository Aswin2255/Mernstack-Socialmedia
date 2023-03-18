import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../../Axios'
import { AuthActions } from '../../../../store/Authslice'
import { postaction } from '../../../../store/Postslice'


function Confirmmodal({showmodal,postid}) {
    const dispatch = useDispatch()
    const userid = useSelector((state)=>state.auth.userdetails._id)
    const deletepost = async()=>{
        try {
            console.log(postid)
            const { data } = await axios.delete(`/post/deletepost/${postid}`, { withCredentials: true })
            if(data.status){
                let userupdatedpost = data.updatedpost.filter((e)=>e.userid === userid)
                dispatch(postaction.Getallpost(data.updatedpost))
                dispatch(postaction.Getuserpost(userupdatedpost))
                showmodal(false)
            }
            else{
                alert('unexpextd error ocured log in again')
                dispatch(AuthActions.UserLogout())
                showmodal(false)
            }
            
        } catch (error) {
            alert(error.message)
            dispatch(AuthActions.UserLogout())
                showmodal(false)
            
        }
    }
  return (
    <div>
       <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    
                  </h3>
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
                 <p>Are you sure to delete the post</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => showmodal(false)}
                  >
                    No
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={deletepost}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    </div>
  )
}

export default Confirmmodal
