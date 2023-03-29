// Auth slice is used to store the information about the current logged in user this state is persisted in the localstorage using redux-persist lib
import { createSlice } from '@reduxjs/toolkit';
const Authslice = createSlice({
  name: 'Auth',
  initialState: {
    Userisloggedin: false,
    Adminisloggedin: false,
    userdetails: [],
  },
  reducers: {
    Userlogin(state, action) {
      state.Userisloggedin = true;
      state.userdetails = action.payload;
    },
    Userupdate(state,action){
      state.Userisloggedin = true;
      state.userdetails = action.payload;
    },
    UserLogout(state) {
      state.Userisloggedin = false;
      state.userdetails = [];
    },
    Adminlogin(state, action) {
      state.Adminisloggedin = true;
    },
    Adminlogout(state, action) {
      state.Adminisloggedin = false;
    },
  },
});

// this will exports the actions of authslice {Userlogin,Userlogout..etc}
export const AuthActions = Authslice.actions;
// this will export the whole slice to configure the store in store.js
export default Authslice;
