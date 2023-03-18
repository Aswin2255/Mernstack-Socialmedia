import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseUrl = 'http://localhost:3001/post';

export const postSlice = createApi({
    reducerPath : 'posttt',
    baseQuery : fetchBaseQuery({baseUrl:baseUrl}),
    endpoints : (builder) => ({
        getAllpost : builder.query({
            query:()=>({
                url : '/getpost',
                credentials : 'include'
            })
        })
    })
})
export default postSlice
