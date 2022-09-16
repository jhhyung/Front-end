import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import { instance } from "../../shared/instance";

const initialState = {
  loading: false,
  data: [],
  error: "",
};

// [GET] COMMENT
export const getComment = createAsyncThunk(
  "GET_COMMENT",
  async (collection_id) => {
    try {
      const response = await instance.get(`/comments/${collection_id}`);
      return response.data.data;
    } catch (error) {
      return error.message;
    }
  }
);

// [ADD] COMMENT
export const addComment = createAsyncThunk(
  "ADD_COMMENT",
  async ({ newList, collectionId }) => {
    try {
      const response = await instance.post(
        `/comments/${collectionId}`,
        newList
      );
      console.log(response);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

// [DELETE] COMMENT
export const deleteComment = createAsyncThunk(
  "DELETE_COMMENT",
  async (commentId) => {
    try {
      console.log(commentId);
      const response = await instance.delete(`/comments/${commentId}`);
      console.log(response);
      return response.data;
    } catch (error) {
      alert("로그인을 해주세요");
      return error.message;
    }
  }
);

// [UPDATE] COMMENT
// return x payload x
export const updateComment = createAsyncThunk(
  "UPDATE_COMMENT",
  async ({ commentId, editComment }) => {
    try {
      const response = await instance.put(
        `/comments/${commentId}`,
        editComment
      );
      console.log(response);
    } catch (error) {
      alert("로그인을 해주세요");
      return error.message;
    }
  }
);

export const commentSlice = createSlice({
  name: "commentList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getComment
    builder.addCase(getComment.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getComment.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = "";
    });
    builder.addCase(getComment.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
