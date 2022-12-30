import axios from "axios";
import authHeader from "../../utils/authHeader/authHeader";

const { createAsyncThunk } = require("@reduxjs/toolkit");
import { toast } from 'react-toastify';
const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  loading: false,
  product:[],
  error: false,
};

export const admingetProduct = createAsyncThunk(
    "product/productList",
    async (_, thunkAPI) => {
      try {
        const response = await axios.get(
          "http://localhost:5001/api/v1/product/productList",
          authHeader(thunkAPI)
        );
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.msg);
      }
    }
  );

  export const createProduct = createAsyncThunk(
    "product/addproduct",
    async (data, thunkAPI) => {
    //   console.log("data with img", data);
    console.log("data with img", data);
      let newFormData = new FormData();
      newFormData.append("category_name", data.values.category);
      newFormData.append("sizes[]", data.values.size);
      newFormData.append("category_image",data.values.category_image)
      try {
      
        const response = await axios.post(
          `http://localhost:5001/api/v1/product/addProduct/`,
          newFormData,
          authHeader(thunkAPI)
        );
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.response.data.msg);
      }
    }
  );
const adminProductSlice = createSlice({
    name: "data",
    initialState,
    reducers: {},
  
    extraReducers: {
     [admingetProduct.pending]: (state) => {
        state.loading = true;
      },
      [admingetProduct.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.product = payload.data;
      },
    },
  });
  export default adminProductSlice.reducer;
  