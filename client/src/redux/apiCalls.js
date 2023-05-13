import {
  actionError,
  actionStart,
  fetchPostsSuccess,
  fetchCategoriesSuccess,
} from "./appSlice";
import axios from "axios";

export const getPosts = async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await axios.get("http://localhost:5000/api/posts/");
    dispatch(fetchPostsSuccess(res.data));
  } catch (err) {
    dispatch(actionError());
  }
};

export const getCategories = async (dispatch) => {
  dispatch(actionStart());
  try {
    const res = await axios.get("http://localhost:5000/api/categories/");
    dispatch(fetchCategoriesSuccess(res.data));
  } catch (err) {
    dispatch(actionError());
  }
};
