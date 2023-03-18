import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useParams } from 'react-router-dom'
import axios from '../../../Axios'
import { AuthActions } from '../../../store/Authslice'
import { Useraction } from '../../../store/Userslice'
import Avatar from '../Avatar'
import Cards from '../Cards'

function Userdetails() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const logedinuserid = useSelector((state)=>state.auth.userdetails._id)

    console.log(id)
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/user/getuser/${id}`, { withCredentials: true })
                if (data.status) {
                    dispatch(Useraction.Getuser(data.userdetails))
                }
                else {
                    alert('user not verified')
                    dispatch(AuthActions.UserLogout())
                }


            } catch (error) {
                alert('unexpected error occcured log in to continue')
                dispatch(AuthActions.UserLogout())
            }

        }
        fetchUser()
    }, [id]) // eslint-disable-line no-console
    let location = useLocation()
    let User = useSelector(state => state.user.userdetails)
    const nonactiveclase = 'flex gap-1 px-4 py-1 items-center border-b-4 border-b-white '
    const activeclase = 'flex gap-1 px-4 py-1 items-center border-socialblue font-bold '
    return (
        <div>
            <Cards nopading={true}>
                <div className='relative overflow-hidden rounded-md'>
                    <div className='h-36 overflow-hidden flex justify-center items-center'>
                        <img src='https://images.unsplash.com/photo-1500835556837-99ac94a94552?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1000&q=60' alt='cover'></img>
                    </div>
                    <div className='absolute top-24 left-4'>
                        <Avatar size={'big'} />
                    </div>
                    <div className='p-4 '>
                        <div className='ml-40 '>
                            <h1 className='text-3xl font-bold'>
                                {User.name}
                            </h1>
                            <div className='text-gray-500 leading-4'>Kochi,Aluva

                            </div>

                        </div>
                        <div className='float-right'>
                        {
                             User._id === logedinuserid ? <a href={`/setings/${User._id}`}><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                             </svg>

                         </button></a> : <a href='/f'><button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
                               
                                  Follow
                            </button></a>
                        }

                        </div>
                        <div className='mt-10 flex gap-5'>
                            <Link to={`/profile/post/${User._id}`} className={location.pathname === `/profile/post/${User._id}` ? activeclase : nonactiveclase}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>

                                Post</Link>


                            <Link to={`/profile/about/${User._id}`} className={location.pathname === `/profile/about/${User._id}` ? activeclase : nonactiveclase}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                                </svg>

                                About  </Link>


                            <Link to={`/profile/friends/${User._id}`} className={location.pathname === `/profile/friends/${User._id}` ? activeclase : nonactiveclase}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                                </svg>
                                Friends</Link>


                            <Link to={`/profile/photos/${User._id}`} className={location.pathname === `/profile/photos/${User._id}` ? activeclase + 'hidden md:flex' : nonactiveclase + 'hidden md:flex'}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                </svg>
                                Photos</Link>
                        </div>

                    </div>
                </div>

            </Cards>
        </div>
    )
}

export default Userdetails
