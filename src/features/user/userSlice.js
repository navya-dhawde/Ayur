import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUser, fetchLoggedInUserOrder, updateUser } from './userAPI';

const initialState = {
  userOrders: [],
  status: 'idle',
  userInfo: null, //this will have more information about user 
};

export const fetchLoggedInUserOrderAsync = createAsyncThunk(
  'user/fetchLoggedInUserOrder',
  async (id) => {
    const response = await fetchLoggedInUserOrder(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchLoggedInUserAsync = createAsyncThunk(
  'user/fetchLoggedInUser',
  async(userId) => {
  const response = await fetchLoggedInUser(userId);
  return response.data;
})

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async(userId) => {
  const response = await updateUser(userId);
  return response.data
})

export const userSlice = createSlice({
  name: 'user/fetchLoggedInUserOrder',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },



  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrderAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        //this info can be diffrent or more from loggedIn User Info
        state.userOrders = action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending,(state)=>{
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled,(state,action)=>{
        state.status = 'idle';
        state.userInfo = action.payload;
      })
      .addCase(updateUserAsync.pending, (state)=>{
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled,(state, action)=>{
        state.status = 'idle';
        state.userInfo = action.payload;
      })
  },
});

export const { increment} = userSlice.actions;

export const selectUserOrders = (state) => state.user.userOrders;
export const selectUserInfo = (state) => state.user.userInfo;


export default userSlice.reducer;
