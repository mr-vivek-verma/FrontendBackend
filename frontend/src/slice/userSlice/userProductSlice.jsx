import axios from "axios";
import authHeader from "../../utils/authHeader/authHeader";

const { createAsyncThunk } = require("@reduxjs/toolkit");
const createSlice = require("@reduxjs/toolkit").createSlice;
const initialState = {
  loading: false,
  product: [],
  error: false,
  detailProduct: [],
  scrollPageNo: "",
};

export const UserProduct = createAsyncThunk(
  "product/getProductList",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/user/productList/${data}`
      );
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

export const UserProductDetail = createAsyncThunk(
  "user/getProduct",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/v1/user/getProduct/${data}`,
        authHeader(thunkAPI)
      );

      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.response.data.msg);
    }
  }
);

const UserProductSlice = createSlice({
  name: "product",
  initialState,
  reducer: {
    setProductEmpty: (state, action) => {
      console.log("clear");
      state.product = [];
    },
  },
  extraReducers: {
    [UserProduct.pending]: (state) => {
      state.loading = true;
    },
    [UserProduct.fulfilled]: (state, { payload }) => {
      state.product = payload.data;
      state.scrollPageNo = payload.totalPages;
    },
    [UserProductDetail.pending]: (state) => {
      state.loading = true;
    },
    [UserProductDetail.fulfilled]: (state, { payload }) => {
      state.detailProduct = payload.data;
    },
  },
});
export const setProductEmpty = UserProductSlice.actions;
export default UserProductSlice.reducer;
