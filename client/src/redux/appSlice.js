import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    user: {
      username: "",
    },
    pending: false,
    error: false,
    posts: [],
    categories: [],
  },
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
} = appSlice.actions;

export default appSlice.reducer;
