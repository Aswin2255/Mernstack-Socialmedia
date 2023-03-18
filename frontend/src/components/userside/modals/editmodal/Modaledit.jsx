import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../../../../Axios'
import { AuthActions } from '../../../../store/Authslice'
import { postaction } from '../../../../store/Postslice'

function Modaledit({ closemodal, postdata,loader }) {
    const [imgremove, setimgremove] = useState('')
    const [editimage, seteditimage] = useState(false)
    const fileeditref = useRef(null)
    const [updateimage, setupdateimage] = useState('')
    const [caption, setcaption] = useState(postdata[0].description ? postdata[0].description : '')
    const dispatch = useDispatch()
    const loggedinuser = useSelector((state) => state.auth.userdetails._id)

    

    useEffect(() => {
        if (!postdata[0].picturepath) {
            setimgremove(true)
        }

    }, [])
    const remove = () => {
        setimgremove(true)
        seteditimage(false)
        fileeditref.current.value = null
        setupdateimage('')
    }
    const filechange = (e) => {
        console.log('tri')
        
        setimgremove('')
        const url = URL.createObjectURL(e.target.files[0])
        console.log(url)
        seteditimage(url)
        setupdateimage(e.target.files[0])
    }
    const close = () => {
        console.log('called')
        closemodal(false)
        seteditimage(false)
        setimgremove('')
        setupdateimage('')
    }
    const updatepost = async (postid) => {
        try {
            closemodal(false)
            loader(true)
            console.log(caption, editimage, postid)
            const formdata = new FormData()
            formdata.append('editimage', updateimage)
            formdata.append('caption', caption)
            formdata.append('remove', imgremove)
            const { data } = await axios.patch(`/post/updatepost/${postid}`, formdata, { withCredentials: true })
            if (data.status) {
                console.log('reacged')
                let userpost = data.updatedpost.filter((e) => e.userid === loggedinuser)
                console.log(userpost)
               
                dispatch(postaction.Getuserpost(userpost))
                dispatch(postaction.Getallpost(data.updatedpost))
                loader(false)
                close()

            }
            else {
                alert('error happend')
                dispatch(AuthActions.UserLogout())
            }

        } catch (error) {
            console.log(error)
            alert(error.message)
            dispatch(AuthActions.UserLogout())

        }

    }

    return (
        <div key={postdata[0]._id}>
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
                                    Edit post
                                </h3>
                                <button
                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                    onClick={() => closemodal(false)}
                                >
                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                        ×
                                    </span>
                                </button>
                            </div>
                            {/*body*/}
                            <div className='p-2'>
                                {
                                 <textarea className='grow p-3 h-14 w-full' onChange={(e) => { setcaption(e.target.value) }} value={caption} placeholder={`whats on your mind.`}></textarea> 
                                }

                            </div>


                            {
                                !imgremove ?
                                    <div className="relative p-6 flex-auto">


                                        <div className='float-right' onClick={remove}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>

                                        </div>
                                        <div className='rounded-md overflow-hidden h-48 flex items-center shadow-md'>
                                            {
                                                editimage ? <img src={editimage}></img> : postdata[0].picturepath ? <img src={`/assets/${postdata[0].picturepath}`}></img> : <h1>choose any editimage to dispaly</h1>
                                            }

                                        </div>




                                        <div>

                                        </div>
                                    </div> : postdata[0].picturepath ? <h1 className='text-center'>editimage is removed</h1> : ''
                            }




                            {/*footer*/}



                            <div className="flex items-center justify-between p-6 border-t border-solid border-slate-200 rounded-b">
                                <div>
                                    <input type='file' onChange={filechange} ref={fileeditref} id='editfile' style={{ display: 'none' }}  ></input>
                                    <label htmlFor='editfile'>  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                    </svg></label>
                                </div>
                                <div>
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={close}
                                    >
                                        Close
                                    </button>
                                    <button disabled = {!caption && !editimage ? true : false }
                                        className={caption || editimage ? 'bg-socialblue text-white  md:px-6 py-1 rounded-md ' : 'bg-blue-400  text-white  md:px-6 py-1 rounded-md opacity-50 '}
                                        type="button"
                                        onClick={() => { updatepost(postdata[0]._id) }}
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
    )
}

export default Modaledit
