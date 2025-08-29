import { createSlice } from "@reduxjs/toolkit";

const Userslice = createSlice({
    name:'user',
    initialState:{userdetails:[],alluser:[],loading:false},
    reducers:{
        Getuser(state,action){
            console.log('jjjjjjjjjjjjj')
            console.log(action.payload)
            state.userdetails = action.payload
        },
        Getalluser(state,action){
            state.alluser = action.payload
        }
    }
})

export const Useraction = Userslice.actions
export default Userslice