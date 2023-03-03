import {createSlice} from '@reduxjs/toolkit'
const initialState = {
    user:null,
    token:null,
    posts:[]
}
export const authslice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setlogin:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setlogout:(state)=>{
            state.user = null;
            state.token = null;
        },
        setfriends:(state,action)=>{
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.log('no friends')
            }
        },
        setposts:(state,action)=>{
            state.posts = action.payload.posts
        },
        setpost:(state,action)=>{
            const updatedpost = state.post.map((post)=>{
                if(post._id === action.payload.post._id) return action.payload.post
                return post
            })
            state.posts = updatedpost
        }
    }
})
export const {setlogin,setfriends,setpost,setposts,setlogout} = authslice.actions
export default authslice.reducer