import axios from 'axios';
import { useParams } from 'react-router-dom';
import authHeader from '../../utils/authHeader/authHeader';
import { customAxios } from '../../utils/customAxios';

const { createAsyncThunk } = require('@reduxjs/toolkit');

const createSlice = require('@reduxjs/toolkit').createSlice;

const initialState = {
  loading: false,
  product: [],
  error: false,
};

// const id =useParams();


export const UserProduct = createAsyncThunk('product/getProductList', async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      'https://api.chapshopapp.com/api/v1/user/productList',
      authHeader(thunkAPI)
    );

    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue(e.response.data.msg);
  }
});

const UserProductSlice = createSlice({
  name: "product",
  initialState,
  reducer: {},
  extraReducers: {
    [UserProduct.pending]: (state) => {
      state.loading = true;
    },
    [UserProduct.fulfilled]: (state, { payload }) => {
      state.product = payload.data;
    },
  },
});

export default UserProductSlice.reducer;
