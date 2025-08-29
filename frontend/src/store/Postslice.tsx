import { createSlice } from '@reduxjs/toolkit';

/*export const FetchAllpost = createAsyncThunk('post/getallpost',()=>{
    return axios.get('/post/getpost',{withCredentials:true}).then((response)=>{
        console.log(response.data)
        return response.data
    })
})*/

const Postslice = createSlice({
  name: 'post',
  initialState: { allpost: [], userpost: [],postcount:0 ,loading: false },
  reducers: {
    Addnewpost(state, action) {
      state.allpost = action.payload;
    },
    Getallpost(state, action) {
      state.allpost = action.payload;
    },
    Getupdatedpost(state, action) {
      state.action = action.payload;
    },
    Getuserpost(state, action) {
      state.userpost = action.payload;
    },
    Getpostcount(state,action){
      state.postcount = action.payload
    }
  },
  /*  extraReducers:(builder)=>{
        builder.addCase(FetchAllpost.pending,(state)=>{
               state.loading = true
        })
        builder.addCase(FetchAllpost.fulfilled,(state,action)=>{
            state.loading = false
            state.allpost = action.payload
        })
        builder.addCase(FetchAllpost.rejected,(state)=>{
            console.log('rejected')
            state.error = true
            state.allpost = []
        })
    }*/
});
export const postaction = Postslice.actions;
export default Postslice;
