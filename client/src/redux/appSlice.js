import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  user: localStorage.getItem("user") || null,
  pending: false,
  error: false,
  posts: [],
  categories: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    actionStart: (state) => {
      state.pending = true;
    },
    fetchPostsSuccess: (state, action) => {
      state.pending = false;
      state.posts = action.payload;
    },
    fetchCategoriesSuccess: (state, action) => {
      state.pending = false;
      state.categories = action.payload;
    },
    getUserSuccess: (state, action) => {
      state.pending = false;
      state.user = action.payload;
    },
    actionError: (state) => {
      state.error = true;
      state.pending = false;
    },
  },
});

export const {
  actionStart,
  actionError,
  fetchPostsSuccess,
  fetchCategoriesSuccess,
  getUserSuccess,
} = appSlice.actions;

export default appSlice.reducer;
